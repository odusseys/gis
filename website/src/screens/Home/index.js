import React, { Component } from "react";
import api from "api";
import styled from "styled-components";
import EventItem from "./EventItem";
import { withRouter } from "react-router-dom";

import { getEventGroups } from "./util";
import LazyListLoader from "components/LazyListLoader";
import colors from "styles/colors";

const Container = styled.div`
  width: 100%;
  height: 100%;
  max-width: 100%;
  overflow-y: auto;
  background: ${colors.coal};
  & > h1,
  h2 {
    text-align: center;
    font-weight: normal;
    color: white;
  }
  h2 {
    font-weight: bold;
  }
`;

const Events = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

class EventGroup extends React.PureComponent {
  render() {
    const { group, events } = this.props;
    return (
      <div>
        <h2>{group}</h2>
        <Events>
          {events.map(e => (
            <EventItem key={e.id} event={e} />
          ))}
        </Events>
      </div>
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
        <LazyListLoader
          items={groups}
          chunkSize={5}
          firstChunkSize={1}
          offset={5}
          renderItem={({ group, events }) => (
            <EventGroup events={events} group={group} key={group} />
          )}
        />
      </Container>
    );
  }
}

export default withRouter(Home);
