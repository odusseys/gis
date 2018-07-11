import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Title, Body } from '../../library/text';
import { TextButton } from '../../library/buttons';
import api from '../../api';

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

class Signup extends React.Component {
  state = {
    verificationSent: false,
    verificationCode: '',
  };

  sendValidationRequest = async () => {
    await api.auth.signupVerification({
      phone_number: { number: this.props.phoneNumber, region: 'FR' },
    });
    this.setState({ verificationSent: true });
  };

  signup = async () => {
    const res = await api.auth.signup({
      phone_number: { number: this.props.phoneNumber, region: 'FR' },
      name: this.props.name,
    });
    this.props.dispatch({ type: 'LOGIN', ...res });
  };

  renderPreSignup = () => {
    const { phoneNumber, name, dispatch } = this.props;
    return (
      <Container>
        <Title name="WELCOME" />
        <Body name="FIRST_SIGNUP" style={{ marginTop: 10 }} />
        <Form>
          <FormLine>
            <Body name="PICK_NAME" />
            <Input
              value={name || ''}
              onChangeText={e => dispatch({ type: 'SET_NAME', name: e })}
            />
          </FormLine>
          <FormLine>
            <Body name="ENTER_PHONE" />
            <Input
              value={phoneNumber || ''}
              onChangeText={e =>
                dispatch({ type: 'SET_PHONE_NUMBER', phoneNumber: e })
              }
            />
          </FormLine>
          <TextButton
            name="RECEIVE_VERIFICATION"
            style={{ marginTop: 40 }}
            onPress={this.sendValidationRequest}
          />
        </Form>
      </Container>
    );
  };

  renderPostSignup = () => {
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
          onPress={this.signup}
        />
      </Container>
    );
  };

  render() {
    return this.state.verificationSent
      ? this.renderPostSignup()
      : this.renderPreSignup();
  }
}

const mapper = ({ auth }) => ({
  phoneNumber: auth.phoneNumber,
  name: auth.name,
  token: auth.token,
});

export default connect(mapper)(Signup);
