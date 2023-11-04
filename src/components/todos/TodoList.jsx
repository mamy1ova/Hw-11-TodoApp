import React, { useContext } from "react";
import Todo from "./Todo";
import styled from "styled-components";
import { TodoContext } from "./TodoManager";

const TodoList = () => {
  const { todos, deleteButtonHandler, toogleTodoHandler } =
    useContext(TodoContext);

  return (
    <Div>
      {todos.map((todo) => (
        <Todo
          todo={todo}
          key={todo.id}
          onDeleteTodo={deleteButtonHandler}
          onToogle={toogleTodoHandler}
        />
      ))}
    </Div>
  );
};

export default TodoList;

const Div = styled.div`
  padding: 10px;
`;
