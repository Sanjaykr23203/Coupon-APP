import { configureStore } from "@reduxjs/toolkit";
import CouponSlice from "./CouponSlice";

const store = configureStore({
    reducer:{
        coupon : CouponSlice,
    }
})

export default store;