import React from "react";
import styled from "styled-components";

const COLORS = [
  "#E70000",
  "#FF8C00",
  "#FFEF00",
  "#00811F",
  "#0044FF",
  "#760089"
];

const Container = styled.View`
  position: absolute;
  left: 0;
  right: 0;
  height: 3px;
  top: 0;
  z-index: 100;
  flex-direction: row;
`;

const Stripe = styled.View`
  height: 100%;
  flex: 1;
`;

const Rainbow = () => {
  return (
    <Container>
      {COLORS.map(c => (
        <Stripe key={c} style={{ backgroundColor: c }} />
      ))}
    </Container>
  );
};

export default Rainbow;
