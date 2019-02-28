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
  min-width: 80px;
  min-height: 50px;
  background-image: url(${p => p.image_url});
  background-size: contain;
  background-repeat: no-repeat;
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
      <EventBadge image_url={image_url} />
      <span style={{ fontWeight: "bold" }}>{name}</span>
      <span>{description.slice(0, 100)}</span>
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
