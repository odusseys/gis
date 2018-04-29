import React from 'react';
import styled from 'styled-components';
import Event from './Event';
import Async from '../../library/Async';
import api from '../../api';

const Container = styled.View`
  flex: 1;
`;

export default class Events extends React.Component {
  render() {
    return (
      <Container>
        <Async fetchData={api.events.list}>
          {events => events.map(e => <Event key={e.id} {...e} />)}
        </Async>
      </Container>
    );
  }
}
