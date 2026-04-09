import { useState } from "react";
import Modal from "@/components/ui/Modal";
import { useDispatch, useSelector } from "react-redux";
import { resolveConflict, clearConflictData } from "../taskSlice";
import { useToast } from "@/contexts/ToastContext";
import { getTaskDiff, formatConflictMessage, formatFieldName, formatFieldValue } from "@/utils/conflictUtils";
import { AlertTriangle, Check, GitMerge, RotateCcw } from "lucide-react";

const STRATEGIES = [
  {
    id: "overwrite",
    icon: Check,
    iconBg: "bg-blue-50",
    iconColor: "text-blue-600",
    border: "hover:border-blue-300 hover:bg-blue-50/50",
    activeBorder: "border-blue-300 bg-blue-50/50",
    label: "Use my version",
    desc: "Overwrite the server version with your changes.",
  },
  {
    id: "merge",
    icon: GitMerge,
    iconBg: "bg-green-50",
    iconColor: "text-green-600",
    border: "hover:border-green-300 hover:bg-green-50/50",
    activeBorder: "border-green-300 bg-green-50/50",
    label: "Merge changes",
    desc: "Keep server as base and apply your changes on top.",
  },
  {
    id: "discard",
    icon: RotateCcw,
    iconBg: "bg-red-50",
    iconColor: "text-red-500",
    border: "hover:border-red-200 hover:bg-red-50/50",
    activeBorder: "border-red-200 bg-red-50/50",
    label: "Discard my changes",
    desc: "Reload and keep the server version.",
  },
];

const ConflictResolutionModal = () => {
  const dispatch = useDispatch();
  const toast = useToast();
  const { conflictData, saving } = useSelector((state) => state.tasks);
  const { taskId, serverVersion, localChanges, isOpen } = conflictData;
  const [hovered, setHovered] = useState(null);

  const diff = getTaskDiff(serverVersion, localChanges);
  const conflictMessage = formatConflictMessage(serverVersion);

  const handleResolve = async (strategy) => {
    if (strategy === "discard") {
      dispatch(clearConflictData());
      window.location.reload();
      return;
    }
    try {
      // Strip version/lastModified from localChanges — the backend manages these
      const { version, lastModified, updatedBy, ...cleanChanges } = localChanges || {};

      await dispatch(resolveConflict({
        taskId,
        resolutionType: strategy,
        taskData: cleanChanges,
      })).unwrap();

      toast.success(`Conflict resolved — ${strategy === "overwrite" ? "your version applied" : "changes merged"}`);
      dispatch(clearConflictData());
    } catch (error) {
      toast.error(error || "Failed to resolve conflict");
    }
  };

  const Icon = <div className="p-2 bg-amber-50 rounded-xl"><AlertTriangle size={15} className="text-amber-600" /></div>;

  if (!isOpen) return null;

  return (
    <Modal open={isOpen} onClose={() => dispatch(clearConflictData())} title="Conflict Detected" icon={Icon} maxWidth="max-w-xl">
      <div className="px-5 py-4 space-y-5">
        {/* Message */}
        <p className="text-sm text-gray-500 dark:text-gray-400">{conflictMessage}</p>

        {/* Diff */}
        {Object.keys(diff.changed).length > 0 && (
          <div>
            <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2">What changed</p>
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl border border-blue-100 dark:border-blue-900 bg-blue-50/50 dark:bg-blue-900/10 p-3">
                <p className="text-[10px] font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-2">Server version</p>
                <div className="space-y-2">
                  {Object.entries(diff.changed).map(([key, val]) => (
                    <div key={key}>
                      <p className="text-[10px] text-gray-500 dark:text-gray-400 font-medium">{formatFieldName(key)}</p>
                      <p className="text-xs text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-800 rounded-lg px-2 py-1 mt-0.5 border border-blue-100 dark:border-blue-800 wrap-break-word">{formatFieldValue(key, val.server)}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-xl border border-green-100 dark:border-green-900 bg-green-50/50 dark:bg-green-900/10 p-3">
                <p className="text-[10px] font-semibold text-green-600 dark:text-green-400 uppercase tracking-wider mb-2">Your changes</p>
                <div className="space-y-2">
                  {Object.entries(diff.changed).map(([key, val]) => (
                    <div key={key}>
                      <p className="text-[10px] text-gray-500 dark:text-gray-400 font-medium">{formatFieldName(key)}</p>
                      <p className="text-xs text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-800 rounded-lg px-2 py-1 mt-0.5 border border-green-100 dark:border-green-800 wrap-break-word">{formatFieldValue(key, val.local)}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Strategy picker */}
        <div>
          <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2">Choose resolution</p>
          <div className="space-y-2">
            {STRATEGIES.map(({ id, icon: Icon, iconBg, iconColor, label, desc }) => (
              <button
                key={id}
                onClick={() => handleResolve(id)}
                disabled={saving}
                onMouseEnter={() => setHovered(id)}
                onMouseLeave={() => setHovered(null)}
                className={`w-full flex items-center gap-3 p-3.5 rounded-xl border-2 transition-all duration-150 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed text-left
                  ${hovered === id
                    ? id === "overwrite" ? "border-blue-300 dark:border-blue-700 bg-blue-50/50 dark:bg-blue-900/20"
                    : id === "merge"     ? "border-green-300 dark:border-green-700 bg-green-50/50 dark:bg-green-900/20"
                    :                     "border-red-200 dark:border-red-800 bg-red-50/50 dark:bg-red-900/20"
                    : "border-gray-100 dark:border-gray-800"}`}
              >
                <div className={`p-2 rounded-xl shrink-0 ${iconBg}`}>
                  <Icon size={15} className={iconColor} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">{label}</p>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">{desc}</p>
                </div>
                {saving && <div className="w-4 h-4 border-2 border-gray-300 dark:border-gray-600 border-t-transparent rounded-full animate-spin shrink-0" />}
              </button>
            ))}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ConflictResolutionModal;
