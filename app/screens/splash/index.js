import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { ActivityIndicator } from 'react-native';

const Container = styled.View`
  background-color: white;
  align-items: center;
  justify-content: center;
  flex: 1;
`;

class Signup extends React.Component {
  componentDidMount = () => {
    console.warn(this.props.token);
    const route = this.props.token ? 'Home' : 'Signup';
    this.props.navigation.navigate(route);
  };
  render() {
    return (
      <Container>
        <ActivityIndicator size="large" />
      </Container>
    );
  }
}

const mapper = ({ auth }) => ({
  token: auth.token,
});

export default connect(mapper)(Signup);
