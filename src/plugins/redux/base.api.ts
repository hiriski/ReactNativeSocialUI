// redux toolkit
import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react';

// config
import { appConfig } from '@/modules/app/configs';

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: appConfig.apiBaseUrl,
    prepareHeaders(headers) {
      headers.set('Content-Type', 'application/json');
      headers.set('Accept', 'application/json');
      return headers;
    },
  }),
  endpoints: () => ({}),
});
