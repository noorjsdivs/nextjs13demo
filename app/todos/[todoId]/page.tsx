import React from "react";
import { Todo } from "../../../typing";

type PageProps = {
  params: {
    todoId: string;
  };
};

const fethTodo = async (todoId: string) => {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/todos/${todoId}`,
    { next: { revalidate: 60 } }
  );
  const todo = await res.json();
  return todo;
};

async function TodoPage({ params: { todoId } }: PageProps) {
  const todo: Todo = await fethTodo(todoId);
  return (
    <div className="p-10 w-96 bg-yellow-200 border-2 m-2 shadow-lg">
      <p>
        #{todo.id}: {todo.title}
      </p>
      <p>
        Completed:{" "}
        <span
          className={`${
            todo.completed ? "text-green-700" : "text-red-700"
          } font-bold`}
        >
          {todo.completed ? "Yes" : "No"}
        </span>
      </p>
      <p className="border-t border-black mt-5 text-right">
        By User: {todo.userId}
      </p>
    </div>
  );
}

export default TodoPage;

export async function generateStaticParams() {
  const res = await fetch("https://jsonplaceholder.typicode.com/todos/");
  const todos: Todo[] = await res.json();

  const trimedTodos = todos.splice(0, 10);

  return trimedTodos.map((todo) => ({
    todoId: todo.id.toString(),
  }));
}
