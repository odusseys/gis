import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { TextButton } from 'gis/library/buttons';

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
        <TextButton name="LOGOUT" onPress={this.logout} />
      </Container>
    );
  }
}

export default connect(
  null,
  dispatch => ({
    logout: () => dispatch({ type: 'LOGOUT' }),
  }),
)(Settings);
