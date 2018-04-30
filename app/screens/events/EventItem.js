import React from 'react';
import styled from 'styled-components';
import { Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import { Caption, Body } from '../../library/text';
import colors from '../../styles/colors';

const Container = styled.TouchableOpacity`
  flex-direction: row;
  align-self: stretch;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  margin-horizontal: 10px;
  margin-vertical: 3px;
  border-radius: 2px;
  border: 1px ${colors.lightPurple} solid;
  background-color: ${colors.purple};
`;
const ImageContainer = styled.View`
  max-width: 100px;
  max-height: 70px;
  height: 70px;
  width: 100px;
`;
const EventItem = ({ onPress, name, place_name, image_url }) => {
  return (
    <Container onPress={onPress}>
      <ImageContainer>
        <Image
          source={{ uri: image_url }}
          style={{ maxHeight: '100%', height: '100%' }}
        />
      </ImageContainer>
      <Body text={name} color="lightPurple" />
      <Caption text={place_name} color="lightPurple" />
      <MaterialIcons name="chevron-right" color={colors.lightPurple} />
    </Container>
  );
};
export default EventItem;
