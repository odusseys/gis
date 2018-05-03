import React from 'react';
import styled from 'styled-components';
import { FlatList } from 'react-native';

import EventItem from './EventItem';
import Async from '../../library/Async';
import { getEvents } from '../../services/events';

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
        <Async fetchData={getEvents}>
          {events => (
            <FlatList
              data={events}
              keyExtractor={e => e.id}
              renderItem={({ item }) => {
                return (
                  <EventItem onPress={() => this.goToEvent(item)} {...item} />
                );
              }}
            />
          )}
        </Async>
      </Container>
    );
  }
}
