// store.js
import { configureStore } from '@reduxjs/toolkit';
import couponSlice from './couponSlice';

const store = configureStore({
  reducer: {
    coupon: couponSlice,
  },
});

export default store;
