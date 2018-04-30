import React from 'react';
import styled from 'styled-components';
import EventItem from './EventItem';
import Async from '../../library/Async';
import api from '../../api';

const Container = styled.View`
  flex: 1;
  align-self: stretch;
`;

export default class Events extends React.Component {
  goToEvent = e => {
    this.props.navigation.navigate('Event', e);
  };
  render() {
    return (
      <Container>
        <Async fetchData={api.events.list}>
          {events =>
            events.map((e, i) => (
              <EventItem onPress={() => this.goToEvent(e)} key={i} {...e} />
            ))
          }
        </Async>
      </Container>
    );
  }
}
