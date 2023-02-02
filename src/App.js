import "./App.css";
import React, { useState, useEffect } from "react";

import { commerce } from "./lib/commerce";
import { Navbar, Products, Cart, Checkout } from "./Components";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {

  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});

  const fetchProducts = async () => {
    const { data } = await commerce.products.list();

    setProducts(data);
  };
  const fetchCart = async () => {
    setCart( await commerce.cart.retrieve());
  }
  const handleAddToCart = async (productId, quantity) => {
    const item = await commerce.cart.add(productId, quantity);
    setCart(item);
  }

  const handleUpdateCartQty = async (productId, quantity) => {
    const item = await commerce.cart.update(productId, {quantity});
    setCart(item);
  }
  
  const handleRemoveFromCart = async (productId) => {
    const item = await commerce.cart.remove(productId);
    setCart(item);
  }

  const handleEmptyCart = async () => {
    const {cart} = await commerce.cart.empty();
    setCart(cart);
  }

  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);

  return (
    <>
    <Router>
    <div>
      <Navbar totalItems={cart.total_items} />
      <Routes>
        <Route  path="" element={
           <Products products={products} onAddToCart={handleAddToCart} handleUpdateCartQty/>}/>     
        <Route  path="/cart" element={
            <Cart cart={cart} 
              handleUpdateCartQty={handleUpdateCartQty} 
              handleEmptyCart={handleEmptyCart} 
              handleRemoveFromCart={handleRemoveFromCart} />}/>
        <Route path ="/checkout" element={
            <Checkout cart={cart} />
        }/>

      </Routes> 

    </div>
    </Router>
    </>
  );
};

export default App;
