import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

export const Todo = ({ todo, toggleComplete, deleteTodos, editTodos }) => {
  return (
    <div className="todo">
      <p
        onClick={() => toggleComplete(todo.id)}
        className={`${todo.completed ? "completed" : ""}`}
      >
        {todo.task}
      </p>
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
