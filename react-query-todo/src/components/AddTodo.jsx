import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addTodo } from "../api/todos";
import { useState } from "react";

function AddTodo() {
  const [title, setTitle] = useState("");
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: addTodo,
    onSuccess: () => {
      queryClient.invalidateQueries(["todos"]);
      setTitle("");
    },
  });

  return (
    <div>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="New todo"
      />
      <button onClick={() => mutation.mutate({ title })}>Add Todo</button>
    </div>
  );
}

export default AddTodo;
