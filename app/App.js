import { createStackNavigator, createAppContainer } from "react-navigation";

import Events from "./screens/events";
import Auth from "./screens/auth";
import Splash from "./screens/splash";
import Event from "./screens/events/Event";
import Settings from "./screens/settings";

const AppNavigator = createStackNavigator(
  {
    Splash: { screen: Splash },
    Signup: { screen: Auth },
    Home: { screen: Events },
    Event: { screen: Event },
    Settings: { screen: Settings }
  },
  {
    initialRouteName: "Splash",
    headerMode: "float",
    cardStyle: {
      backgroundColor: "transparent",
      elevation: 0,
      shadowColor: "#5bc4ff",
      shadowOpacity: 0,
      shadowOffset: {
        height: 0
      },
      shadowRadius: 0
    }
  }
);

export default createAppContainer(AppNavigator);
