import React, { Component } from "react";
import styled from "styled-components";
import InputLine from "components/InputLine";
import { TextInput } from "components/inputs";
import { ColoredButton } from "components/buttons";
import { Dialog } from "@blueprintjs/core";

const Form = styled.form`
  margin: 20px;
  display: flex;
  flex-direction: column;
  & > button {
    align-self: flex-end;
  }
`;

class PlaceCreationDialog extends Component {
  state = { name: "", address: "" };

  render() {
    const { isOpen, onSubmit, onClose } = this.props;
    return (
      <Dialog isOpen={isOpen} onClose={onClose}>
        <Form
          onSubmit={e => {
            e.preventDefault();
            onSubmit(this.state);
          }}
        >
          <InputLine label="Place name">
            <TextInput
              value={this.state.name}
              onChange={e => this.setState({ name: e.target.value })}
            />
          </InputLine>
          <InputLine label="Address">
            <TextInput
              value={this.state.address}
              onChange={e => this.setState({ address: e.target.value })}
            />
          </InputLine>
          <ColoredButton>Create</ColoredButton>
        </Form>
      </Dialog>
    );
  }
}

export default PlaceCreationDialog;
