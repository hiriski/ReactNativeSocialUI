// redux tookit
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { configureStore, createListenerMiddleware } from '@reduxjs/toolkit';

// redux persist
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  PersistConfig,
} from 'redux-persist';

// root reducer
import rootReducer, { RootState } from './root-reducer';

// redux flipper
import reduxFlipper from 'redux-flipper';

// storage
import { persistStorage } from './persist-storage';

// reducers
import { baseApi } from '@/plugins/redux/base.api';
import { appApi } from '@/modules/app/redux';

// persist config
const persistConfig: PersistConfig<RootState> = {
  key: '@PERSIST:ROOT',
  storage: persistStorage,
  whitelist: [],
};

// make persisted store
const persistedReducer = persistReducer(persistConfig, rootReducer);

// listener middleware
export const listenerMiddleware = createListenerMiddleware();

// root store
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => {
    const middlewares = getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
      .prepend(listenerMiddleware.middleware)
      .concat([baseApi.middleware, appApi.middleware]);

    // flipper debugger (for development purpose only)
    if (__DEV__) {
      middlewares.push(reduxFlipper());
    }

    return middlewares;
  },
});

// setup listeners to make use of feature inside RTK
setupListeners(store.dispatch);

// store that persisted
const persistor = persistStore(store);

// types
export type RootDispatch = typeof store.dispatch;

export { store, persistor };
