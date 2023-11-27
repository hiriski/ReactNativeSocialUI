import { StyleSheet } from 'react-native';

// gesture handler root view.
import { GestureHandlerRootView } from 'react-native-gesture-handler';

// react native screens.
import { enableScreens } from 'react-native-screens';

// bottom sheet modal provider.
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';

// components.
import { SafeAreaProvider } from 'react-native-safe-area-context';

// configs
import { ReduxProvider } from './plugins/redux';

// context provider
import { ThemeContextProvider } from './modules/theme/contexts';

// navigation container
import NavigationContainer from './navigators/navigation-container';

enableScreens();

const App = () => {
  return (
    <ReduxProvider>
      <ThemeContextProvider>
        <GestureHandlerRootView style={styles.root}>
          <BottomSheetModalProvider>
            <SafeAreaProvider>
              <NavigationContainer />
            </SafeAreaProvider>
          </BottomSheetModalProvider>
        </GestureHandlerRootView>
      </ThemeContextProvider>
    </ReduxProvider>
  );
};

const styles = StyleSheet.create({
  root: { flex: 1 },
});

export default App;
