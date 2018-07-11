import React from 'react';
import styled from 'styled-components';
import { Caption } from './text';
import colors from '../styles/colors';

export const Button = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  height: 40px;
  min-width: 150px;
  background-color: ${colors.coal};
`;

export const TextButton = ({ name, text, ...rest }) => {
  return (
    <Button {...rest}>
      <Caption name={name} text={text} color="white" />
    </Button>
  );
};
