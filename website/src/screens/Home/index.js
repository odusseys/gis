import React, { Component } from "react";
import api from "api";
import { List, AutoSizer } from "react-virtualized";

import EventItem from "./EventItem";
import { withRouter } from "react-router-dom";

class Home extends Component {
  state = { events: [], loading: true };
  componentDidMount = async () => {
    const events = await api.events.list();
    this.setState({ events, loading: false });
  };
  render() {
    const { events } = this.state;
    return (
      <AutoSizer>
        {({ height, width }) => (
          <List
            width={width}
            height={height}
            rowCount={events.length}
            rowHeight={90}
            rowRenderer={({ index, style }) => {
              const e = events[index];
              return (
                <EventItem
                  key={e.id}
                  event={e}
                  onClick={() => this.props.history.push(`/event/${e.id}`)}
                  style={style}
                />
              );
            }}
          />
        )}
      </AutoSizer>
    );
  }
}

export default withRouter(Home);
