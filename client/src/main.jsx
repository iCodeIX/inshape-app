import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import "./index.css";
import App from './App.jsx'
import store from './app/store.js';
import { Provider } from 'react-redux';
import ScrollToTop from './Components/utils/ScrollToTop.jsx';
createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter>
      <ScrollToTop />
      <App />
    </BrowserRouter>
  </Provider>
)
