import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCouponCode, fetchCoupon, removeCoupon } from './store/couponSlice';
import './index.css';

function CouponApp() {
  const dispatch = useDispatch();
  const couponCode = useSelector((state) => state.coupon.couponCode);
  const couponOffers = useSelector((state) => state.coupon.couponOffers);
  const error = useSelector((state) => state.coupon.error);
  

  const handleFetchCoupon = () => {
    if (couponCode.trim() === '') {
      return;
    }
    dispatch(fetchCoupon(couponCode));
  };


  const handleRemoveCoupon = (index) => {
    dispatch(removeCoupon(index));
  };

  return (
    <div>
          <div className="coupon-div">
            <h1>Discount Code</h1>
            <div className={`search-coupon ${error ? 'error' : ' '}`}>
              <input type="text" placeholder="Enter a promo Code" value={couponCode} onChange={(e) => dispatch(setCouponCode(e.target.value))}/>
              <button className="search-button" onClick={handleFetchCoupon}>Apply</button>
          </div>
          {error && <p className="error-msg">{error}</p>}
    
          <div className='data'>
            {couponOffers.map((offervalue, index) => (
              <div key={index}>
                  <table>
                    <tr>
                      <div className="details-data">
                        <td> ✔ <span className='span'> {offervalue.code}</span></td>
                        <td>
                          <a className="remove-button" onClick={() => handleRemoveCoupon(index)}> <b>REMOVE</b> </a>
                        </td>
                      </div>
                    </tr>
                  </table>
              </div>
            ))}
            </div>
          </div>
      </div>
  );
}

export default CouponApp;
