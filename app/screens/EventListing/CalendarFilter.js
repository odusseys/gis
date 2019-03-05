import React, { Component } from "react";
import styled from "styled-components";
import { Calendar } from "react-native-calendars";
import moment from "moment";
import Filter from "./Filter";
import { AntDesign } from "@expo/vector-icons";
import colors from "styles/colors";
import { Subtitle } from "library/text";

const CalendarContainer = styled.View`
  position: absolute;
  bottom: 60px;
  right: 0;
  z-index: 3;
  elevation: 3;
  background-color: white;
  padding: 15px;
  shadow-color: black;
  shadow-opacity: 0.2;
  shadow-offset: 1px 1px;
`;

const ClearContainer = styled.TouchableOpacity`
  width: 100%;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 40px;
`;

const Clear = ({ onPress }) => {
  return (
    <ClearContainer onPress={onPress}>
      <AntDesign
        name="close"
        color={colors.black}
        size={24}
        style={{ marginRight: 12 }}
      />
      <Subtitle name="CLEAR_DATE_FILTER" colors={colors.black} />
    </ClearContainer>
  );
};

class CalendarFilter extends Component {
  state = {
    open: false
  };

  onChange = dateString => {
    const { value, onChange } = this.props;
    this.setState({ open: false });
    onChange(dateString === value ? undefined : dateString);
  };

  getMarkedDates = () => {
    const { value, options } = this.props;
    const marked = {};
    options.forEach(d => (marked[d] = { marked: true }));
    if (value) {
      marked[value] = { selected: true, ...(marked[value] || {}) };
    }
    return marked;
  };

  render() {
    const { value } = this.props;
    const active = !!value;
    const minDate = moment().format("YYYY-MM-DD");
    const maxDate = moment()
      .add(60, "days")
      .format("YYYY-MM-DD");
    return (
      <React.Fragment>
        <Filter
          onPress={() => this.setState({ open: !this.state.open })}
          active={active}
        >
          <AntDesign
            name={"calendar"}
            color={active ? colors.white : colors.yellow}
            size={30}
          />
        </Filter>

        {this.state.open && (
          <CalendarContainer>
            <Calendar
              minDate={minDate}
              maxDate={maxDate}
              onDayPress={({ dateString }) => this.onChange(dateString)}
              markedDates={this.getMarkedDates()}
            />
            {active && <Clear onPress={() => this.onChange(undefined)} />}
          </CalendarContainer>
        )}
      </React.Fragment>
    );
  }
}

export default CalendarFilter;
