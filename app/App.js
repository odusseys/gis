import { createStackNavigator, createAppContainer } from "react-navigation";

import EventListing from "./screens/EventListing";
import Auth from "./screens/Auth";
import Splash from "./screens/Splash";
import Event from "./screens/Event";
import Settings from "./screens/Settings";

const AppNavigator = createStackNavigator(
  {
    Splash: { screen: Splash },
    Signup: { screen: Auth },
    Home: { screen: EventListing },
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
