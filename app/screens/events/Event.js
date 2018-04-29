import React from 'react';
import { View, Text } from 'react-native';

const Event = ({ name, place_name, description, start_date, end_date }) => {
  console.warn(name);
  return (
    <View>
      <Text>{name}</Text>
      <Text>{place_name}</Text>
      <Text>{description}</Text>
      <Text>{start_date}</Text>
      <Text>{end_date}</Text>
    </View>
  );
};
export default Event;
