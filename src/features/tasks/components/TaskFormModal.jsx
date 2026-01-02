import { useState, useEffect } from "react";
import Modal from "@/components/ui/Modal";

const TaskFormModal = ({
  open,
  onClose,
  onSubmit,
  initialData,
  mode,
}) => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    priority: "Medium",
    status: "Todo",
  });

  useEffect(() => {
    if (initialData) {
      setForm({
        title: initialData.title || "",
        description: initialData.description || "",
        priority: initialData.priority || "Medium",
        status: initialData.status || "Todo",
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    onSubmit(form);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <h3>{mode === "edit" ? "Edit Task" : "Create Task"}</h3>

      <input
        name="title"
        placeholder="Title"
        value={form.title}
        onChange={handleChange}
      />

      <textarea
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
      />

      <select
        name="priority"
        value={form.priority}
        onChange={handleChange}
      >
        <option>Low</option>
        <option>Medium</option>
        <option>High</option>
      </select>

      <select
        name="status"
        value={form.status}
        onChange={handleChange}
      >
        <option>Todo</option>
        <option>In Progress</option>
        <option>Done</option>
      </select>

      <button onClick={handleSubmit}>
        {mode === "edit" ? "Update" : "Create"}
      </button>
    </Modal>
  );
};

export default TaskFormModal;
