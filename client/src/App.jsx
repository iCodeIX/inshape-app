
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
import SetUpPayments from './Components/Users/SetUpPayments.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import OrdersSummary from './Components/Users/OrdersSummary.jsx';
import { useEffect } from 'react';

function App() {
  const location = useLocation();
  const hiddenRoutes = ['/Register', '/Login', '/ForgotPass', '/Profile', '/Cart', , '/AllProducts', '/NewProducts', '/TopProducts', '/ManageProducts', '/OrdersSummary', '/ViewOrders', '/SetUpPayments'];
  const hideLayoutComponents = hiddenRoutes.includes(location.pathname);


  useEffect(() => {
    document.title = "InShape StorePh";
  }, []);


  return (

    <div className="App">

      <Header />
      <div className='pt-50'>
        <Routes>
          <Route path="/Profile" element={<Profile />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/Login" element={<Login />} />
          <Route path='/ForgotPass' element={<ForgotPass />} />
          <Route path="/Cart" element={<Cart />} />
          <Route path="/AllProducts" element={<AllProducts />} />
          <Route path="/AllProducts" element={<AllProducts />} />
          <Route path="/NewProducts" element={<NewProducts />} />
          <Route path="/TopProducts" element={<TopProducts />} />
          <Route path="/ManageProducts" element={<ManageProducts />} />
          <Route path="/OrdersSummary" element={<OrdersSummary />} />
          <Route path="/ViewOrders" element={<ViewOrders />} />
          <Route path="/SetUpPayments" element={<SetUpPayments />} />
        </Routes>
      </div>

      <ToastContainer position="top-right" autoClose={2000} />
      {!hideLayoutComponents && < Main />}
      <Footer />
    </div>

  );
}

export default App;
