import { useState } from "react";
import { toast } from "sonner";

export const EditTodoForm = ({ editTodo, task }) => {
  const [value, setValue] = useState(task.task);

  const validate = (text) => {
    const trimmed = text.trim();
    if (!trimmed) return "Task cannot be empty.";
    if (trimmed.length < 3) return "Task must be at least 3 characters long.";
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const msg = validate(value);
    if (msg) {
      toast.error(msg);
      return;
    }

    editTodo(value.trim(), task.id);

    setValue("");
    toast.success("Successfully Updated");
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <input
        type="text"
        className="todo-input"
        value={value}
        placeholder="Edit Task"
        onChange={(e) => {
          setValue(e.target.value);
        }}
      />
      <button type="submit" className="todo-btn">
        Edit Task
      </button>
    </form>
  );
};
