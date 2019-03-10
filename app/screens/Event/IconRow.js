import React from "react";
import styled from "styled-components";
import colors from "kiki/styles/colors";

const IconRowContainer = styled.View`
  flex-direction: row;
  align-self: stretch;
  align-items: center;
  margin-bottom: 12px;
  max-width: 100%;
`;

const IconContainer = styled.View`
  width: 40px;
  align-items: center;
  margin-right: 12px;
`;

const Content = styled.View`
  flex: 1;
  flex-direction: row;
  flex-wrap: ${p => (p.wrap ? "wrap" : "nowrap")};
  align-items: center;
`;

const IconRow = ({ icon: Icon, children, wrap }) => {
  return (
    <IconRowContainer>
      <IconContainer>
        <Icon size={20} color={colors.yellow} />
      </IconContainer>
      <Content wrap={wrap}>{children}</Content>
    </IconRowContainer>
  );
};

export default IconRow;
