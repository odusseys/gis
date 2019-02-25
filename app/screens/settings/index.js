import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { TextButton } from "gis/library/buttons";
import BaseScreen from "screens/BaseScreen";

const Container = styled.View`
  flex: 1;
  background-color: white;
  padding: 10px;
`;

class Settings extends React.Component {
  logout = () => {
    this.props.logout();
    this.props.navigation.popToTop();
  };
  render() {
    return (
      <Container>
        {this.props.connected && (
          <TextButton name="LOGOUT" onPress={this.logout} />
        )}
      </Container>
    );
  }
}

const mapStateToProps = ({ auth }) => ({
  connected: !!auth.token
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch({ type: "LOGOUT" })
});

export default BaseScreen(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Settings)
);
