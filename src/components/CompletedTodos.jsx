export const CompletedTodos = ({ todo }) => {
  return (
    <div className="completed-todos">
      <div className="todo">
        <p className="completed">{todo.task}</p>
      </div>
    </div>
  );
};
