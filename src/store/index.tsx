import { configureStore } from '@reduxjs/toolkit';
import menuReducer from './menuSlice';
import orderReducer from './orderSlice';

export const store = configureStore({
  reducer: {
    menu: menuReducer,
    orders: orderReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
