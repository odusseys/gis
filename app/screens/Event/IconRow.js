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

const IconRow = ({ icon: Icon, children }) => {
  return (
    <IconRowContainer>
      <IconContainer>
        <Icon size={20} color={colors.yellow} />
      </IconContainer>
      {children}
    </IconRowContainer>
  );
};

export default IconRow;
