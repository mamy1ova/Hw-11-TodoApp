import React from "react";
import styled from "styled-components";

const Button = (props) => {
  const { children, title, onClick, disabled = false, ...rest } = props;

  return (
    <div>
      <ButTon onClick={onClick} title={title} disabled={disabled} {...rest}>
        {children}
      </ButTon>
    </div>
  );
};

export default Button;

const ButTon = styled.button`
  margin-left: 20px;
  height: 50px;
  cursor: pointer;
  background: beige;
  font-size: 1.5rem;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  &:hover {
    background-color: rgba(240, 240, 155);
  }
`;
