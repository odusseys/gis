import React from "react";
import styled from "styled-components";
import { FlatList } from "react-native";
import EventItem from "./EventItem";
import { Title } from "kiki/library/text";
import { getItems } from "./util";
import colors from "kiki/styles/colors";

const TitleContainer = styled.View`
  padding-vertical: 10px;
  width: 100%;
  align-self: stretch;
  align-items: center;
`;

const NoEvents = styled.View`
  flex: 1;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

class EventList extends React.Component {
  renderItem = ({ item }) => {
    const { onInterestToggle, onEventPress } = this.props;
    if (item.type === "GROUP") {
      return (
        <TitleContainer>
          <Title
            color="white"
            text={item.name}
            style={{ fontWeight: "bold" }}
          />
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
    if (!items.length) {
      return (
        <NoEvents>
          <Title color="white" name="NO_EVENTS" />
        </NoEvents>
      );
    }
    return (
      <FlatList
        style={{
          backgroundColor: colors.coal,
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
