import React, { Component } from "react";
import styled from "styled-components";
import Filter from "./Filter";
import CalendarFilter from "./CalendarFilter";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import colors from "styles/colors";

const Container = styled.View`
  shadow-color: black;
  shadow-opacity: 0.2;
  shadow-offset: 0px -1px;
  elevation: 2;
`;

const FilterRow = styled.View`
  width: 100%;
  padding: 10px;
  flex-direction: row;
  justify-content: space-around;
  background-color: white;
  border-bottom-width: 1px;
  border-bottom-color: ${colors.lightGrey};
`;

const InterestedFilter = ({ active, onPress }) => {
  return (
    <Filter
      name="INTERESTED_FILTER"
      onPress={onPress}
      active={active}
      icon={p => <MaterialIcons name="star" {...p} />}
    />
  );
};

class Filters extends Component {
  state = {
    showCalendar: false
  };
  render() {
    const { value, onChange, dateOptions } = this.props;
    const { interested, date } = value;
    const { showCalendar } = this.state;
    return (
      <Container>
        <FilterRow>
          <InterestedFilter
            active={interested}
            onPress={() => onChange({ ...value, interested: !interested })}
          />
          <Filter
            name="CALENDAR_FILTER"
            onPress={() => this.setState({ showCalendar: !showCalendar })}
            active={date}
            icon={p => <AntDesign name={"calendar"} {...p} />}
          />
        </FilterRow>

        {showCalendar && (
          <CalendarFilter
            value={date}
            onChange={date => {
              this.setState({ showCalendar: false }, () =>
                onChange({ ...value, date })
              );
            }}
            options={dateOptions}
          />
        )}
      </Container>
    );
  }
}

export default Filters;
