import React, { useContext } from "react";
import Button from "../UI/Button";
import { RiDeleteBack2Line, RiRefreshLine } from "react-icons/ri";
import styled from "styled-components";
import { TodoContext } from "./TodoManager";

const TodoActions = () => {
  const { resetTodoHandler, deleteCompletedTodosHandler, completedTodosCount } =
    useContext(TodoContext);
  return (
    <Div>
      <Button onClick={resetTodoHandler}>
        <RiRefreshLine />
      </Button>
      <Button
        onClick={deleteCompletedTodosHandler}
        disabled={!completedTodosCount}
      >
        <RiDeleteBack2Line />
      </Button>
    </Div>
  );
};

export default TodoActions;

const Div = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  & button {
    margin-left: 20px;
    height: 50px;
    cursor: pointer;
    background: orange;
    font-size: 1.5rem;
    padding: 10px 15px;
    border: none;
    border-radius: 5px;
    &:hover {
      background: #f9c761;
    }
  }
`;
