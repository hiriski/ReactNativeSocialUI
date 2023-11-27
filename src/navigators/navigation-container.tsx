// navigation
import { NavigationContainer as ReactNavigationContainer } from '@react-navigation/native';

import RootStackNavigator from './root-stack.navigator';

import { StatusBar } from '@/components/core';

// hooks
import { useTheme } from '@/modules/theme/hooks';

// navigation theme
import { darkTheme, lightTheme } from './navigation.theme';

// utils
import { navigationRef } from './navigation.util';
import { uiUtils } from '@/modules/app/utilities';

const NavigationContainer = () => {
  const { isDarkMode, palette } = useTheme();

  const onNavigationIsReady = (): void => {
    uiUtils.changeNavbarBarColor(palette.background.paper, false, false);
  };

  return (
    <ReactNavigationContainer
      ref={navigationRef}
      onReady={onNavigationIsReady}
      theme={isDarkMode ? darkTheme : lightTheme}>
      <StatusBar translucent backgroundColor='transparent' />
      <RootStackNavigator />
    </ReactNavigationContainer>
  );
};

export default NavigationContainer;
