import { View, Text, Button, Image, StyleSheet } from 'react-native';

// hooks
import { useApp } from '@/modules/app/hooks';

// interfaces
import { useAppDispatch } from '@/plugins/redux';
import { Screen, Typography } from '@/components/core';
import { Assets } from '@/assets';
import { appConfig } from '../../configs';
import { createSpacing } from '@/modules/theme/utilities';
import { useTheme } from '@/modules/theme/hooks';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const OnboardingScreen = (): JSX.Element => {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const dispatch = useAppDispatch();
  const { app_togglePaletteMode } = useApp();

  const onToggleTheme = () => {
    dispatch(app_togglePaletteMode());
  };

  const renderHeader = () => (
    <View
      style={StyleSheet.flatten([
        {
          paddingTop: insets.top,
          backgroundColor: theme.palette.background.paper,
        },
        styles.header,
      ])}>
      <Image
        source={Assets.logoDark_xs}
        style={{ height: 22, width: 18, resizeMode: 'contain', marginRight: createSpacing(2) }}
      />
      <Typography fontWeight='bold' style={{ fontSize: 16 }} color='primary.main'>
        {appConfig.appName}
      </Typography>
    </View>
  );

  return (
    <Screen preset='fixed' renderHeader={renderHeader()}>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button title='Toggle Theme' onPress={onToggleTheme} />
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 8,
    shadowColor: 'rgba(0,0,0,0.35)',
    shadowOpacity: 0.1,
    height: 80,
    paddingHorizontal: createSpacing(5),
  },
});

export default OnboardingScreen;
