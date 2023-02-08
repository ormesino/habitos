import { createNativeStackNavigator } from "@react-navigation/native-stack";

const { Navigator, Screen } = createNativeStackNavigator();

import { DayDetail } from '../screens/DayDetail';
import { NewHabit } from '../screens/NewHabit';
import { Home } from '../screens/Home';

export function AppRoutes() {
  return (
    <Navigator
      initialRouteName="home"
      screenOptions={{ headerShown: false }}
    >
      <Screen
        name="day"
        component={DayDetail}
      />
      <Screen
        name="new"
        component={NewHabit}
      />
      <Screen
        name="home"
        component={Home}
      />
    </Navigator>
  )
}