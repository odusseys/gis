import React from "react";
import styled from "styled-components";
import { Image, ActivityIndicator, Platform, Share } from "react-native";
import { Feather } from "@expo/vector-icons";
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

const shareIconName = Platform.select({ ios: "share", android: "share-2" });

const Container = styled.ScrollView`
  flex: 1;
  background-color: ${colors.coal};
  width: 100%;
  padding-top: 20px;
`;

const Contents = styled.View`
  background-color: ${colors.white};
  margin: 20px;
  margin-top: 0;
  padding: 15px;
  align-self: stretch;
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

const ShareContainer = styled.TouchableOpacity`
  flex: 1;
  align-self: stretch;
  justify-content: center;
  align-items: center;
  flex-direction: row;
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
  name,
  place_name,
  place_address,
  image_url,
  description,
  start_date,
  end_date,
  share
}) => {
  return (
    <Container>
      <Contents>
        <ImageContainer>
          <Image
            source={{ uri: image_url }}
            style={{ maxHeight: "100%", height: "100%" }}
          />
        </ImageContainer>
        <Title text={name} color="black" style={{ marginBottom: 12 }} />
        <Place name={place_name} address={place_address} />
        <Dates start={start_date} end={end_date} />
      </Contents>
      <Contents>
        <ShareContainer onPress={share}>
          <Body name="SHARE" style={{ marginRight: 8 }} />
          <Feather name={shareIconName} size={20} color={colors.coal} />
        </ShareContainer>
      </Contents>
      <Contents>
        <Body text={description} color="black" hyperlinks />
      </Contents>
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
  share = () => {
    const { name, id } = this.state.event;
    const url = `https://www.kiki.rocks/event/${id}`;
    Share.share({ message: url, url, title: name });
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
      return <Event {...event} share={this.share} />;
    }
  }
}

export default BaseScreen(EventScreen);
