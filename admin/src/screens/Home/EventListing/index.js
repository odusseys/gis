import React from "react";
import styled from "styled-components";
import Event from "./Event";

const Container = styled.div``;

class EventListing extends React.Component {
  state = {
    showInactiveEvents: false
  };
  render() {
    const {
      events,
      onEventSelect,
      selectedEvent,
      onDelete,
      onActiveToggle
    } = this.props;
    return (
      <Container>
        {events.map(e => (
          <Event
            key={e.id}
            event={e}
            onClick={() => onEventSelect(e)}
            selected={selectedEvent && selectedEvent.id === e.id}
            onDelete={onDelete}
            onActiveToggle={onActiveToggle}
          />
        ))}
      </Container>
    );
  }
}

export default EventListing;
