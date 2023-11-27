import { FC } from 'react';
import { Image, StyleSheet, View, ActivityIndicator, Text } from 'react-native';

// config
import { appConfig } from '@/modules/app/configs';
import { DEFAULT_FONT_FAMILY, themeConfig, theme_paletteBase, theme_paletteLight } from '@/modules/theme/configs';

// utils
import { screenUtils } from '@/modules/app/utilities';
import { createSpacing } from '@/modules/theme/utilities';

// assets
import { Assets } from '@/assets';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface Props {
  isLoading?: boolean;
}

const Splash: FC<Props> = ({ isLoading }) => {
  const insets = useSafeAreaInsets();
  return (
    <>
      <View style={styles.root}>
        <Image source={Assets.logoDark_sm} style={styles.logo} resizeMode='contain' />
        <Text style={styles.title}>{appConfig.appName}</Text>
        <View style={styles.loadingSpace}>
          {isLoading && <ActivityIndicator color={themeConfig.paletteBase.secondary.main} size={28} />}
        </View>
      </View>
      <View style={StyleSheet.flatten([styles.footer, { marginBottom: insets.bottom + 32 }])}>
        <Text style={styles.footerText}>{appConfig.appDescription}</Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    width: screenUtils.width,
    height: screenUtils.height,
    zIndex: 1000,
  },
  logo: {
    height: 90,
    marginBottom: createSpacing(6),
  },
  title: {
    fontWeight: 'bold',
    fontFamily: DEFAULT_FONT_FAMILY,
    fontSize: 20,
  },
  footer: {
    marginTop: 'auto',
    alignItems: 'center',
    paddingHorizontal: createSpacing(10),
  },
  footerText: {
    textAlign: 'center',
    color: theme_paletteLight.text.secondary,
    fontSize: 13,
    lineHeight: 18,
  },
  loadingSpace: {
    marginTop: 12,
    height: 30,
  },
});

export default Splash;
