import { View, Text, Button } from 'react-native';

// hooks
import { useApp } from '@/modules/app/hooks';

// interfaces
import { useAppDispatch } from '@/plugins/redux';

const OnboardingScreen = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { app_togglePaletteMode } = useApp();

  const onToggleTheme = () => {
    dispatch(app_togglePaletteMode());
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ textAlign: 'center' }}>Dashboard Screen</Text>
      <Button title='Toggle Theme' onPress={onToggleTheme} />
    </View>
  );
};

export default OnboardingScreen;
