import React, { Component } from "react";
import styled from "styled-components";
import { DateInput, TimePicker } from "@blueprintjs/datetime";
import moment from "moment";
const DATE_FORMAT = "DD/MM/YYYY";

const Container = styled.div`
  display: flex;
  & > :first-child {
    margin-right: 12px;
    max-width: 100px;
  }
`;

class DateTimePicker extends Component {
  onDateChange = d => {
    const { value, onChange } = this.props;
    if (!value) {
      return onChange(d);
    }
    const m = moment(value);
    m.year(d.getFullYear())
      .month(d.getMonth())
      .date(d.getDate());
    onChange(m.toDate());
  };

  onTimeChange = d => {
    const { value, onChange } = this.props;
    const m = moment(value);
    m.hours(d.getHours()).minutes(d.getMinutes());
    onChange(m.toDate());
  };

  render() {
    const { value } = this.props;
    return (
      <Container>
        <DateInput
          formatDate={d => moment(d).format(DATE_FORMAT)}
          parseDate={s => moment(s, DATE_FORMAT)}
          value={value}
          onChange={this.onDateChange}
          style={{ marginRight: 12 }}
        />
        <TimePicker
          value={value}
          onChange={this.onTimeChange}
          disabled={!value}
        />
      </Container>
    );
  }
}

export default DateTimePicker;
