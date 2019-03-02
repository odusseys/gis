import React from "react";
import styled from "styled-components";
import { FlatList, ActivityIndicator } from "react-native";
import { connect } from "react-redux";
import { MaterialIcons } from "@expo/vector-icons";

import { getEvents } from "gis/services/events";
import { Title } from "gis/library/text";
import api from "gis/api";
import EventItem from "./EventItem";
import BaseScreen from "screens/BaseScreen";
import colors from "gis/styles/colors";
import EventList from "./EventList";

const Container = styled.View`
  flex: 1;
  align-self: stretch;
  align-items: center;
  background-color: white;
  max-width: 100%;
  width: 100%;
`;

const FilterContainer = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  border-radius: 30px;
  background-color: ${p => (p.active ? colors.yellow : "white")};
  position: absolute;
  bottom: 20;
  right: 20;
  shadow-color: black;
  shadow-opacity: 0.2;
  shadow-offset: 1px 1px;
  elevation: 2;
`;

const InterestedFilter = ({ active, onPress }) => {
  return (
    <FilterContainer onPress={onPress} active={active}>
      <MaterialIcons
        name={active ? "star" : "star-border"}
        color={active ? colors.white : colors.yellow}
        size={30}
      />
    </FilterContainer>
  );
};

class Events extends React.Component {
  state = {
    events: [],
    interestedOnly: false,
    loading: false
  };
  componentDidMount = () => {
    this.setState({ loading: true }, async () => {
      const events = await getEvents();
      const { connected, interests } = this.props;
      if (!connected) {
        for (let e of events) {
          e.interested = !!interests[e.id];
        }
      }
      this.setState({ events, loading: false });
    });
  };
  goToEvent = e => {
    this.props.navigation.navigate("Event", e);
  };

  interestToggle = async e => {
    const { addInterest, removeInterest, connected } = this.props;
    const interested = !e.interested;
    if (connected) {
      await api.events.interested({ event_id: e.id, interested });
    } else {
      const f = interested ? addInterest : removeInterest;
      f(e.id);
    }
    e.interested = interested;
    this.setState({ events: this.state.events });
  };
  render() {
    const { loading, interestedOnly, events } = this.state;
    const eventsFiltered = interestedOnly
      ? events.filter(e => e.interested)
      : events;
    return (
      <Container>
        <Title name="EVENTS" style={{ marginBottom: 20 }} />
        {loading ? (
          <ActivityIndicator />
        ) : (
          <EventList
            events={eventsFiltered}
            onEventPress={this.goToEvent}
            onInterestToggle={this.interestToggle}
          />
        )}
        {
          <InterestedFilter
            active={interestedOnly}
            onPress={() => this.setState({ interestedOnly: !interestedOnly })}
          />
        }
      </Container>
    );
  }
}

const mapper = ({ auth, interests }) => ({
  connected: !!auth.token,
  interests
});

const dispatcher = dispatch => ({
  addInterest: eventId => dispatch({ type: "ADD_INTEREST", eventId }),
  removeInterest: eventId => dispatch({ type: "REMOVE_INTEREST", eventId })
});

export default BaseScreen(
  connect(
    mapper,
    dispatcher
  )(Events)
);
