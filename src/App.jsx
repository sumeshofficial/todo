import { Toaster } from "sonner";
import "./App.css";
import { TodoWrapper } from "./components/TodoWrapper";

function App() {
  return (
    <div className="app">
      <TodoWrapper />
      <Toaster position="top-right" richColors />
    </div>
  );
}

export default App;
