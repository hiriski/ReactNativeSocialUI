import { useAppSelector } from '@/plugins/redux';

// app slice
import { app_selector, app_reducerActions, appApi } from '@/modules/app/redux';

const useApp = () => {
  const appState = useAppSelector(app_selector);

  const [app_checkMockServerStatus, { isLoading: app_checkMockServerStatusIsLoading }] =
    appApi.useLazyCheckServerStatusQuery();

  return {
    ...appState,
    ...app_reducerActions,
    app_checkMockServerStatus,
    app_checkMockServerStatusIsLoading,
  };
};

export { useApp };
