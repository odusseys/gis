import React from "react";
import styled, { css } from "styled-components";
import colors from "styles/colors";
import moment from "moment";

const formatDate = d => moment(d).format("MMM Do YY HH:mm");

const Container = styled.div``;

const EventContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 8px;
  cursor: pointer;
  & > * {
    margin-right: 12px;
  }
  &:hover {
    background-color: ${colors.lightGrey};
  }
  ${p =>
    p.selected &&
    css`
      background-color: ${colors.lightYellow};
      &:hover {
        background-color: ${colors.lightYellow};
      }
    `}
`;

const EventBadge = styled.div`
  max-width: 80px;
  width: 80px;
  max-height: 50px;
  height: 50px;
  & > img {
    max-height: 100%;
    max-width: 100%;
  }
`;

const Event = ({
  id,
  name,
  description,
  image_url,
  facebook_event_url,
  start_date,
  end_date,
  onClick,
  selected
}) => {
  return (
    <EventContainer onClick={onClick} selected={selected}>
      <EventBadge>
        <img alt="event badge" src={image_url} />
      </EventBadge>
      <span>{name}</span>
      <span>{description}</span>
      <span>
        {formatDate(start_date)} - {formatDate(end_date)}
      </span>
    </EventContainer>
  );
};

class EventListing extends React.Component {
  state = {};
  render() {
    const { events, onEventSelect, selectedEvent } = this.props;
    return (
      <Container>
        {events.map(e => (
          <Event
            key={e.id}
            {...e}
            onClick={() => onEventSelect(e)}
            selected={selectedEvent && selectedEvent.id === e.id}
          />
        ))}
      </Container>
    );
  }
}

export default EventListing;
