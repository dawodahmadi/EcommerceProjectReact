import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './routes/Home';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import ManageAccount from './components/Account/ManageAccount/ManageAccount';
import MyAccount from './components/Account/MyAccount/MyAccount';
import Shop from './components/Shop/Shop';
import ItemView from './routes/ItemView';
import CategoryView from './routes/CategoryView';
import SearchView from './routes/Search';
import CartItemsProvider from './context/CartItemsProvider';
import Login from './components/Authentication/Login/Login';
import Register from './components/Authentication/Register/Register';
import Wishlist from './components/Wishlist/index';
import WishItemsProvider from './context/WishItemsProvider';
import SearchProvider from './context/SearchProvider';

function App() {
  return (
    <CartItemsProvider>
      <WishItemsProvider>
        <SearchProvider>
          <Router>
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/account">
                <Route path="me" element={<MyAccount />} />
                <Route path="manage" element={<ManageAccount />} />
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
                <Route path="*" element={<Login />} />
              </Route>
              <Route path="/shop" element={<Shop />} />
              <Route path="/category/:id" element={<CategoryView />} />
              <Route path="/item/men/:id" element={<ItemView />} />
              <Route path="/item/women/:id" element={<ItemView />} />
              <Route path="/item/kid/:id" element={<ItemView />} />
              <Route path="/item/featured/:id" element={<ItemView />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/search/*" element={<SearchView />} />
              <Route path="/admin" element={<Wishlist />} />
            </Routes>
            <Footer />
          </Router>
        </SearchProvider>
      </WishItemsProvider>
    </CartItemsProvider>
  );
}

export default App;
