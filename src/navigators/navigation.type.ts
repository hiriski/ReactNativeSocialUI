import { ComponentType } from 'react';
import {
  NativeStackNavigationOptions,
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';

export type NavigatorParamList = {
  splash_screen: undefined;
  bottom_tab_stack: undefined;
} & BottomTabNavigatorParamList;

export type BottomTabNavigatorParamList = {
  dashboard_screen: undefined;
  sample_screen_screen: undefined;
};

export type ScreenType = {
  label?: string | null;
  name: keyof Partial<NavigatorParamList>;
  component: ComponentType<object> | (() => JSX.Element);
  options?: NativeStackNavigationOptions;
};

export type NavigationProps = NativeStackNavigationProp<Partial<NavigatorParamList>>;

export type AppStackScreenProps<T extends keyof NavigatorParamList> = NativeStackScreenProps<NavigatorParamList, T>;
