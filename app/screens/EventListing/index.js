import React from "react";
import styled from "styled-components";
import { ActivityIndicator } from "react-native";
import { connect } from "react-redux";
import { MaterialIcons } from "@expo/vector-icons";

import { Title } from "gis/library/text";
import api from "gis/api";
import BaseScreen from "screens/BaseScreen";
import colors from "gis/styles/colors";
import EventList from "./EventList";
import Filter from "./Filter";
import CalendarFilter from "./CalendarFilter";
import { extractDistinctDates, filterByDate } from "./util";

const Container = styled.View`
  flex: 1;
  align-self: stretch;
  align-items: center;
  background-color: white;
  max-width: 100%;
  width: 100%;
`;

const FilterContainer = styled.View`
  position: absolute;
  bottom: 20;
  right: 20;
  flex-direction: row;
`;

const InterestedFilter = ({ active, onPress }) => {
  return (
    <Filter onPress={onPress} active={active}>
      <MaterialIcons
        name={active ? "star" : "star-border"}
        color={active ? colors.white : colors.yellow}
        size={30}
      />
    </Filter>
  );
};

class Events extends React.PureComponent {
  state = {
    events: [],
    interestedOnly: false,
    dateFilter: undefined,
    loading: false
  };
  componentDidMount = () => {
    this.setState({ loading: true }, async () => {
      const events = await api.events.list();
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
    const { loading, interestedOnly, events, dateFilter } = this.state;
    const interestsFiltered = interestedOnly
      ? events.filter(e => e.interested)
      : events;
    const dateOptions = extractDistinctDates(interestsFiltered);
    const eventsFiltered = dateFilter
      ? filterByDate(interestsFiltered, dateFilter)
      : interestsFiltered;
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
          <FilterContainer>
            <InterestedFilter
              active={interestedOnly}
              onPress={() => this.setState({ interestedOnly: !interestedOnly })}
            />
            <CalendarFilter
              value={dateFilter}
              onChange={dateFilter => this.setState({ dateFilter })}
              options={dateOptions}
            />
          </FilterContainer>
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
