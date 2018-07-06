import React from 'react';
import styled from 'styled-components';
import { Image, View } from 'react-native';
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
  margin-vertical: 5px;
  border: 1px ${colors.coal} solid;
  background-color: ${colors.white};
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
      <View>
        <Body text={name} color="black" />
        <Caption text={place_name} color="black" />
      </View>

      <MaterialIcons name="chevron-right" color={colors.lightPurple} />
    </Container>
  );
};
export default EventItem;
