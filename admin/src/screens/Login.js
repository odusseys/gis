import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { TextInput } from "components/inputs";
import InputLine from "components/InputLine";
import { ColoredButton } from "components/buttons";
import api from "api";

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Form = styled.form`
  max-width: 600px;
  display: flex;
  flex-direction: column;
  & > button {
    align-self: flex-end;
  }
`;

class LoginScreen extends Component {
  state = {
    email: "",
    password: ""
  };
  login = async e => {
    const { email, password } = this.state;
    e.preventDefault();
    const payload = await api.auth.login({ email, password });
    this.props.login(payload);
    window.location = "/";
  };
  render() {
    const { email, password } = this.state;
    return (
      <Container>
        <h1>kiki</h1>
        <Form onSubmit={this.login}>
          <InputLine label="Email">
            <TextInput
              type="email"
              value={email}
              onChange={e => this.setState({ email: e.target.value })}
            />
          </InputLine>
          <InputLine label="Password">
            <TextInput
              type="password"
              value={password}
              onChange={e => this.setState({ password: e.target.value })}
            />
          </InputLine>
          <ColoredButton>Sign in</ColoredButton>
        </Form>
      </Container>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  login: payload => dispatch({ type: "LOGIN", payload })
});

export default connect(
  null,
  mapDispatchToProps
)(LoginScreen);
