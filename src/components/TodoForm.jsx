import { useState } from "react";
import { toast } from "sonner";

export const TodoForm = ({ addTodo }) => {
  const [value, setValue] = useState("");

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

    addTodo(value.trim());
    setValue("");
    toast.success("Successfully Added");
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <input
        type="text"
        className="todo-input"
        value={value}
        placeholder="What is the task today?"
        onChange={(e) => {
          setValue(e.target.value);
        }}
      />
      <button type="submit" className="todo-btn">
        Add Task
      </button>
    </form>
  );
};
