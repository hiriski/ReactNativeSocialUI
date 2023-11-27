import { themeConfig } from '@/modules/theme/configs';
import { useTheme } from '@/modules/theme/hooks';
import { FC, useEffect, useRef } from 'react';
import { Animated, Easing, StyleProp, StyleSheet, ViewStyle } from 'react-native';

const sharedAnimationConfig = {
  duration: 750,
  useNativeDriver: true,
};

interface Props {
  width: string | number;
  height: string | number;
  style?: StyleProp<ViewStyle>;
}

const Skeleton: FC<Props> = ({ width, height, style }) => {
  const theme = useTheme();
  const pulseAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          ...sharedAnimationConfig,
          toValue: 1,
          easing: Easing.out(Easing.ease),
        }),
        Animated.timing(pulseAnim, {
          ...sharedAnimationConfig,
          toValue: 0,
          easing: Easing.in(Easing.ease),
        }),
      ]),
    ).start();

    return () => {
      // cleanup
      pulseAnim.stopAnimation();
    };
  }, []);

  const opacityAnim = pulseAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.05, 0.15],
  });

  return (
    <Animated.View
      style={
        StyleSheet.flatten([
          styles.root,
          { width, height, opacity: opacityAnim, backgroundColor: theme.palette.text.primary },
          style,
        ]) as StyleProp<ViewStyle> | undefined
      }
    />
  );
};

const styles = StyleSheet.create({
  root: {
    borderRadius: themeConfig.shape.borderRadius,
  },
});

export default Skeleton;
