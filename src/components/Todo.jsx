import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { formatDeadline } from "../utils/dateUtils";

export const Todo = ({ todo, completeTodo, deleteTodos, editTodos }) => {
  return (
    <div className="todo incompleted">
      <div className={`${todo.overDue ? "over-due" : ""}`}>
        <p
          onClick={() => completeTodo(todo.id, todo.task)}
          className="todo-task"
        >
          {todo.task}{" "}
        </p>
        {todo.deadline && (
          <p className="todo-date">{formatDeadline(todo.deadline)}</p>
        )}
      </div>
      <div>
        <FontAwesomeIcon
          icon={faPenToSquare}
          onClick={() => editTodos(todo.id)}
        />
        <FontAwesomeIcon icon={faTrash} onClick={() => deleteTodos(todo.id)} />
      </div>
    </div>
  );
};
