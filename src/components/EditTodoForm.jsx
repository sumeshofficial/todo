import { useState } from "react";
import { toLocalDateTime } from "../utils/dateUtils";
import { validate } from "../utils/validateUtils";
import { notifyError, notifySuccess } from "../utils/notify";

export const EditTodoForm = ({ editTodo, task }) => {
  const [value, setValue] = useState(task.task);
  const [deadline, setDeadline] = useState(task.deadline);

  const handleSubmit = (e) => {
    e.preventDefault();

    const msg = validate(value, deadline);
    if (msg) {
      notifyError(msg);
      return;
    }

    editTodo(value.trim(), task.id, deadline);

    setValue("");
    setDeadline("");
    notifySuccess("Successfully Updated");
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

      <div>
        <input
          type="datetime-local"
          value={toLocalDateTime(deadline)}
          onChange={(e) => setDeadline(e.target.value)}
          aria-label="deadline"
          className="deadline-input"
        />
      </div>
    </form>
  );
};
