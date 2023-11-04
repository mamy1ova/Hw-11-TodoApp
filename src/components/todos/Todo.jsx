import React, { useState } from "react";
import { RiTodoFill, RiDeleteBack2Line, RiPencilLine } from "react-icons/ri";
import { FaCheck } from "react-icons/fa";
import styled from "styled-components";
import ModalEdit from "./ModalEdit";
import ModalDelete from "./ModalDelete";

const Todo = ({ todo, onDeleteTodo, onToogle }) => {
  const [editModalActive, setEditModalActive] = useState(false);
  const [deleteModalActive, setDeleteModalActive] = useState(false);
  const [editedText, setEditedText] = useState(todo.text);
  const [tempText, setTempText] = useState(todo.text);
  const [isCompleted, setIsCompleted] = useState(false);

  const handleEdit = () => {
    setEditModalActive(false);

    if (editedText !== tempText) {
      setEditedText(tempText);
    }
  };

  return (
    <TodoDiv>
      <RiTodoFill className="todoIcon" />
      <div>{editedText}</div>
      <p>{todo.date}</p>
      <RiPencilLine
        className="todoPencil"
        onClick={() => {
          setTempText(editedText);
          setEditModalActive(true);
        }}
      />
      <RiDeleteBack2Line
        className="deleteIcon"
        onClick={() => setDeleteModalActive(true)}
      />
      {deleteModalActive && (
        <ModalDelete
          active={deleteModalActive}
          setActive={setDeleteModalActive}
        >
          <p>Вы уверены, что хотите удалить задачу?</p>
          <button onClick={() => onDeleteTodo(todo.id)}>Да</button>
          <button onClick={() => setDeleteModalActive(false)}>Нет</button>
        </ModalDelete>
      )}
      {editModalActive && (
        <ModalEdit active={editModalActive} setActive={setEditModalActive}>
          <form>
            <h2>Edit Todo</h2>
            <input
              type="text"
              value={tempText}
              onChange={(e) => setTempText(e.target.value)}
            />
            <button className="" onClick={handleEdit}>
              Изменить
            </button>
            <button onClick={() => setEditModalActive(false)}>Отмена</button>
          </form>
        </ModalEdit>
      )}
      <FaCheck
        className={`checkIcon ${isCompleted ? "completed" : ""}`}
        onClick={() => {
          onToogle(todo.id);
          setIsCompleted(!isCompleted);
        }}
      />
    </TodoDiv>
  );
};

export default Todo;

const TodoDiv = styled.div`
  display: flex;
  align-items: center;
  margin-top: 15px;
  padding: 10px 20px;
  font-size: 1.5rem;
  border-radius: 5px;
  color: #112d49;
  background-color: #fbfef9;
  position: relative;
  width: 600px;
  & > p {
    position: absolute;
    right: 150px;
    font-size: 16px;
  }
  &.completed {
    background-color: #636363;
  }
`;
