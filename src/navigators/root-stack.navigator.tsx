import { useEffect, useRef, useState } from 'react';

// react navigation
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// interfaces
import { NavigatorParamList, ScreenType } from './navigation.type';
import { AppState, AppStateStatus } from 'react-native';

// hooks
import { useApp } from '@/modules/app/hooks';

// helpers / utils
import { storageUtils } from '@/modules/app/utilities';
import { log } from '@/modules/common/helpers';

// screens & navigators
import BottomTabStackNavigator from './bottom-tab-stack.navigator';
import { SplashScreen } from '@/modules/app/screens';
import { Splash } from '@/modules/app/components/splash';

// api
import { useAppDispatch } from '@/plugins/redux';

const SCREENS: Array<ScreenType> = [
  { name: 'splash_screen', component: SplashScreen },
  { name: 'bottom_tab_stack', component: BottomTabStackNavigator },
];

const RootStack = createNativeStackNavigator<NavigatorParamList>();

const RootStackNavigator = (): JSX.Element | null => {
  const appState = useRef<AppStateStatus>(AppState.currentState);

  const dispatch = useAppDispatch();

  const [isAppLoaded, setIsAppLoaded] = useState(false);
  const { alreadyLaunched, app_setAlreadyLaunched, app_checkMockServerStatus } = useApp();

  /**
   * check already launched
   */
  const checkIsAlreadyLaunched = async (): Promise<void> => {
    const value = await storageUtils.get('IS_ALREADY_LAUNCHED');
    dispatch(app_setAlreadyLaunched(Boolean(value) ?? false));
  };

  /**
   * check server status
   */
  const checkMockServerStatus = async (): Promise<void> => {
    if (__DEV__) {
      return Promise.resolve();
    }
    try {
      const response = await app_checkMockServerStatus(undefined);
      console.log('RESPONSE', response);
    } catch (e) {
      log.info(JSON.stringify(e));
    }
  };

  const initApp = async (): Promise<void> => {
    await checkMockServerStatus();
    await checkIsAlreadyLaunched();
  };

  useEffect(() => {
    (async () => {
      initApp()
        .then()
        .catch((reason) => {
          log.info(`initApp error  -> ${JSON.stringify(reason)}`);
        })
        .finally(() => {
          setIsAppLoaded(true);
        });
    })();
  }, []);

  if (!isAppLoaded) {
    return <Splash isLoading={true} />;
  }

  return (
    <RootStack.Navigator initialRouteName='bottom_tab_stack' screenOptions={{ headerShown: false }}>
      {SCREENS.map((x) => (
        <RootStack.Screen key={x.name} component={x.component} name={x.name} options={x.options} />
      ))}
    </RootStack.Navigator>
  );
};

export default RootStackNavigator;
