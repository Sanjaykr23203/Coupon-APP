import React from 'react';
import { Provider } from 'react-redux';
import store from './Store/store';
import CouponApp from './CouponApp';

function app() {
  return (
   
<div >
<Provider store={store}>
<CouponApp/>
</Provider>
</div>

  )
}

export default app