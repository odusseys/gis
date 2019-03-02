import React from "react";
import styled from "styled-components";
import { FlatList } from "react-native";
import EventItem from "./EventItem";
import moment from "moment";
import frLocale from "moment/locale/fr";
import { Title } from "gis/library/text";

const TitleContainer = styled.View`
  padding: 10px 20px;
`;

const formatDate = m => {
  m.locale("fr", frLocale);
  return m.format("dddd D MMMM");
};

const getEventGroups = events => {
  const todayMoment = moment();
  const today = formatDate(todayMoment);
  const tomorrow = formatDate(moment().add(1, "days"));
  let currentGroupName = today;
  let currentGroupEvents = [];
  const result = [];
  for (let e of events) {
    let date = moment(e.start_date);
    if (moment(date).isBefore(todayMoment)) {
      date = todayMoment;
    }
    const group = formatDate(date);
    if (group !== currentGroupName) {
      if (currentGroupEvents.length) {
        result.push({ group: currentGroupName, events: currentGroupEvents });
      }
      currentGroupName = group;
      currentGroupEvents = [];
    }
    currentGroupEvents.push(e);
  }
  if (currentGroupEvents.length) {
    result.push({ group: currentGroupName, events: currentGroupEvents });
  }
  return result.map(({ group, events }) => {
    const groupRenamed =
      group === today ? "Aujourd'hui" : group === tomorrow ? "Demain" : group;
    return { group: groupRenamed, events };
  });
};

const mapGroupsToItems = eventGroups => {
  const res = [];
  for (let { group, events } of eventGroups) {
    res.push({ type: "GROUP", name: group });
    for (let e of events) {
      res.push({ type: "EVENT", event: e });
    }
  }
  return res;
};

const getItems = events => mapGroupsToItems(getEventGroups(events));

class EventList extends React.Component {
  renderItem = ({ item }) => {
    const { onInterestToggle, onEventPress } = this.props;
    if (item.type === "GROUP") {
      return (
        <TitleContainer>
          <Title text={item.name} style={{ fontWeight: "bold" }} />
        </TitleContainer>
      );
    } else {
      const { event } = item;
      return (
        <EventItem
          onInterestToggle={() => onInterestToggle(event)}
          onPress={() => onEventPress(event)}
          {...event}
        />
      );
    }
  };

  render() {
    const items = getItems(this.props.events);
    return (
      <FlatList
        style={{
          backgroundColor: "white",
          maxWidth: "100%",
          width: "100%"
        }}
        data={items}
        keyExtractor={e =>
          e.type === "GROUP" ? `group__${e.name}` : `event__${e.event.id}`
        }
        renderItem={this.renderItem}
      />
    );
  }
}

export default EventList;
