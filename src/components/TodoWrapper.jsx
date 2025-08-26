import { useEffect, useRef, useState } from "react";
import { Accordion } from "react-bootstrap";
import { TodoForm } from "./TodoForm";
import { v4 as uuidv4 } from "uuid";
import { Todo } from "./Todo";
import { EditTodoForm } from "./EditTodoForm";
import { CompletedTodos } from "./CompletedTodos";
import { notifyError, notifySuccess } from "../utils/notify";
uuidv4();

export const TodoWrapper = () => {
  const [todos, setTodos] = useState([]);
  const [completed, setCompleted] = useState([]);
  const intervalRef = useRef(null);

  const addTodo = (todo, deadline) => {
    const isoDeadline = new Date(deadline).toISOString();
    setTodos([
      ...todos,
      {
        id: uuidv4(),
        task: todo,
        completed: false,
        isEditing: false,
        deadline: isoDeadline,
        notified: false,
      },
    ]);
  };

  const completeTodo = (id, task) => {
    setTodos(todos.filter((todo) => todo.id !== id));
    setCompleted([...completed, { id, task, completed: true }]);
    notifySuccess("Successfully Completed");
  };

  const deleteTodos = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
    notifySuccess("Successfully Deleted");
  };

  const editTodos = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
      )
    );
  };

  const editTask = (task, id, deadline) => {
    const isoDeadline = new Date(deadline).toISOString();
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              task,
              deadline: isoDeadline,
              isEditing: !todo.isEditing,
              overDue: false,
              notified: false,
            }
          : todo
      )
    );
  };

  const checkOverdue = () => {
    const now = Date.now();
    setTodos((prevTodos) =>
      prevTodos.map((todo) => {
        if (todo.notified || todo.completed) return todo;
        const deadlineTime = new Date(todo.deadline).getTime();
        if (!isNaN(deadlineTime) && now > deadlineTime) {
          notifyError(`Overdue: ${todo.task}`);
          return { ...todo, notified: true, overDue: true };
        }
        return todo;
      })
    );
  };

  useEffect(() => {
    checkOverdue();
    intervalRef.current = setInterval(checkOverdue, 1 * 1000);

    return () => {
      clearInterval(intervalRef.current);
    };
  }, []);

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
