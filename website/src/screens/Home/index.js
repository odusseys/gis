import React, { Component } from "react";
import api from "api";
import {
  List,
  AutoSizer,
  CellMeasurer,
  CellMeasurerCache
} from "react-virtualized";
import styled from "styled-components";
import EventItem from "./EventItem";
import { withRouter } from "react-router-dom";

import { getEventGroups } from "./util";

const Container = styled.div`
  width: 100%;
  height: 100%;
  max-width: 100%;
  overflow: hidden;
`;

const cellCache = new CellMeasurerCache({
  defaultWidth: 100,
  minWidth: 75,
  fixedWidth: true
});

const Events = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

class EventGroup extends React.PureComponent {
  render() {
    const { group, events, index, parent, style, onClick } = this.props;
    return (
      <CellMeasurer
        rowIndex={index}
        parent={parent}
        cache={cellCache}
        columnIndex={0}
        key={group}
      >
        <div style={style}>
          <h1 style={{ textAlign: "center" }}>{group}</h1>
          <Events>
            {events.map(e => (
              <EventItem key={e.id} event={e} onClick={() => onClick(e)} />
            ))}
          </Events>
        </div>
      </CellMeasurer>
    );
  }
}

class Home extends Component {
  state = { events: [], loading: true };
  componentDidMount = async () => {
    const events = await api.events.list();
    this.setState({ events, loading: false });
  };
  render() {
    const { events } = this.state;
    const groups = getEventGroups(events);
    return (
      <Container>
        <AutoSizer>
          {({ height, width }) => (
            <List
              ref={r => (this.list = r)}
              width={width}
              height={height}
              rowCount={groups.length}
              deferredMeasurementCache={cellCache}
              rowHeight={cellCache.rowHeight}
              rowRenderer={({ index, ...rest }) => {
                const { group, events } = groups[index];
                return (
                  <EventGroup
                    events={events}
                    group={group}
                    index={index}
                    onClick={e => this.props.history.push(`/event/${e.id}`)}
                    {...rest}
                  />
                );
              }}
            />
          )}
        </AutoSizer>
      </Container>
    );
  }
}

export default withRouter(Home);
