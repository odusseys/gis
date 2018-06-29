import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { Body } from './text';
import styled from 'styled-components';
const Container = styled.View`
  flex: 1;
  background-color: transparent;
`;
export default class Async extends React.Component {
  state = { loading: true, error: false, props: null };

  componentDidMount = async () => {
    await this.fetchData();
  };

  fetchData = async () => {
    try {
      const props = await this.props.fetchData();
      this.setState({ loading: false, props });
    } catch (e) {
      this.setState({ loading: false, error: true });
    }
  };

  render() {
    if (this.state.loading) {
      return (
        <Container>
          <ActivityIndicator />
        </Container>
      );
    } else if (this.state.error) {
      return (
        <Container>
          <Body name="ERROR" />
        </Container>
      );
    }
    return this.props.children(this.state.props);
  }
}
