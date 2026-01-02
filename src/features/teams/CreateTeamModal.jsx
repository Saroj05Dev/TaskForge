import { useState } from "react";
import Modal from "@/components/ui/Modal";
import { createTeamApi } from "./team.api";

const CreateTeamModal = ({ open, onClose }) => {
  const [form, setForm] = useState({
    name: "",
    description: "",
  });

  const handleSubmit = async () => {
    try {
      await createTeamApi(form);
      onClose();
    } catch (err) {
      console.error("Create team failed", err);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <h3>Create Team</h3>

      <input
        placeholder="Team name"
        value={form.name}
        onChange={(e) =>
          setForm({ ...form, name: e.target.value })
        }
      />

      <textarea
        placeholder="Description"
        value={form.description}
        onChange={(e) =>
          setForm({
            ...form,
            description: e.target.value,
          })
        }
      />

      <button onClick={handleSubmit}>Create</button>
    </Modal>
  );
};

export default CreateTeamModal;
