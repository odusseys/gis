import React, { Component } from "react";
import styled from "styled-components";
import InputLine from "components/InputLine";
import { TextInput } from "components/inputs";
import { ColoredButton } from "components/buttons";
import PlaceSelector from "./PlaceSelector";
import PlaceCreationDialog from "./PlaceCreationDialog";
import DateTimePicker from "components/DateTimePicker";
import moment from "moment";
import { EditableText } from "@blueprintjs/core";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  & > button {
    align-self: flex-end;
  }
  .bp3-editable-text {
    width: 100%;
  }
`;

const Error = styled.div`
  color: red;
`;

const normalizeEvent = ({ start_date, end_date, ...rest }) => {
  return {
    start_date: start_date && moment(start_date).toDate(),
    end_date: end_date && moment(end_date).toDate(),
    ...rest
  };
};

class EventForm extends Component {
  state = {
    ...normalizeEvent(this.props.defaultValue || {}),
    showPlaceCreationDialog: false,
    errors: []
  };
  setField = name => e => this.setState({ [name]: e.target.value });
  submit = e => {
    e.preventDefault();
    const { showPlaceCreationDialog, errors, ...data } = this.state;
    if (this.validateForm(data)) {
      this.props.onSubmit(data);
      this.setState({ errors: [] });
    }
  };
  createPlace = async p => {
    await this.props.onCreatePlace(p);
    this.setState({ showPlaceCreationDialog: false });
  };
  validateForm = ({ start_date, end_date, place_id }) => {
    const errors = [];

    if (!place_id) {
      errors.push("Select a place");
    }
    if (!start_date || !end_date) {
      errors.push("Select a start and end date");
    }
    if (start_date > end_date) {
      errors.push("End date must be after start date");
    }

    this.setState({ errors });
    return errors.length === 0;
  };
  render() {
    const {
      name,
      description,
      start_date,
      end_date,
      facebook_event_url,
      ticket_service_url,
      image_url,
      place_id,
      showPlaceCreationDialog,
      errors
    } = this.state;
    const { mode, places } = this.props;
    return (
      <Form onSubmit={this.submit}>
        <InputLine label="Event name" required>
          <TextInput
            value={name || ""}
            onChange={this.setField("name")}
            required
          />
        </InputLine>
        <InputLine label="Description" required column>
          <EditableText
            value={description || ""}
            onChange={d => this.setState({ description: d })}
            multiline
            minLines={3}
            maxLines={10}
          />
        </InputLine>
        <InputLine label="Place">
          <PlaceSelector
            place_id={place_id}
            places={places}
            onSelect={p => this.setState({ place_id: p.id })}
            onCreate={() => this.setState({ showPlaceCreationDialog: true })}
          />
        </InputLine>
        <InputLine label="Image url" required>
          <TextInput
            value={image_url || ""}
            onChange={this.setField("image_url")}
            required
          />
        </InputLine>
        <InputLine label="Start date/time" required>
          <DateTimePicker
            value={start_date}
            onChange={d => {
              this.setState({ start_date: d });
            }}
          />
        </InputLine>
        <InputLine label="End date/time" required>
          <DateTimePicker
            value={end_date}
            onChange={d => this.setState({ end_date: d })}
          />
        </InputLine>

        <InputLine label="FB event url">
          <TextInput
            value={facebook_event_url || ""}
            onChange={this.setField("facebook_event_url")}
          />
        </InputLine>
        <InputLine label="Ticket service url">
          <TextInput
            value={ticket_service_url || ""}
            onChange={this.setField("ticket_service_url")}
          />
        </InputLine>

        <ColoredButton>{mode === "edit" ? "Save" : "Create"}</ColoredButton>
        {errors && (
          <Error>
            {errors.map(e => (
              <div key={e}>{e}</div>
            ))}
          </Error>
        )}
        {showPlaceCreationDialog && (
          <PlaceCreationDialog
            onClose={() => this.setState({ showPlaceCreationDialog: false })}
            onSubmit={this.createPlace}
            isOpen
          />
        )}
      </Form>
    );
  }
}

export default EventForm;
