import React from "react";
import styled from "styled-components";
import { FlatList } from "react-native";
import EventItem from "./EventItem";

class EventList extends React.Component {
  render() {
    const { onInterestToggle, onEventPress, events } = this.props;
    return (
      <FlatList
        style={{
          backgroundColor: "white",
          maxWidth: "100%",
          width: "100%"
        }}
        data={events}
        keyExtractor={e => `${e.id}`}
        renderItem={({ item }) => {
          return (
            <EventItem
              onInterestToggle={() => onInterestToggle(item)}
              onPress={() => onEventPress(item)}
              {...item}
            />
          );
        }}
      />
    );
  }
}

export default EventList;
