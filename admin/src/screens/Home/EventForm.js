import React, { Component } from "react";
import styled from "styled-components";
import InputLine from "components/InputLine";
import { TextInput } from "components/inputs";
import { DateInput } from "@blueprintjs/datetime";
import moment from "moment";

const DATE_FORMAT = "DD/MM/YYYY HH:mm:ss";

const Form = styled.form``;

const DateTimePicker = ({ value, onChange }) => {
  return (
    <DateInput
      formatDate={d => moment(d).format(DATE_FORMAT)}
      parseDate={s => moment(s, DATE_FORMAT)}
      value={value}
      timePrecision="minute"
      onChange={onChange}
    />
  );
};

class EventForm extends Component {
  state = { ...(this.props.defaultValue || {}) };
  setField = name => e => this.setState({ [name]: e.target.value });
  submit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state);
  };
  render() {
    const {
      name,
      description,
      start_date,
      end_date,
      facebook_event_url,
      image_url,
      place_id
    } = this.state;
    const { mode, places } = this.props;
    return (
      <Form>
        <InputLine label="Event name">
          <TextInput
            value={name || ""}
            onChange={this.setField("name")}
            required
          />
        </InputLine>
        <InputLine label="Description">
          <textarea
            value={description || ""}
            onChange={this.setField("description")}
          />
        </InputLine>
        <InputLine label="FB event url">
          <TextInput
            value={facebook_event_url || ""}
            onChange={this.setField("facebook_event_url")}
          />
        </InputLine>
        <InputLine label="Image url">
          <TextInput
            value={image_url || ""}
            onChange={this.setField("image_url")}
            required
          />
        </InputLine>
        <InputLine label="Start date/time">
          <DateTimePicker
            value={start_date}
            onChange={d => this.setState({ start_date: d })}
          />
        </InputLine>
        <InputLine label="End date/time">
          <DateTimePicker
            value={end_date}
            onChange={d => this.setState({ end_date: d })}
          />
        </InputLine>
      </Form>
    );
  }
}

export default EventForm;
