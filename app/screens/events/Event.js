import React from 'react';
import styled from 'styled-components';
import { Image } from 'react-native';
import { Caption, Body, Title } from '../../library/text';
import colors from '../../styles/colors';
import { MaterialIcons } from '@expo/vector-icons';

const Container = styled.View`
  flex: 1;
  align-items: center;
  background-color: ${colors.night};
`;
const ImageContainer = styled.View`
  max-width: 200px;
  max-height: 140px;
  height: 140;
  width: 200;
  margin-bottom: 20px;
`;
const Event = ({
  onPress,
  name,
  place_name,
  image_url,
  description,
  start_date,
  end_date,
}) => {
  return (
    <Container onPress={onPress}>
      <ImageContainer>
        <Image
          source={{ uri: image_url }}
          style={{ maxHeight: '100%', height: '100%' }}
        />
      </ImageContainer>
      <Title text={name} color="white" />
      <Caption text={place_name} color="white" />
      <Caption text={start_date} color="white" />
      <Caption text={end_date} color="white" />
      <Body text={description} color="white" />
    </Container>
  );
};

const EventScreen = ({ navigation }) => {
  return <Event {...navigation.state.params} />;
};

export default EventScreen;