// couponSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  couponCode: '',
  couponOffers: [],
  error: '',
};

// Async thunk for fetching coupon
export const fetchCoupon = createAsyncThunk('coupon/fetchCoupon', async (couponCode, { rejectWithValue, getState }) => {
  const state = getState();
  const existingCoupon = state.coupon.couponOffers.find((offer) => offer.code === couponCode);

  if (existingCoupon) {
    return rejectWithValue('× Coupon code is already in the basket');
  }

  try {
    const response = await axios.get(`http://localhost:1111/data/${couponCode}`);
    const responseData = response.data.data;
    const { coupon_offer: offer } = responseData;
    return { code: couponCode, offer };
  } catch (error) {
    return rejectWithValue('× Enter a valid Coupon Code');
  }
});
const couponSlice = createSlice({
  name: 'coupon',
  initialState,
  reducers: {
    setCouponCode: (state, action) => {
      state.couponCode = action.payload;
    },
    removeCoupon: (state, action) => {
      const index = action.payload;
      state.couponOffers.splice(index, 1);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCoupon.fulfilled, (state, action) => {
        state.couponOffers.push(action.payload);
        state.error = '';
        state.couponCode = '';
      })
      .addCase(fetchCoupon.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { setCouponCode, removeCoupon} = couponSlice.actions;
export default couponSlice.reducer;