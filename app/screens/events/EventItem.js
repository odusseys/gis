import React from 'react';
import styled from 'styled-components';
import { Image } from 'react-native';
import { Caption, Body } from '../../library/text';
import colors from '../../styles/colors';
import { MaterialIcons } from '@expo/vector-icons';

const Container = styled.TouchableOpacity`
  flex-direction: row;
  align-self: stretch;
  align-items: center;
  justify-content: space-between;
  padding: 15px;
  border-bottom-width: 2px;
  border-bottom-color: ${colors.night};
  background-color: ${colors.lightPurple};
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
      <Body text={name} />
      <Caption text={place_name} />
      <MaterialIcons name="chevron-right" />
    </Container>
  );
};
export default EventItem;
