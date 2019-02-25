import React from "react";
import styled from "styled-components";
import { FlatList, ActivityIndicator } from "react-native";
import { getEvents } from "gis/services/events";
import { Title } from "gis/library/text";
import api from "gis/api";
import EventItem from "./EventItem";

const Container = styled.View`
  flex: 1;
  align-self: stretch;
  align-items: center;
  background-color: white;
  max-width: 100%;
  width: 100%;
`;

class EventList extends React.Component {
  interestToggle = e => async () => {
    const { addInterest, removeInterest, connected } = this.props;
    console.warn(JSON.stringify(e));
    const interested = !e.interested;
    await api.events.interested({ event_id: e.id, interested });
    e.interested = interested;
    this.setState({ events: this.state.events });
  };
  render() {
    return (
      <FlatList
        style={{
          backgroundColor: "white",
          maxWidth: "100%",
          width: "100%"
        }}
        data={this.state.events.slice(0, 10)}
        keyExtractor={e => `${e.id}`}
        renderItem={({ item }) => {
          return (
            <EventItem
              onInterestToggle={this.interestToggle(item)}
              onPress={this.goToEvent(item)}
              {...item}
            />
          );
        }}
      />
    );
  }
}

export default EventList;
