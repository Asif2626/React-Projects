import { useQuery } from "@tanstack/react-query";
import { fetchTodos } from "./api/todos";
import AddTodo from "./components/AddTodo";

function App() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["todos"],
    queryFn: fetchTodos,
  });

  if (isLoading) return <h2>Loading...</h2>;
  if (error) return <h2>Error loading todos</h2>;

  return (
    <div>
      <h1>React Query Todo App</h1>

      <AddTodo />

      {data.map((todo) => (
        <p key={todo.id}>✅ {todo.title}</p>
      ))}
    </div>
  );
}

export default App;
