import { useEffect, useState } from "react";
import Modal from "@/components/ui/Modal";
import { FileText, AlignLeft, Flag, Activity, UserCircle, Plus, Pencil } from "lucide-react";

const inputCls = "w-full px-3.5 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800 focus:bg-white dark:focus:bg-gray-900 focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900 focus:border-blue-400 text-sm text-gray-800 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 outline-none transition-all duration-200 cursor-text";
const labelCls = "block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5";

const TaskFormModal = ({ open, onClose, onSubmit, initialData, mode }) => {
  const isEdit = mode === "edit";

  const [form, setForm] = useState({
    title: "", description: "", priority: "Medium", status: "Todo", assigneeEmail: "",
  });

  useEffect(() => {
    if (initialData) {
      const assigneeEmail =
        typeof initialData.assignedUser === "object" && initialData.assignedUser?.email
          ? initialData.assignedUser.email
          : initialData.assigneeEmail || "";
      setForm({
        title: initialData.title || "",
        description: initialData.description || "",
        priority: initialData.priority || "Medium",
        status: initialData.status || "Todo",
        assigneeEmail,
      });
    } else {
      setForm({ title: "", description: "", priority: "Medium", status: "Todo", assigneeEmail: "" });
    }
  }, [initialData, open]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  // Don't close the modal here — let the parent (TaskContainer) decide
  // based on whether the update succeeded or a conflict was detected
  const handleSubmit = () => {
    onSubmit({ ...form, assignedUser: form.assignedUser || null });
  };

  const Icon = (
    <div className={`p-2 rounded-xl ${isEdit ? "bg-amber-50" : "bg-blue-50"}`}>
      {isEdit
        ? <Pencil size={15} className="text-amber-600" />
        : <Plus size={15} className="text-blue-600" />
      }
    </div>
  );

  return (
    <Modal open={open} onClose={onClose} title={isEdit ? "Edit Task" : "New Task"} icon={Icon}>
      <div className="px-5 py-5 space-y-4">
        {/* Title */}
        <div>
          <label className={labelCls}>Title</label>
          <input name="title" type="text" placeholder="What needs to be done?" value={form.title} onChange={handleChange} className={inputCls} autoFocus />
        </div>

        {/* Description */}
        <div>
          <label className={labelCls}>Description</label>
          <textarea name="description" placeholder="Add more context..." value={form.description} onChange={handleChange} rows={3} className={`${inputCls} resize-none`} />
        </div>

        {/* Priority + Status */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={labelCls}>Priority</label>
            <select name="priority" value={form.priority} onChange={handleChange} className={`${inputCls} cursor-pointer`}>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
          <div>
            <label className={labelCls}>Status</label>
            <select name="status" value={form.status} onChange={handleChange} className={`${inputCls} cursor-pointer`}>
              <option value="Todo">Todo</option>
              <option value="In Progress">In Progress</option>
              <option value="Done">Done</option>
            </select>
          </div>
        </div>

        {/* Assignee */}
        <div>
          <label className={labelCls}>Assign to (email)</label>
          <input name="assigneeEmail" type="email" placeholder="colleague@example.com" value={form.assigneeEmail} onChange={handleChange} className={inputCls} />
          <p className="text-[11px] text-gray-400 mt-1">Leave empty to keep unassigned</p>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center gap-2 px-5 py-4 border-t border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50">
        <button onClick={onClose} className="flex-1 px-4 py-2.5 text-sm font-medium text-gray-600 border border-gray-200 rounded-xl hover:bg-gray-100 transition-all cursor-pointer">
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          disabled={!form.title.trim()}
          className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-white rounded-xl transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed shadow-sm
            ${isEdit ? "bg-amber-500 hover:bg-amber-600" : "bg-blue-600 hover:bg-blue-700"}`}
        >
          {isEdit ? <Pencil size={14} /> : <Plus size={14} />}
          {isEdit ? "Save Changes" : "Create Task"}
        </button>
      </div>
    </Modal>
  );
};

export default TaskFormModal;
