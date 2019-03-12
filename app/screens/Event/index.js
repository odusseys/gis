import React from "react";
import styled from "styled-components";
import { Image, ActivityIndicator } from "react-native";
import { Ionicons, Feather } from "@expo/vector-icons";
import moment from "moment";
import { Caption, Body, Title } from "kiki/library/text";
import colors from "kiki/styles/colors";
import BaseScreen from "kiki/screens/BaseScreen";
import frLocale from "moment/locale/fr";
import IconRow from "./IconRow";
import Place from "./Place";
import api from "kiki/api";

const formatDate = d =>
  moment(d)
    .locale("fr", frLocale)
    .format("LLLL");

const Container = styled.View`
  flex: 1;
  width: 100%;
  background-color: ${colors.white};
  padding: 30px;
  align-items: center;
  justify-content: center;
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

const Dates = ({ start, end }) => {
  return (
    <IconRow icon={p => <Feather name="clock" {...p} />} wrap>
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
  place_address,
  image_url,
  description,
  start_date,
  end_date
}) => {
  return (
    <Container onPress={onPress}>
      <ImageContainer>
        <Image
          source={{ uri: image_url }}
          style={{ maxHeight: "100%", height: "100%" }}
        />
      </ImageContainer>
      <Title text={name} color="black" style={{ marginBottom: 12 }} />
      <Place name={place_name} address={place_address} />
      <Dates start={start_date} end={end_date} />
      <Description>
        <Body text={description} color="black" hyperlinks />
      </Description>
    </Container>
  );
};

class EventScreen extends React.Component {
  state = {
    loading: true,
    event: null
  };
  componentDidMount = async () => {
    const { id } = this.props.navigation.state.params;
    const event = await api.events.get({ id });
    this.setState({ event, loading: false });
  };
  render() {
    const { loading, event } = this.state;
    if (loading) {
      return (
        <Container>
          <ActivityIndicator />
        </Container>
      );
    } else {
      return <Event {...event} />;
    }
  }
}

export default BaseScreen(EventScreen);
