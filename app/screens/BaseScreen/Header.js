import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { MaterialIcons } from "@expo/vector-icons";

import colors from "kiki/styles/colors";
import { Title } from "kiki/library/text";

const HeaderContainer = styled.View`
  align-self: stretch;
  align-items: center;
  max-height: 50px;
  height: 50px;
  padding-horizontal: 12px;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`;

const HeaderDumb = ({ navigation, title, connected }) => {
  return (
    <HeaderContainer>
      <Title
        text="🎉"
        style={{ fontSize: 30, marginBottom: 6, marginRight: 15 }}
      />
      <Title
        text={title || "Kiki"}
        style={{ fontSize: 30, fontWeight: "bold", flex: 1 }}
      />
      {connected && (
        <MaterialIcons
          name="settings"
          color={colors.grey}
          size={24}
          style={{}}
          onPress={() => navigation.navigate("Settings")}
        />
      )}
    </HeaderContainer>
  );
};

const Header = connect(state => ({ connected: !!state.auth.token }))(
  HeaderDumb
);

export default Header;
