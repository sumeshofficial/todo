import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

export const Todo = ({todo, toggleComplete}) => {

  return (
    <div className="todo">
      <p onClick={() => toggleComplete(todo.id)} className={`${todo.completed ? 'completed' : ''}`}>{todo.task}</p>
      <div>
        <FontAwesomeIcon icon={faPenToSquare} />
        <FontAwesomeIcon icon={faTrash} />
      </div>
    </div>
  );
};
