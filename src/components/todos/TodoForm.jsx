import React, { useContext, useState } from "react";
import styled from "styled-components";
import { TodoContext } from "./TodoManager";
import { useLanguage } from "../../context/LanguagesContext";

const TodoForm = () => {
  const { addTodoHandler } = useContext(TodoContext);
  const [enteredValue, setEnteredValue] = useState("");
  const [error, setError] = useState(null);
  const { currentLang } = useLanguage();

  const submitHandler = (event) => {
    event.preventDefault();

    if (enteredValue.trim() === "") {
      setError("Заполните поле!!!");
    } else {
      setError(null);
      addTodoHandler(enteredValue);
      setEnteredValue("");
    }
  };

  return (
    <Div>
      <Form onSubmit={submitHandler}>
        <Input
          type="text"
          value={enteredValue}
          onChange={(e) => setEnteredValue(e.target.value)}
          placeholder={currentLang.inputPlaceholder}
        />
        <Button type="submit">{currentLang.buttonText}</Button>
      </Form>
      {error && <p>{error}</p>}
    </Div>
  );
};

export default TodoForm;

const Div = styled.div`
  & > p {
    color: red;
    font-weight: 500;
    margin-right: 26rem;
    margin-bottom: 10px;
  }
`;

const Form = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 30px;
`;

const Input = styled.input`
  width: 80%;
  height: 30px;
  font-size: 1.3rem;
  padding: 25px 15px;
  border: none;
  border-radius: 5px;
  outline: none;
  display: inline-block;
`;

const Button = styled.button`
  margin-left: 20px;
  height: 50px;
  cursor: pointer;
  background-color: orange;
  font-size: 1.5rem;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  &:hover {
    background-color: #f7ca75;
  }
`;
