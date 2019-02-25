import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  &:last-child {
    margin-bottom: 0;
  }
  & > span {
    margin-right: 12px;
  }
`;

const InputLine = ({ label, children }) => {
  return (
    <Container>
      <span>{label}</span>
      {children}
    </Container>
  );
};

export default InputLine;
