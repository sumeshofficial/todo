import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

export const Todo = ({ todo, completeTodo, deleteTodos, editTodos }) => {
  return (
    <div className="todo incompleted">
      <p onClick={() => completeTodo(todo.id, todo.task)}>{todo.task}</p>
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