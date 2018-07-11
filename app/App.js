import React from 'react';
import {
  StyleSheet,
  View,
  StatusBar,
  Platform,
  Image,
  SafeAreaView,
} from 'react-native';
import { PersistGate } from 'redux-persist/es/integration/react';
import { Provider } from 'react-redux';
import { StackNavigator } from 'react-navigation';
import styled from 'styled-components';

import Events from './screens/events';
import Signup from './screens/auth/Signup';
import Splash from './screens/splash';
import Event from './screens/events/Event';
import store, { persistor } from './store';
import colors from './styles/colors';
import { Title } from './library/text';

const Header = styled.View`
  max-height: 50px;
  height: 50px;
  margin-vertical: 10px;
  align-self: center;
`;

const Stack = StackNavigator(
  {
    Splash: { screen: Splash },
    Signup: { screen: Signup },
    Home: { screen: Events },
    Event: { screen: Event },
  },
  {
    initialRouteName: 'Splash',
    headerMode: 'none',
    cardStyle: { backgroundColor: 'transparent' },
  },
);

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <SafeAreaView style={{ flex: 1 }}>
          <View style={styles.container}>
            <StatusBar backgroundColor={colors.white} barStyle="dark-content" />
            <Header>
              <Title text="Kiki" style={{ fontSize: 40, fontWeight: 'bold' }} />
            </Header>
            <Stack />
          </View>
        </SafeAreaView>
      </PersistGate>
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight,
  },
});
