import React from "react";
import styled from "styled-components";
import { Image } from "react-native";
import { Ionicons, Feather } from "@expo/vector-icons";
import moment from "moment";
import { Caption, Body, Title } from "gis/library/text";
import colors from "gis/styles/colors";
import BaseScreen from "gis/screens/BaseScreen";
import frLocale from "moment/locale/fr";

const formatDate = d =>
  moment(d)
    .locale("fr", frLocale)
    .format("LLLL");

const Container = styled.View`
  flex: 1;
  width: 100%;
  background-color: ${colors.white};
  padding: 30px;
  padding-top: 0;
  align-items: center;
`;

const ImageContainer = styled.View`
  max-width: 200px;
  max-height: 140px;
  height: 140;
  width: 200;
  margin-bottom: 20px;
`;

const Description = styled.ScrollView`
  flex: 1;
  align-self: stretch;
`;

const IconRowContainer = styled.View`
  flex-direction: row;
  align-self: stretch;
  align-items: center;
`;

const IconContainer = styled.View`
  width: 40px;
  align-items: center;
  margin-right: 12px;
  margin-bottom: 10px;
`;

const IconRow = ({ icon: Icon, children }) => {
  return (
    <IconRowContainer>
      <IconContainer>
        <Icon size={20} />
      </IconContainer>
      {children}
    </IconRowContainer>
  );
};

const Dates = ({ start, end }) => {
  return (
    <IconRow icon={p => <Feather name="clock" {...p} />}>
      <Caption text={formatDate(start)} color="black" />
      <Feather name="arrow-right" style={{ marginHorizontal: 8 }} />
      <Caption text={formatDate(end)} color="black" />
    </IconRow>
  );
};

const Event = ({
  onPress,
  name,
  place_name,
  image_url,
  description,
  start_date,
  end_date,
  ...rest
}) => {
  console.warn(rest);
  return (
    <Container onPress={onPress}>
      <ImageContainer>
        <Image
          source={{ uri: image_url }}
          style={{ maxHeight: "100%", height: "100%" }}
        />
      </ImageContainer>
      <Title text={name} color="black" style={{ marginBottom: 12 }} />
      <IconRow icon={p => <Ionicons name="ios-pin" {...p} />}>
        <Body text={place_name} />
      </IconRow>
      <Dates start={start_date} end={end_date} />
      <Description>
        <Body text={description} color="black" hyperlinks />
      </Description>
    </Container>
  );
};

const EventScreen = ({ navigation }) => {
  return <Event {...navigation.state.params} />;
};

export default BaseScreen(EventScreen);
