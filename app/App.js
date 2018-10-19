import React from 'react';
import {
  StyleSheet,
  View,
  StatusBar,
  Platform,
  SafeAreaView,
} from 'react-native';
import { PersistGate } from 'redux-persist/es/integration/react';
import { Provider } from 'react-redux';
import { StackNavigator, NavigationActions } from 'react-navigation';
import styled from 'styled-components';
import { MaterialIcons } from '@expo/vector-icons';

import Events from './screens/events';
import Auth from './screens/auth';
import Splash from './screens/splash';
import Event from './screens/events/Event';
import Settings from './screens/settings';
import store, { persistor } from './store';
import colors from './styles/colors';
import { Title } from './library/text';

const Header = styled.View`
  align-self: stretch;
  max-height: 50px;
  height: 50px;
  margin-vertical: 10px;
  align-items: center;
`;

const Stack = StackNavigator(
  {
    Splash: { screen: Splash },
    Signup: { screen: Auth },
    Home: { screen: Events },
    Event: { screen: Event },
    Settings: { screen: Settings },
  },
  {
    initialRouteName: 'Splash',
    headerMode: 'none',
    cardStyle: {
      backgroundColor: 'transparent',
      elevation: 0,
      shadowColor: '#5bc4ff',
      shadowOpacity: 0,
      shadowOffset: {
        height: 0,
      },
      shadowRadius: 0,
    },
  },
);

class App extends React.Component {
  goToSettings = () => {
    this.stack.dispatch(
      NavigationActions.navigate({
        routeName: 'Settings',
      }),
    );
  };
  render() {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
              <StatusBar
                backgroundColor={colors.white}
                barStyle="dark-content"
              />
              <Header>
                <Title
                  text="Kiki"
                  style={{ fontSize: 40, fontWeight: 'bold' }}
                />
                <MaterialIcons
                  name="settings"
                  color={colors.grey}
                  size={24}
                  style={{ position: 'absolute', right: 20, top: 10 }}
                  onPress={this.goToSettings}
                />
              </Header>
              <Stack
                ref={x => {
                  this.stack = x;
                }}
              />
            </View>
          </SafeAreaView>
        </PersistGate>
      </Provider>
    );
  }
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight,
  },
});
