import React, { Component } from "react";
import styled from "styled-components";
import { TextInput } from "components/inputs";
import InputLine from "components/InputLine";
import { ColoredButton } from "components/buttons";

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Form = styled.form`
  max-width: 600px;
`;

class LoginScreen extends Component {
  state = {
    email: "",
    password: ""
  };
  login = e => {
    e.preventDefault();
    console.log("login");
  };
  render() {
    const { email, password } = this.state;
    return (
      <Container>
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

export default LoginScreen;
