import React from 'react';
import styled from 'styled-components';
import { FlatList, ActivityIndicator } from 'react-native';

import { getEvents } from 'gis/services/events';
import { Title } from 'gis/library/text';
import api from 'gis/api';
import EventItem from './EventItem';

const Container = styled.View`
  flex: 1;
  align-self: stretch;
  align-items: center;
  background-color: white;
  max-width: 100%;
`;

export default class Events extends React.Component {
  state = {
    events: [],
    loading: false,
  };
  componentDidMount = () => {
    this.setState({ loading: true }, async () => {
      const events = await getEvents();
      this.setState({ events, loading: false });
    });
  };
  goToEvent = e => () => {
    this.props.navigation.navigate('Event', e);
  };
  interestToggle = e => async () => {
    const interested = !e.interested;
    await api.events.interested({ event_id: e.id, interested });
    e.interested = interested;
    this.setState({ events: this.state.events });
  };
  render() {
    return (
      <Container>
        <Title name="EVENTS" style={{ marginBottom: 20 }} />
        {this.state.loading ? (
          <ActivityIndicator />
        ) : (
          <FlatList
            style={{ backgroundColor: 'white', maxWidth: '100%' }}
            data={this.state.events.slice(0, 10)}
            keyExtractor={e => `${e.id}`}
            renderItem={({ item }) => {
              return (
                <EventItem
                  onInterestToggle={this.interestToggle(item)}
                  onPress={this.goToEvent(item)}
                  {...item}
                />
              );
            }}
          />
        )}
      </Container>
    );
  }
}
