import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { ActivityIndicator } from "react-native";
import BaseScreen from "kiki/screens/BaseScreen";

const Container = styled.View`
  background-color: white;
  align-items: center;
  justify-content: center;
  flex: 1;
`;

class Splash extends React.Component {
  componentDidMount = () => {
    //const route = this.props.token ? "Home" : "Signup";
    this.props.navigation.replace("Home");
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
  token: auth.token
});

export default BaseScreen(connect(mapper)(Splash));
