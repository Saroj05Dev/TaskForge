import { useEffect } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

/**
 * Base modal shell.
 * Props:
 *   open       — boolean
 *   onClose    — fn
 *   title      — string (optional, renders a header)
 *   icon       — ReactNode (optional, shown left of title)
 *   maxWidth   — tailwind max-w class, default "max-w-lg"
 *   children
 */
const Modal = ({ open, onClose, title, icon, maxWidth = "max-w-lg", children }) => {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-[2px]"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`relative w-full ${maxWidth} bg-white dark:bg-gray-900 rounded-2xl shadow-2xl shadow-black/10 border border-gray-100 dark:border-gray-800 flex flex-col max-h-[90vh] overflow-hidden`}
      >
        {/* Header — only rendered when title is provided */}
        {title && (
          <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-100 dark:border-gray-800 shrink-0">
            {icon && <div className="shrink-0">{icon}</div>}
            <h2 className="flex-1 text-base font-semibold text-gray-900 dark:text-gray-100">{title}</h2>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-all cursor-pointer shrink-0"
              aria-label="Close"
            >
              <X size={17} />
            </button>
          </div>
        )}

        {/* Close button when no title */}
        {!title && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-all cursor-pointer z-10"
            aria-label="Close"
          >
            <X size={17} />
          </button>
        )}

        {/* Scrollable body */}
        <div className="overflow-y-auto flex-1">
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
