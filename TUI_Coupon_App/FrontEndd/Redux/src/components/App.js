import React from 'react';
import store from './store/store';
import { Provider } from 'react-redux';
import CouponApp from './CouponApp';

function App() {
  return (
    <div>
    <Provider store={store}>
    <CouponApp/>
    </Provider>
    </div>
  )
}

export default App