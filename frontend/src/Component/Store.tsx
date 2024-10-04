// import { configureStore } from '@reduxjs/toolkit'
// import { articleApi } from './Article';
// // Import your reducers here
// // import someReducer from './features/someSlice'

// export const store = configureStore({
//   reducer: {
//     [articleApi.reducerPath]: articleApi.reducer
//   },
//   middleware:  (getDefaultMiddleware) => getDefaultMiddleware().concat(articleApi.middleware)
// });

// // Infer the `RootState` and `AppDispatch` types from the store itself
// export type RootState = ReturnType<typeof store.getState>
// // Inferred type: {someFeature: SomeFeatureState}
// export type AppDispatch = typeof store.dispatch


// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import { articleApi } from '../Component/Article';

export const store = configureStore({
  reducer: {
    [articleApi.reducerPath]: articleApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(articleApi.middleware),
});

