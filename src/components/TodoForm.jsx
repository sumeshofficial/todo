import { useState } from "react";
import { validate } from "../utils/validateUtils";
import { notifyError, notifySuccess } from "../utils/notify";

export const TodoForm = ({ addTodo }) => {
  const [value, setValue] = useState("");
  const [deadline, setDeadline] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const msg = validate(value, deadline);
    if (msg) {
      notifyError(msg);
      return;
    }

    addTodo(value.trim(), deadline);
    setValue("");
    setDeadline("");
    notifySuccess("Successfully Added");
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

      <div>
        <input
          type="datetime-local"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          aria-label="deadline"
          className="deadline-input"
        />
      </div>
    </form>
  );
};
