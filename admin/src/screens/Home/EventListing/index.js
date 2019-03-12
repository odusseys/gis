import React from "react";
import styled from "styled-components";
import { List, AutoSizer } from "react-virtualized";
import Event from "./Event";

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const containsSub = (a, b) => a.toLowerCase().includes(b.toLowerCase());
class EventListing extends React.PureComponent {
  state = {
    showInactiveEvents: false,
    filter: ""
  };
  eventsFiltered = () => {
    const { filter } = this.state;
    return this.props.events.filter(
      ({ name, description }) =>
        containsSub(name, filter) || containsSub(description, filter)
    );
  };
  render() {
    const {
      onEventSelect,
      selectedEvent,
      onDelete,
      onActiveToggle
    } = this.props;
    const eventsFiltered = this.eventsFiltered();
    return (
      <Container>
        <input
          type="text"
          value={this.state.filter}
          onChange={e => this.setState({ filter: e.target.value })}
        />
        <div style={{ flex: 1 }}>
          <AutoSizer>
            {({ height, width }) => (
              <List
                width={width}
                height={height}
                rowCount={eventsFiltered.length}
                rowHeight={70}
                rowRenderer={({ index, style }) => {
                  const e = eventsFiltered[index];
                  return (
                    <Event
                      key={e.id}
                      event={e}
                      onClick={() => onEventSelect(e)}
                      selected={selectedEvent && selectedEvent.id === e.id}
                      onDelete={onDelete}
                      onActiveToggle={onActiveToggle}
                      style={style}
                    />
                  );
                }}
              />
            )}
          </AutoSizer>
        </div>
      </Container>
    );
  }
}

export default EventListing;
