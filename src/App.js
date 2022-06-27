import React from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import { Routes, Route, Link, Navigate } from "react-router-dom";
import './App.css';
import Login from './features/login/Login';
import Home from './features/page/Home';
import Cart from './features/cart/Cart'
import { useSelector } from 'react-redux';
import { RequireAuth } from './features/login/RequireAuth';
import Products from './features/page/Products';
function App() {
  const {success} = useSelector(state=>state.login)
  const {carts} = useSelector(state=>state.carts);
  return (
    <div className='w-full'>
        <div className='w-full bg-gray-600 py-2'>
            <div className='w-full h-10 max-w-5xl mx-auto flex flex-row justify-between items-center'>
              <nav className='w-auto'>
                  <ul className='flex flex-row items-center h-full'>
                    <li className='px-2 text-white'><Link to="/">Home</Link></li>
                    {/* <li className='px-2 text-white'><Link to="/login">Login</Link></li>
                    <li className='px-2 text-white'><Link to="/register">Register</Link></li> */}
                    <li className='px-2 text-white'><Link to="/products">Products</Link></li>
                    <li className='px-2 text-white'><Link to="/carts">Carts</Link></li>
                  </ul>
              </nav>
              <div className='w-auto'>
                <span className='bg-white text-black p-2'><i class="fas fa-cart-arrow-down px-1"></i>Carts:<strong className='px-1 text-red-600'>{carts.length}</strong></span>
              </div>
            </div>
        </div>
      <Routes>
          <Route path="/" element={success?<Home />:<Login />} />
          <Route path="home" element={
              <RequireAuth>
                <Home />
              </RequireAuth>
            } />
          <Route path="login" element={
             success?<Navigate to="/" replace />:<Login />
            } />
          <Route path='products' element={<Products />} />
          <Route path='carts' element={<Cart />} />
      </Routes>
    </div>
  );
}

export default App;
