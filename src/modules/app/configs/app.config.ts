// import Config from 'react-native-config';
import { API_BASE_URL } from '@env';
import { uiConfig } from './ui.config';

export const appConfig = {
  appName: 'React Native SocialUI',
  appDescription: 'Social Media ui kit application template, build with React Native.',
  defaultVectorIcon: 'ionicons',
  apiBaseUrl: API_BASE_URL,
  defaultPaletteMode: 'light', // 'light' | 'dark'
  ...uiConfig,
};
