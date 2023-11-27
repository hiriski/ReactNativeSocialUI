import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// components
import { BottomTab } from '@/modules/app/components/bottom-tab';

// screens
import { DashboardScreen } from '@/modules/app/screens';

// interfaces
import { ScreenType } from './navigation.type';

// screens list
export const BOTTOM_TAB_SCREENS: ScreenType[] = [
  {
    name: 'dashboard_screen',
    label: 'Dashboard',
    component: DashboardScreen,
  },
];

const BottomTabStack = createBottomTabNavigator();

const BottomTabStackNavigator = (): JSX.Element | null => {
  return (
    <BottomTabStack.Navigator screenOptions={{ headerShown: false }} tabBar={(props) => <BottomTab {...props} />}>
      {BOTTOM_TAB_SCREENS.map((x) => {
        return <BottomTabStack.Screen key={x.name} component={x.component} name={x.name} />;
      })}
    </BottomTabStack.Navigator>
  );
};

export default BottomTabStackNavigator;
