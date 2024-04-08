
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.js'
import './index.css';
import { Provider } from 'react-redux';
import { ClerkProvider } from '@clerk/clerk-react'
import { BrowserRouter } from 'react-router-dom'
import Header from './Component/Header.js'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import store from './Redux/store.js';





// Import your publishable key
const PUBLISHABLE_KEY = 'pk_test_Z3JlYXQtaHVtcGJhY2stMjEuY2xlcmsuYWNjb3VudHMuZGV2JA';
const  STRIPE_KEY='pk_live_51OmwRWELuSDTtcU4W2fIwnkdyWuJIDvljvdNFBGJ5TmiSwSZEGU2GNjnMbKy8XWdKMjaCu9OW2DYpf78hbf2m1ax00lq0VRa43'
const GOOGLEMAP_KEY = 'AIzaSyBNVjEXhyDOUvcCECJFY5x_OGKt38dxVBk';
console.log("PUBLISHABLE_KEY:", PUBLISHABLE_KEY);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
          <Header />
          <App />
        </ClerkProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
