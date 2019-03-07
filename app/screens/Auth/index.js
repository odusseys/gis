import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { Title, Body } from "kiki/library/text";
import { TextButton } from "kiki/library/buttons";
import PhoneInput from "react-native-phone-input";
import api from "kiki/api";
import BaseScreen from "kiki/screens/BaseScreen";

const Container = styled.View`
  background-color: white;
  flex: 1;
  align-items: center;
  padding-top: 20px;
`;

const Form = styled.View`
  padding-horizontal: 20px;
  padding-top: 40px;
  flex: 1;
  align-self: stretch;
`;

const FormLine = styled.View`
  margin-bottom: 12;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Input = styled.TextInput`
  height: 30px;
  border-bottom-color: black;
  border-bottom-width: 1px;
  width: 100px;
`;

const ToggleLink = styled.TouchableOpacity`
  align-self: center;
  margin-top: 25;
`;

class Signup extends React.Component {
  state = {
    verificationSent: false,
    isSignup: true,
    verificationCode: ""
  };

  sendValidationRequest = async () => {
    const verification = this.state.isSignup
      ? api.auth.signupVerification
      : api.auth.loginVerification;
    await verification({
      phone_number: { number: this.props.phoneNumber }
    });
    this.setState({ verificationSent: true });
  };

  submit = async () => {
    let res;
    if (this.state.isSignup) {
      res = await api.auth.signup({
        phone_number: { number: this.props.phoneNumber },
        name: this.props.name,
        verification_code: this.state.verificationCode
      });
    } else {
      res = await api.auth.login({
        phone_number: { number: this.props.phoneNumber },
        verification_code: this.state.verificationCode
      });
    }
    console.warn("result is: ", res);
    this.props.dispatch({ type: "LOGIN", ...res });
    this.props.navigation.navigate("Home");
  };

  renderBeforeValidation = () => {
    const { name, dispatch } = this.props;
    const { isSignup } = this.state;
    return (
      <Container>
        <Title name="WELCOME" />
        <Body
          name={isSignup ? "FIRST_SIGNUP" : "LOGIN"}
          style={{ marginTop: 10 }}
        />
        <Form>
          {isSignup && (
            <FormLine>
              <Body name="PICK_NAME" />
              <Input
                value={name || ""}
                onChangeText={e => dispatch({ type: "SET_NAME", name: e })}
              />
            </FormLine>
          )}
          <Body name="ENTER_PHONE" style={{ marginBottom: 10 }} />
          <PhoneInput
            initialCountry="fr"
            onChangePhoneNumber={number => {
              this.props.dispatch({
                type: "SET_PHONE_NUMBER",
                phoneNumber: number
              });
            }}
          />
          <TextButton
            name="RECEIVE_VERIFICATION"
            style={{ marginTop: 40 }}
            onPress={this.sendValidationRequest}
          />
          <ToggleLink onPress={() => this.setState({ isSignup: !isSignup })}>
            <Body name={isSignup ? "LOGIN" : "SIGNUP"} />
          </ToggleLink>
        </Form>
      </Container>
    );
  };

  renderPendingValidation = () => {
    const { phoneNumber } = this.props;
    return (
      <Container>
        <Body name="VALIDATION_SENT" values={{ phoneNumber }} />
        <FormLine>
          <Body name="ENTER_VALIDATION" />
          <Input
            value={this.state.verificationCode}
            onChangeText={verificationCode =>
              this.setState({ verificationCode })
            }
          />
        </FormLine>
        <TextButton
          name="VALIDATE"
          style={{ marginTop: 40 }}
          onPress={this.submit}
        />
      </Container>
    );
  };

  render() {
    return this.state.verificationSent
      ? this.renderPendingValidation()
      : this.renderBeforeValidation();
  }
}

const mapper = ({ auth }) => ({
  phoneNumber: auth.phoneNumber,
  name: auth.name,
  token: auth.token
});

export default BaseScreen(connect(mapper)(Signup));
