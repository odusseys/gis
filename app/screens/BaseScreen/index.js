import React from "react";
import { StatusBar, SafeAreaView } from "react-native";
import { PersistGate } from "redux-persist/es/integration/react";
import { Provider } from "react-redux";
import styled from "styled-components";

import store, { persistor } from "store";
import colors from "kiki/styles/colors";
import Rainbow from "./Rainbow";
import Header from "./Header";

const Container = styled.View`
  flex: 1;
  background-color: ${colors.coal};
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
                <Rainbow />
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
