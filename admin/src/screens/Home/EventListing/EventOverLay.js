import React from "react";
import styled from "styled-components";
import { FaTrashAlt, FaRegWindowClose, FaRegCheckSquare } from "react-icons/fa";
import colors from "styles/colors";

const Container = styled.div`
  display: ${p => (p.show ? "flex" : "none")};
  & > * {
    margin-right: 8px;
  }
  padding: 8px;
  position: absolute;
  background: ${colors.lightGrey};
  right: 10px;
  top: 10px;
  bottom: 10px;
`;

const IconButton = styled.button`
  border: none;
  padding: 8px;
  background: ${colors.lightGrey};
  color: grey;
  cursor: pointer;
  border-radius: 8px;
  &:hover {
    filter: brightness(0.9);
  }
`;

export default ({ show, active, onDelete, onActiveToggle }) => {
  return (
    <Container show={show}>
      <IconButton
        onClick={e => {
          e.stopPropagation();
          onDelete();
        }}
      >
        <FaTrashAlt />
      </IconButton>
      <IconButton
        onClick={e => {
          e.stopPropagation();
          onActiveToggle(!active);
        }}
      >
        {active ? <FaRegWindowClose /> : <FaRegCheckSquare />}
      </IconButton>
    </Container>
  );
};
