import React from "react";
import styled from "styled-components";
import { Linking, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Body } from "kiki/library/text";
import IconRow from "./IconRow";

const PlaceContainer = styled.TouchableOpacity`
  flex: 1;
`;

const goToPlace = address => {
  const url = Platform.select({
    ios: "maps:0,0?q=" + address,
    android: "geo:0,0?q=" + address
  });
  Linking.openURL(url);
};

const Place = ({ address, name }) => {
  return (
    <IconRow icon={p => <Ionicons name="ios-pin" {...p} />}>
      <PlaceContainer onPress={() => address && goToPlace(address)}>
        <Body text={name} />
        {address && <Body text={address} />}
      </PlaceContainer>
    </IconRow>
  );
};

export default Place;
