import { useState } from "react";
import { Accordion } from "react-bootstrap";
import { TodoForm } from "./TodoForm";
import { v4 as uuidv4 } from "uuid";
import { Todo } from "./Todo";
import { EditTodoForm } from "./EditTodoForm";
import { toast } from "sonner";
import { CompletedTodos } from "./CompletedTodos";
uuidv4();

export const TodoWrapper = () => {
  const [todos, setTodos] = useState([]);
  const [completed, setCompleted] = useState([]);

  const addTodo = (todo) => {
    setTodos([
      ...todos,
      { id: uuidv4(), task: todo, completed: false, isEditing: false },
    ]);
  };

  const completeTodo = (id, task) => {
    setTodos(todos.filter((todo) => todo.id !== id));
    setCompleted([...completed, { id, task, completed: true }]);
    toast.success("Successfully Completed");
  };

  const deleteTodos = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
    toast.success("Successfully Deleted");
  };

  const editTodos = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
      )
    );
  };

  const editTask = (task, id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, task, isEditing: !todo.isEditing } : todo
      )
    );
  };

  return (
    <div className="todo-wrapper">
      <h1>Get Things Done!</h1>
      <TodoForm addTodo={addTodo} />
      {todos.map((todo) =>
        todo.isEditing ? (
          <EditTodoForm editTodo={editTask} task={todo} key={todo.id} />
        ) : (
          <Todo
            todo={todo}
            key={todo.id}
            completeTodo={completeTodo}
            deleteTodos={deleteTodos}
            editTodos={editTodos}
          />
        )
      )}
      {completed.length > 0 ? (
        <div className="completed-todos">
          <Accordion>
            <Accordion.Item eventKey="0">
              <Accordion.Header>Completed</Accordion.Header>
              <Accordion.Body>
                {completed.map((todo) => (
                  <CompletedTodos todo={todo} key={todo.id} />
                ))}
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </div>
      ) : null}
    </div>
  );
};
