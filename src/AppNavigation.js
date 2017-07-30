import { StackNavigator } from "react-navigation";

import HomeScreen from "./screens/HomeScreen";
import ResultScreen from "./screens/ResultScreen";

const AppNavigation = StackNavigator({
  Home: { screen: HomeScreen },
  Result: { screen: ResultScreen },
});

export default AppNavigation;
