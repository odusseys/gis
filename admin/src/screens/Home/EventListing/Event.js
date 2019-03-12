import React from "react";
import styled from "styled-components";
import colors from "styles/colors";
import moment from "moment";
import EventOverLay from "./EventOverLay";

const formatDate = d => moment(d).format("MMM Do YY HH:mm");

const backgroundColor = ({ selected, active }) => {
  if (selected) {
    return colors.lightYellow;
  } else {
    if (active) {
      return "white";
    } else {
      return colors.lightRed;
    }
  }
};

const EventContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  padding: 8px 25px;
  height: 70px;
  max-height: 70px;
  cursor: pointer;
  background-color: ${backgroundColor};
  & > * {
    margin-right: 12px;
  }
  &:hover {
    background-color: ${colors.lightGrey};
  }
`;

const EventBadge = styled.div`
  min-width: 80px;
  min-height: 50px;
  background-image: url(${p => p.image_url});
  background-size: contain;
  background-repeat: no-repeat;
`;

class Event extends React.Component {
  state = {
    showOverlay: false
  };
  render() {
    const {
      onClick,
      selected,
      onDelete,
      onActiveToggle,
      event,
      style
    } = this.props;
    const {
      id,
      name,
      description,
      image_url,
      // facebook_event_url,
      start_date,
      end_date,
      active
    } = event;
    return (
      <EventContainer
        onClick={onClick}
        selected={selected}
        active={active}
        onMouseOver={() => this.setState({ showOverlay: true })}
        onMouseLeave={() => this.setState({ showOverlay: false })}
        style={style}
      >
        <EventBadge image_url={image_url} />
        <span style={{ fontWeight: "bold" }}>{name}</span>
        <span>{description.slice(0, 100)}</span>
        <span>
          {formatDate(start_date)} - {formatDate(end_date)}
        </span>
        {this.state.showOverlay && (
          <EventOverLay
            show
            active={active}
            onDelete={() => onDelete({ id })}
            onActiveToggle={active => onActiveToggle({ id, active })}
          />
        )}
      </EventContainer>
    );
  }
}

export default Event;
