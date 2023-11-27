import { combineReducers } from '@reduxjs/toolkit';

// slices & rtk
import { baseApi } from '@/plugins/redux/base.api';
import { appApi, appSlice } from '@/modules/app/redux';

const rootReducer = combineReducers({
  [baseApi.reducerPath]: baseApi.reducer,
  [appSlice.name]: appSlice.reducer,
  [appApi.reducerPath]: appApi.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
