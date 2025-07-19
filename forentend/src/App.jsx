import React from 'react';
import Nav from './Nav.jsx';
import SignUp from './page/SignUp.jsx';
import Priversy from './page/Priversy.jsx';
import Login from './page/Login.jsx';
import AddProduct from './page/Add-product.jsx';
import Product from './page/Product.jsx';
import HomeBody from './page/homebody.jsx';
import UpdateProduct from './page/Update-product.jsx';
import Profile from './page/Profile.jsx';
import ShopLogin from './page/Login-shopkeeper.jsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignupShopkeeper from './page/Signup-shopkeeper.jsx';
function App() {
  

  return (
    <>
    <BrowserRouter>
   
      <Routes>
      
        <Route element={<Priversy />}>
        
        <Route path="/nav" element={<h1>Welcome to the nav</h1>} />
        <Route path="/add-product" element={<AddProduct/>} />
        <Route path="/productList" element={<Product/>} />
        <Route path="/logout" element={<h1>Logout</h1>} />
        <Route path="/update-product/:id" element={<UpdateProduct/>} />
        <Route path="/profile" element={<Profile/>} />
        </Route>
        <Route path="/" element={<Nav/>} />
        
        <Route path="/shopkeeper/register" element={<SignupShopkeeper />} />
        <Route path="/home" element={<HomeBody />} /> 
         <Route path="/shopkeeper/login" element={<ShopLogin />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login/>} />
        </Routes>
        </BrowserRouter>
        </>
  )
}

export default App
