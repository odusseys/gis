import React from "react";
import styled from "styled-components";
import { Image, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import { Caption, Body } from "kiki/library/text";
import colors from "kiki/styles/colors";

const Container = styled.TouchableOpacity`
  max-width: 100%;
  flex-direction: row;
  align-self: stretch;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  margin-horizontal: 10px;
  margin-vertical: 5px;
  shadow-color: black;
  shadow-opacity: 0.2;
  shadow-offset: 1px 1px;
  elevation: 1;
  background-color: ${colors.white};
`;

const ImageContainer = styled.View`
  max-width: 100px;
  max-height: 70px;
  height: 70px;
  width: 100px;
  margin-right: 8px;
`;

const InterestContainer = styled.View`
  width: 50px;
  height: 50px;
  align-items: center;
  justify-content: center;
`;

const EventItem = ({
  onPress,
  name,
  place_name,
  image_url,
  interested,
  onInterestToggle
}) => {
  return (
    <Container onPress={onPress}>
      <ImageContainer>
        <Image
          source={{ uri: image_url }}
          style={{ maxHeight: "100%", height: "100%" }}
        />
      </ImageContainer>
      <View style={{ maxWidth: 200, flex: 1 }}>
        <Body text={name} color="black" />
        <Caption text={place_name} color="black" />
      </View>
      <InterestContainer>
        <MaterialIcons
          onPress={onInterestToggle}
          name={interested ? "star" : "star-border"}
          color={interested ? colors.yellow : colors.grey}
          size={30}
        />
      </InterestContainer>
    </Container>
  );
};
export default EventItem;
