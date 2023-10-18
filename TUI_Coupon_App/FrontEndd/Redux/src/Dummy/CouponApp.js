import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {setCouponCode, removeCouponCode, fetchCoupon} from './Store/CouponSlice'

function CouponApp() {

    const dispatch = useDispatch();
    const couponCode = useSelector((state)=> state.coupon.couponCode);
    const couponOffers = useSelector((state)=> state.coupon.couponOffers);
    const error = useSelector((state)=> state.coupon.error);

    function handleFetchCoupon(){
        if(couponCode.trim()===''){
            return;
        }

        dispatch(fetchCoupon(couponCode));
    }

    function removeCoupon(index){
        dispatch(removeCouponCode(index));
    }

  return (
    <div>
    <div className='coupon-div'>
    <h2>Promo Code</h2>
    <div className={`search-coupon ${eror ? 'eror' :" "}`}>
    <input value={couponCode} type='text' placeholder='Promo code : AXX...' onChange={(e)=>dispatch(setCouponCode(e.target.value))}></input>  
    </div>
    <button className='search-button' onClick={handleFetchCoupon}>Apply</button>
    </div>
    <div className='error-container'>{error && <p className='error-msg'>{eror}</p>}</div>


    {couponOffers.map((offerValue, index)=>{
        <div key={index}>
        <h2>{offerValue.couponCode}</h2>
        <button onClick={removeCoupon(index)}>remove</button>
        </div>
    })}
    </div>
  )
}

export default CouponApp