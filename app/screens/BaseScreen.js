import React from "react";
import { StatusBar, Platform, SafeAreaView } from "react-native";
import { PersistGate } from "redux-persist/es/integration/react";
import { Provider, connect } from "react-redux";
import styled from "styled-components";
import { MaterialIcons } from "@expo/vector-icons";

import store, { persistor } from "store";
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

const Container = styled.View`
  flex: 1;
  background-color: ${colors.white};
  /* padding-top: ${Platform.OS === "ios" ? 0 : StatusBar.currentHeight}px; */
`;

const BaseScreenMaker = (Component, options = {}) => {
  const res = class BaseScreen extends React.Component {
    static navigationOptions = ({ navigation }) => ({
      headerTitle: (
        <Provider store={store}>
          <Header navigation={navigation} title={options.title} />
        </Provider>
      )
    });
    goToSettings = () => {
      console.warn("todo: goToSettings");
    };
    render() {
      return (
        <Provider store={store}>
          <PersistGate persistor={persistor}>
            <SafeAreaView style={{ flex: 1 }}>
              <Container>
                <StatusBar
                  backgroundColor={colors.white}
                  barStyle="dark-content"
                />
                <Component {...this.props} />
              </Container>
            </SafeAreaView>
          </PersistGate>
        </Provider>
      );
    }
  };
  res.displayName = Component.displayName;
  return res;
};

export default BaseScreenMaker;
