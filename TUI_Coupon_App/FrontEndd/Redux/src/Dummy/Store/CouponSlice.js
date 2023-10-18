import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';


const initialState = {
    couponCode:'',
    couponOffer:[],
    error:''
}

export const fetchCoupon = createAsyncThunk('coupon/fetchCoupon', async ( couponCode, {rejectWithValue})=>{
    try{
        const response = await axios.get(`http://localhost:1111/data/${couponCode}`);
        console.log(response);
        const responseData = response.data.data;
        const {ccoupon_offer: offer } = responseData;
        return {code : couponCode, offer};
    }catch(error){
        return rejectWithValue('Invalid code');
    }
})

const couponSlice = createSlice({
    name: 'coupon',
    initialState,
    reducers:{
        setCouponCode(state,action){
            state.couponCode=action.payload;
        },
        removeCouponCode(state,action){
            const index = action.payload;
            state.couponOffer.splice(index,1);
        }
    },
    extraReducers : (builder)=>{
        builder.addCase(fetchCoupon.fulfilled, (state,action)=>{
            state.couponOffer.push(action.payload);
            state.error = '';
            state.couponCode='';
        }),
        builder.addCase(fetchCoupon.rejected, (state,action)=>{
            state.error = action.payload;
        })
    }
})

export default couponSlice.reducer;
export const{setCouponCode, removeCouponCode} = couponSlice.actions;