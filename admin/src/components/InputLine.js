import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: ${p => (p.column ? "column" : "row")};
  width: 100%;
  justify-content: space-between;
  align-items: ${p => (p.column ? "flex-start" : "center")};
  margin-bottom: 8px;
  &:last-child {
    margin-bottom: 0;
  }
  & > span {
    margin-right: ${p => (p.column ? "0" : "12px")};
    margin-bottom: ${p => (p.column ? "12px" : "0")};
  }
`;

const InputLine = ({ label, children, required, column }) => {
  return (
    <Container column={column}>
      <span>
        {label} {required && <span style={{ color: "grey" }}>*</span>}
      </span>
      {children}
    </Container>
  );
};

export default InputLine;
