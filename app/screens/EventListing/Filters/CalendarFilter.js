import React, { Component } from "react";
import styled from "styled-components";
import { Calendar } from "react-native-calendars";
import moment from "moment";
import { FontAwesome } from "@expo/vector-icons";
import colors from "kiki/styles/colors";
import { Subtitle } from "kiki/library/text";
import { LocaleConfig } from "react-native-calendars";

LocaleConfig.locales["fr"] = {
  monthNames: [
    "Janvier",
    "Février",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Août",
    "Septembre",
    "Octobre",
    "Novembre",
    "Décembre"
  ],
  monthNamesShort: [
    "Janv.",
    "Févr.",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juil.",
    "Août",
    "Sept.",
    "Oct.",
    "Nov.",
    "Déc."
  ],
  dayNames: [
    "Dimanche",
    "Lundi",
    "Mardi",
    "Mercredi",
    "Jeudi",
    "Vendredi",
    "Samedi"
  ],
  dayNamesShort: ["Dim.", "Lun.", "Mar.", "Mer.", "Jeu.", "Ven.", "Sam."]
};

LocaleConfig.defaultLocale = "fr";
const CalendarContainer = styled.View`
  background-color: white;
  padding: 15px;
`;

const ClearContainer = styled.TouchableOpacity`
  width: 100%;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding-bottom: 15px;
  border-bottom-width: 1px;
  border-bottom-color: ${colors.lightGrey};
`;

const Clear = ({ onPress }) => {
  return (
    <ClearContainer onPress={onPress}>
      <FontAwesome
        name="trash"
        color={colors.red}
        size={24}
        style={{ marginRight: 12 }}
      />
      <Subtitle name="CLEAR_DATE_FILTER" colors={colors.black} />
    </ClearContainer>
  );
};

class CalendarFilter extends Component {
  onChange = dateString => {
    const { value, onChange } = this.props;
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
    const today = minDate;
    const maxDate = moment()
      .add(60, "days")
      .format("YYYY-MM-DD");
    return (
      <CalendarContainer zIndex={3}>
        {active && <Clear onPress={() => this.onChange(undefined)} />}
        <Calendar
          minDate={minDate}
          maxDate={maxDate}
          onDayPress={({ dateString }) => this.onChange(dateString)}
          markedDates={this.getMarkedDates()}
          firstDay={1}
          theme={{
            selectedDayTextColor: colors.white,
            selectedDayBackgroundColor: colors.coal,
            todayTextColor: colors.coal,
            dotColor: colors.coal,
            selectedDotColor: colors.coal,
            arrowColor: colors.coal
          }}
        />
      </CalendarContainer>
    );
  }
}

export default CalendarFilter;
