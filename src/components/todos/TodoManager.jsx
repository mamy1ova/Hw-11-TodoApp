import React, { useEffect, createContext, useReducer } from "react";
import "../../App.css";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";
import TodoActions from "./TodoActions";
import uuid from "react-uuid";
import { useLanguage } from "../../context/LanguagesContext";
import styled from "styled-components";
import { BsFillMoonStarsFill } from "react-icons/bs";
import { useTheme } from "../../context/ThemeContext";

export const TodoContext = createContext();

const todosReducer = (state, action) => {
  switch (action.type) {
    case "ADD-TODO":
      return [...state, action.payload];
    case "DELETE-TODO":
      return state.filter((todo) => todo.id !== action.payload);
    case "TOGGLE-TODO":
      return state.map((todo) =>
        todo.id === action.payload
          ? { ...todo, isCompleted: !todo.isCompleted }
          : todo
      );
    case "RESET":
      return [];
    case "DELETE":
      return state.filter((todo) => !todo.isCompleted);
    default:
      return state;
  }
};

const TodoManager = () => {
  const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
  const [todos, dispatch] = useReducer(todosReducer, savedTodos);
  const { currentLang, dispatch: dispatchLanguage } = useLanguage();
  const { dispatch: dispatchTheme, theme } = useTheme();
  console.log(theme);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const getDate = () => {
    const date = new Date();
    const day = date.getDay();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const hour = date.getHours();
    const minute = date.getMinutes();

    const formatDate = `${day}/${month}/${year}  - ${hour}:${minute}`;
    return formatDate;
  };

  const addTodoHandler = (text) => {
    const newTodo = {
      text: text,
      isCompleted: false,
      id: uuid(),
      date: getDate(),
    };
    dispatch({ type: "ADD-TODO", payload: newTodo });
  };

  const deleteButtonHandler = (id) => {
    dispatch({ type: "DELETE-TODO", payload: id });
  };

  const toogleTodoHandler = (id) => {
    dispatch({ type: "TOGGLE-TODO", payload: id });
  };

  const resetTodoHandler = () => {
    dispatch({ type: "RESET" });
  };

  const deleteCompletedTodosHandler = () => {
    dispatch({ type: "DELETE" });
  };

  const completedTodosCount = () =>
    todos.filter((todo) => todo.isCompleted).length;

  return (
    <div className={theme}>
      <Div>
        <button
          onClick={() => dispatchLanguage({ type: "CHANGE", payload: "ru" })}
        >
          RU
        </button>
        <button
          onClick={() => dispatchLanguage({ type: "CHANGE", payload: "en" })}
        >
          EN
        </button>
        <button
          onClick={() => dispatchLanguage({ type: "CHANGE", payload: "kg" })}
        >
          KG
        </button>

        <Button onClick={() => dispatchTheme({ type: "TOOGLE" })}>
          <BsFillMoonStarsFill />
        </Button>
      </Div>
      <TodoContext.Provider
        value={{
          addTodoHandler,
          resetTodoHandler,
          deleteCompletedTodosHandler,
          completedTodosCount,
          todos,
          deleteButtonHandler,
          toogleTodoHandler,
        }}
      >
        <div className="App">
          <h1>{currentLang.title}</h1>
          <TodoForm />
          <TodoActions />
          <TodoList />
          {completedTodosCount() > 0 && (
            <P>
              {currentLang.message} - {completedTodosCount()}
            </P>
          )}
        </div>
      </TodoContext.Provider>
    </div>
  );
};

export default TodoManager;

const Div = styled.div`
  display: flex;
  justify-content: end;
  & button {
    margin: 20px;
    border: none;
    width: 40px;
    height: 40px;
    border-radius: 6px;
    background-color: white;
    font-weight: 530;
    &:hover {
      background-color: orange;
      color: white;
      font-weight: bold;
    }
  }
`;

const Button = styled.button`
  margin: 20px;
  border: none;
  width: 40px;
  height: 40px;
  cursor: pointer;
  background-color: white;
  &:hover {
    background-color: orange;
    color: white;
    font-weight: bold;
  }
`;

const P = styled.p`
  font-size: 18px;
  font-weight: bold;
  color: #818181;
  text-align: center;
`;
