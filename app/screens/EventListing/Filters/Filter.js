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
  background-color: ${p => (p.active ? colors.coal : "white")};
  border: 1px ${p => (p.active ? colors.coal : colors.lightGrey)} solid;
`;

const Filter = ({ icon: Icon, name, onPress, active, ...rest }) => {
  return (
    <Container active={active} onPress={onPress} {...rest}>
      <Icon
        color={active ? colors.white : colors.coal}
        size={20}
        style={{ marginRight: 8 }}
      />
      <Body name={name} color={active ? colors.white : colors.coal} />
    </Container>
  );
};

export default Filter;
