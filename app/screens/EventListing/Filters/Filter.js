import React from "react";
import styled from "styled-components";
import colors from "kiki/styles/colors";
import { Body } from "kiki/library/text";

const Container = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 10px 20px;
  border-radius: 10px;
  background-color: ${p => (p.active ? colors.yellow : "white")};
  border: 1px ${colors.yellow} solid;
`;

const Filter = ({ icon: Icon, name, onPress, active, ...rest }) => {
  return (
    <Container active={active} onPress={onPress} {...rest}>
      <Icon color={active ? colors.white : colors.yellow} size={20} />
      <Body name={name} color={active ? colors.white : colors.yellow} />
    </Container>
  );
};

export default Filter;
