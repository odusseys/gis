import React from "react";
import styled from "styled-components";
import { ActivityIndicator, View } from "react-native";
import { connect } from "react-redux";
import { Title } from "gis/library/text";
import api from "gis/api";
import BaseScreen from "screens/BaseScreen";
import EventList from "./EventList";
import { extractDistinctDates, filterByDate } from "./util";
import Filters from "./Filters";

const Container = styled.View`
  flex: 1;
  align-self: stretch;
  align-items: center;
  background-color: white;
  max-width: 100%;
  width: 100%;
`;

class Events extends React.PureComponent {
  state = {
    events: [],
    filters: { interested: false, date: undefined }
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
    const { loading, events, filters } = this.state;
    const { date, interested } = filters;
    const interestsFiltered = interested
      ? events.filter(e => e.interested)
      : events;
    const dateOptions = extractDistinctDates(interestsFiltered);
    const eventsFiltered = date
      ? filterByDate(interestsFiltered, date)
      : interestsFiltered;
    return (
      <Container>
        <Title name="EVENTS" style={{ marginBottom: 20 }} />
        {loading ? (
          <View style={{ flex: 1 }}>
            <ActivityIndicator />
          </View>
        ) : (
          <EventList
            events={eventsFiltered}
            onEventPress={this.goToEvent}
            onInterestToggle={this.interestToggle}
          />
        )}
        <Filters
          value={filters}
          onChange={filters => this.setState({ filters })}
          dateOptions={dateOptions}
        />
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
