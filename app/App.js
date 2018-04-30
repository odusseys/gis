import React from 'react';
import { StyleSheet, View, StatusBar, Platform, Image } from 'react-native';
import { PersistGate } from 'redux-persist/es/integration/react';
import { Provider } from 'react-redux';
import styled from 'styled-components';
import Events from './screens/events';
import Event from './screens/events/Event';
import store, { persistor } from './store';
import colors from './styles/colors';
import { StackNavigator } from 'react-navigation';

const Header = styled.View`
  max-height: 50px;
  height: 50px;
  margin-vertical: 10px;
  align-self: center;
`;

const Stack = StackNavigator(
  {
    Home: { screen: Events },
    Event: { screen: Event },
  },
  {
    initialRouteName: 'Home',
    headerMode: 'none',
    cardStyle: { backgroundColor: 'transparent' },
  },
);

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <View style={styles.container}>
          <Header>
            <Image
              source={require('./assets/images/unicorn.png')}
              style={{
                maxHeight: '100%',
                height: '100%',
                resizeMode: 'contain',
              }}
            />
          </Header>
          <StatusBar backgroundColor={colors.night} barStyle="dark-content" />
          <Stack />
        </View>
      </PersistGate>
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.night,
    paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight,
  },
});
