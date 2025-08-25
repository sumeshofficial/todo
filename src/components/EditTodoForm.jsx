import { useState } from "react";

export const EditTodoForm = ({ editTodo, task }) => {
  const [value, setValue] = useState(task.task);
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

    editTodo(value.trim(), task.id);

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
        placeholder="Edit Task"
        onChange={(e) => setValue(e.target.value)}
      />
      <button type="submit" className="todo-btn">
        Edit Task
      </button>
    </form>
  );
};
