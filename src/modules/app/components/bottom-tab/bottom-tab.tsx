import { FC, useEffect, useRef } from 'react';
import { View, TouchableOpacity, Animated, StyleSheet, Text } from 'react-native';

// hooks
import { useApp } from '@/modules/app/hooks';
import { useTheme } from '@/modules/theme/hooks';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// interfaces
import { NavigatorParamList } from '@/navigators/navigation.type';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';

// config
import { uiConfig } from '@/modules/app/configs';
import { DEFAULT_FONT_FAMILY, themeConfig, theme_paletteBase } from '@/modules/theme/configs';

// utils
import { screenUtils } from '@/modules/app/utilities';

// fast image
// import FastImage from 'react-native-fast-image';

import HomeIcon from '@/assets/svg/home-smile-angle-bold-duotone.svg';
import LayersIcon from '@/assets/svg/layers-bold-duotone.svg';
import GearIcon from '@/assets/svg/settings-minimalistic-bold-duotone.svg';

type TabItem = {
  // path: keyof BottomTabNavigatorParamList;
  path: string;
  label: string;
  icon: any;
  focusIcon: any;
};

const ICON_SIZE = 26;

const TAB_ITEMS: Array<TabItem> = [
  {
    path: 'dashboard_screen',
    label: 'Home',
    icon: <HomeIcon color={theme_paletteBase.primary.main} height={ICON_SIZE} width={ICON_SIZE} />,
    focusIcon: <HomeIcon color='#ffffff' height={ICON_SIZE} width={ICON_SIZE} />,
  },
  {
    path: '',
    label: 'Screens',
    icon: <LayersIcon color={theme_paletteBase.primary.main} height={ICON_SIZE} width={ICON_SIZE} />,
    focusIcon: <LayersIcon color='#ffffff' height={ICON_SIZE} width={ICON_SIZE} />,
  },
  {
    path: 'settings_screen',
    label: 'Settings',
    icon: <GearIcon color={theme_paletteBase.primary.main} height={ICON_SIZE} width={ICON_SIZE} />,
    focusIcon: <GearIcon color='#ffffff' height={ICON_SIZE} width={ICON_SIZE} />,
  },
];
const TAB_WIDTH = screenUtils.width;
const TAB_HEIGH = uiConfig.bottomTabHeight;

interface Props extends BottomTabBarProps {}

const BottomTab: FC<Props> = (props) => {
  const { state, navigation } = props;

  const theme = useTheme();

  const insets = useSafeAreaInsets();

  const { bottomTabVisible } = useApp();

  const animatedBottomTabRef = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (bottomTabVisible) {
      Animated.timing(animatedBottomTabRef, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(animatedBottomTabRef, {
        toValue: TAB_HEIGH + 62,
        duration: 250,
        useNativeDriver: true,
      }).start();
    }
  }, [bottomTabVisible]);

  const onPress = (routeName: keyof NavigatorParamList) => {
    // navigation.navigate(routeName);
  };

  return (
    <Animated.View
      style={{
        left: 0,
        right: 0,
        position: 'absolute',
        bottom: 0,
        width: TAB_WIDTH,
        backgroundColor: theme.palette.background.paper,
        borderTopColor: theme.palette.divider,
        borderTopWidth: 1,
        paddingBottom: insets.bottom,
        transform: [
          {
            translateY: animatedBottomTabRef,
          },
          {
            translateX: screenUtils.width / 2 - TAB_WIDTH / 2,
          },
        ],
      }}>
      <View style={StyleSheet.flatten([styles.tab_root, { width: TAB_WIDTH }])}>
        <View style={StyleSheet.flatten([styles.tab_container])}>
          {TAB_ITEMS.map((x, index) => (
            <TouchableOpacity
              key={x.path}
              activeOpacity={0.85}
              onPress={() => onPress(x.path)}
              disabled={state.index === index}
              style={StyleSheet.flatten([styles.tabItem, { ...(state.index === index && styles.tabItemFocused) }])}>
              <View style={StyleSheet.flatten([styles.tabItemInner])}>
                {state.index === index ? x.focusIcon : x.icon}
                <View style={StyleSheet.flatten([{}])}>
                  <Text
                    style={StyleSheet.flatten([
                      styles.tabItemLabel,
                      {
                        ...(state.index === index
                          ? {
                              color: '#ffffff',
                            }
                          : {
                              color: theme.palette.text.secondary,
                            }),
                      },
                    ])}>
                    {x.label}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  tab_root: {
    flexDirection: 'row',
    width: 'auto',
    alignItems: 'center',
  },
  tab_container: {
    flex: 1,
    elevation: 8,
    shadowColor: 'rgba(0,0,0,0.65)',
    shadowOpacity: 0.2,
    alignItems: 'center',
    justifyContent: 'center',
    height: TAB_HEIGH,
    flexDirection: 'row',
  },
  tabItem: {
    height: TAB_HEIGH - 14,
    width: TAB_WIDTH / 3 - 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: themeConfig.shape.borderRadius * 2,
  },
  tabItemFocused: {
    backgroundColor: themeConfig.paletteBase.primary.main,
  },
  tabItemInner: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabItemLabel: {
    fontFamily: DEFAULT_FONT_FAMILY,
    color: '#ffffff',
    fontSize: 10,
    fontWeight: '600',
  },
});

export default BottomTab;
