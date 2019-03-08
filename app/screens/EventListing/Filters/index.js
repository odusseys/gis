import React, { Component } from "react";
import styled from "styled-components";
import Filter from "./Filter";
import CalendarFilter from "./CalendarFilter";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import colors from "kiki/styles/colors";
import Collapsible from "react-native-collapsible";

const Container = styled.View`
  shadow-color: black;
  shadow-opacity: 0.2;
  shadow-offset: 0px -1px;
  elevation: 2;
  max-width: 100%;
  border-top-color: ${colors.lightGrey};
  border-top-width: 1px;
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

const Close = styled.TouchableOpacity`
  /* position: absolute;
  right: 0;
  top: 0;
  bottom: 0; */
  height: 50px;
  width: 50px;
  align-items: center;
  justify-content: center;
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
          {showCalendar && (
            <Close onPress={() => this.setState({ showCalendar: false })}>
              <AntDesign name="close" size={20} color="gray" />
            </Close>
          )}
        </FilterRow>
        <Collapsible collapsed={!showCalendar}>
          <CalendarFilter
            value={date}
            onChange={date => {
              this.setState({ showCalendar: false }, () =>
                onChange({ ...value, date })
              );
            }}
            options={dateOptions}
          />
        </Collapsible>
      </Container>
    );
  }
}

export default Filters;
