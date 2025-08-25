import { useState } from "react";

export const TodoForm = ({ addTodo }) => {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");

  const validate = (text) => {
    const trimmed = text.trim();
    if (!trimmed) return "Task cannot be empty.";
    if (trimmed.length < 3) return "Task must be at least 3 characters long.";
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const msg = validate(value);
    if (msg) {
      setError(msg);
      return;
    }

    addTodo(value.trim());
    setValue("");
    setError("");
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      {error && <p className="error-text">{error}</p>}
      <input
        type="text"
        className="todo-input"
        value={value}
        placeholder="What is the task today?"
        onChange={(e) => {
          setValue(e.target.value);
          if (error) setError("");
        }}
      />
      <button type="submit" className="todo-btn">
        Add Task
      </button>
    </form>
  );
};
