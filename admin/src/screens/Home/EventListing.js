import React from "react";
import styled from "styled-components";

const Container = styled.div``;

const EventContainer = styled.div`
  display: flex;
`;

const Event = ({
  id,
  name,
  description,
  image_url,
  facebook_event_url,
  start_date,
  end_date
}) => {
  return <EventContainer>{name}</EventContainer>;
};

class EventListing extends React.Component {
  state = {};
  render() {
    return (
      <Container>
        {this.props.events.map(e => (
          <Event key={e.id} event={e} />
        ))}
      </Container>
    );
  }
}

export default EventListing;
