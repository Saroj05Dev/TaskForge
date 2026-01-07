import { useEffect, useState } from "react";
import Modal from "@/components/ui/Modal";
import axiosInstance from "@/helpers/axiosInstance";
import { FileText, AlignLeft, Flag, Activity, UserCircle } from "lucide-react";

const TaskFormModal = ({ open, onClose, onSubmit, initialData, mode }) => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    priority: "Medium",
    status: "Todo",
    assigneeEmail: "",
  });

  /* Populate form when editing */
  useEffect(() => {
    if (initialData) {
      // assignedUser can be either an object {_id, email, fullName} or just an ID string
      const assigneeEmail =
        typeof initialData.assignedUser === "object" &&
        initialData.assignedUser?.email
          ? initialData.assignedUser.email
          : initialData.assigneeEmail || ""; // Fallback to assigneeEmail field if it exists

      setForm({
        title: initialData.title || "",
        description: initialData.description || "",
        priority: initialData.priority || "Medium",
        status: initialData.status || "Todo",
        assigneeEmail: assigneeEmail,
      });
    } else {
      setForm({
        title: "",
        description: "",
        priority: "Medium",
        status: "Todo",
        assigneeEmail: "",
      });
    }
  }, [initialData, open]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    onSubmit({
      ...form,
      assignedUser: form.assignedUser || null,
    });
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      {/* Modal Header */}
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-gray-900">
          {mode === "edit" ? "Edit Task" : "Create New Task"}
        </h3>
        <p className="text-sm text-gray-600 mt-1">
          {mode === "edit"
            ? "Update task details and assignments"
            : "Fill in the details to create a new task"}
        </p>
      </div>

      {/* Form */}
      <div className="space-y-5">
        {/* TITLE */}
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            <div className="flex items-center gap-2">
              <FileText size={16} className="text-gray-500" />
              Task Title
            </div>
          </label>
          <input
            id="title"
            name="title"
            type="text"
            placeholder="Enter task title"
            value={form.title}
            onChange={handleChange}
            className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-400"
            required
          />
        </div>

        {/* DESCRIPTION */}
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            <div className="flex items-center gap-2">
              <AlignLeft size={16} className="text-gray-500" />
              Description
            </div>
          </label>
          <textarea
            id="description"
            name="description"
            placeholder="Enter task description"
            value={form.description}
            onChange={handleChange}
            rows={4}
            className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-400 resize-none"
          />
        </div>

        {/* PRIORITY & STATUS - Side by Side */}
        <div className="grid grid-cols-2 gap-4">
          {/* PRIORITY */}
          <div>
            <label
              htmlFor="priority"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              <div className="flex items-center gap-2">
                <Flag size={16} className="text-gray-500" />
                Priority
              </div>
            </label>
            <select
              id="priority"
              name="priority"
              value={form.priority}
              onChange={handleChange}
              className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 bg-white"
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>

          {/* STATUS */}
          <div>
            <label
              htmlFor="status"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              <div className="flex items-center gap-2">
                <Activity size={16} className="text-gray-500" />
                Status
              </div>
            </label>
            <select
              id="status"
              name="status"
              value={form.status}
              onChange={handleChange}
              className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 bg-white"
            >
              <option value="Todo">Todo</option>
              <option value="In Progress">In Progress</option>
              <option value="Done">Done</option>
            </select>
          </div>
        </div>

        {/* ASSIGN USER */}
        <div>
          <label
            htmlFor="assignedUser"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            <div className="flex items-center gap-2">
              <UserCircle size={16} className="text-gray-500" />
              Assign To
            </div>
          </label>
          <input
            id="assigneeEmail"
            name="assigneeEmail"
            type="email"
            placeholder="user@example.com or leave empty"
            value={form.assigneeEmail}
            onChange={handleChange}
            className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-400"
          />
          <p className="mt-1 text-xs text-gray-500">
            Leave empty to keep task unassigned
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-3 mt-8 pt-6 border-t border-gray-200">
        <button
          onClick={handleSubmit}
          className="flex-1 px-4 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 transition-all duration-200 shadow-sm"
        >
          {mode === "edit" ? "Update Task" : "Create Task"}
        </button>
        <button
          onClick={onClose}
          className="px-4 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-all duration-200"
        >
          Cancel
        </button>
      </div>
    </Modal>
  );
};

export default TaskFormModal;
