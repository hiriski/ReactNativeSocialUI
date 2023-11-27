import { FC, useCallback } from 'react';

import { View } from 'react-native';

import { useFocusEffect } from '@react-navigation/native';

// components
import { Splash } from '@/modules/app/components';

// utils
import { screenUtils, uiUtils } from '@/modules/app/utilities';

// hooks
import { useTheme } from '@/modules/theme/hooks';

const SplashScreen: FC = () => {
  const theme = useTheme();
  useFocusEffect(
    useCallback(() => {
      uiUtils.changeNavbarBarColor(theme.palette.background.paper, true, false);
    }, [theme.palette.mode]),
  );
  return (
    <View
      style={{
        height: screenUtils.height,
        flex: 1,
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.palette.background.paper,
      }}>
      <Splash />
    </View>
  );
};

export default SplashScreen;
