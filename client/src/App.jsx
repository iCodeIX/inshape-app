
import Footer from './Components/Site/Footer.jsx';
import Header from './Components/Site/Header.jsx';
import Main from './MainMenu.jsx';
import Profile from './Components/Users/Profile.jsx';
import Register from './Components/Users/Register.jsx';
import Login from './Components/Users/Login.jsx';
import { useLocation } from 'react-router-dom';
// import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Cart from './Components/Products/Cart.jsx';
import NewProducts from './Components/Products/NewProducts.jsx';
import TopProducts from './Components/Products/TopProducts.jsx';
import AllProducts from './Components/Products/AllProducts.jsx';
import ForgotPass from '././Components/Users/ForgotPass.jsx';
import ManageProducts from './Components/Products/ManageProducts.jsx';
import ViewOrders from './Components/Users/ViewOrders.jsx';
import SetUpPaymentMethods from './Components/Users/SetUpPaymentMethods.jsx';
import SetUpShippingAddress from './Components/Users/SetUpShippingAddress.jsx';
import PrivacyPolicy from './Components/Site/PrivacyPolicy.jsx';
import TermsOfService from './Components/Site/TermsOfService.jsx';
import AdminPanel from './Components/Admin/AdminPanel.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import OrdersSummary from './Components/Users/OrdersSummary.jsx';
import ProductDetails from './Components/Products/ProductDetails.jsx';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCart } from './features/cart/cartSlice'; // adjust path as needed

function App() {
  const location = useLocation();
  const hiddenRoutes = [
    '/register', '/login', '/forgotPass', '/profile', '/cart',
    '/all-products', '/new-products', '/top-products', '/manage-products',
    '/orders-summary', '/view-orders', '/setup-payment-methods',
    '/setup-shipping-address', '/privacy-policy', '/terms-of-service',
    '/admin-panel', '/product/:id' // include dynamic path
  ];

  const hideLayoutComponents = hiddenRoutes.some(route => {
    if (route.includes(':')) {
      // Convert route pattern like "/product/:id" into RegExp
      const regex = new RegExp(`^${route.replace(/:[^/]+/g, '[^/]+')}$`);
      return regex.test(location.pathname);
    }
    return route === location.pathname;
  });

  const dispatch = useDispatch();
  const token = localStorage.getItem("token");


  useEffect(() => {
    document.title = "InShape StorePh";
    if (token) {
      dispatch(fetchCart());
    }
  }, [token, dispatch]);

  return (

    <div className="App">

      <Header />
      <div className='pt-50'>
        <Routes>
          <Route path="/profile" element={<Profile />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path='/forgot-pass' element={<ForgotPass />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/all-products" element={<AllProducts />} />
          <Route path="/new-products" element={<NewProducts />} />
          <Route path="/top-products" element={<TopProducts />} />
          <Route path="/manage-products" element={<ManageProducts />} />
          <Route path="/orders-summary" element={<OrdersSummary />} />
          <Route path="/view-orders" element={<ViewOrders />} />
          <Route path="/setup-payment-methods" element={<SetUpPaymentMethods />} />
          <Route path="/setup-shipping-address" element={<SetUpShippingAddress />} />
          <Route path='/privacy-policy' element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/admin-panel" element={<AdminPanel />} />
          <Route path="/product/:id" element={<ProductDetails />} />
        </Routes>
      </div>

      <ToastContainer position="top-right" autoClose={2000} />
      {!hideLayoutComponents && < Main />}
      <Footer />
    </div>

  );
}

export default App;
