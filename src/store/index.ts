import { configureStore } from '@reduxjs/toolkit';
import rates from './slices/rates';

export const store = configureStore({
  reducer: {
    rates,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
