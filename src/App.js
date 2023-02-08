import React, { useState, useEffect } from "react";
import { commerce } from "./lib/commerce";
import { Navbar, Products, Cart, Checkout, SignIn, SignUp } from "./Components";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});
  const [order, setOrder] = useState({});
  const [errorMessage, setErrorMessage] = useState("");

  const fetchProducts = async () => {
    const { data } = await commerce.products.list();

    setProducts(data);
  };

  const fetchCart = async () => {
    setCart(await commerce.cart.retrieve());
  };
  const handleAddToCart = async (productId, quantity) => {
    const item = await commerce.cart.add(productId, quantity);
    setCart(item);
  };

  const handleUpdateCartQty = async (productId, quantity) => {
    const item = await commerce.cart.update(productId, { quantity });
    setCart(item);
  };

  const handleRemoveFromCart = async (productId) => {
    const item = await commerce.cart.remove(productId);
    setCart(item);
  };

  const handleEmptyCart = async () => {
    const { cart } = await commerce.cart.empty();
    setCart(cart);
  };
  const refreshCart = async () => {
    const newCart = await commerce.cart.refresh();
    setCart(newCart);
  };

  const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
    try {
      const incomingOrder = await commerce.checkout.capture(
        checkoutTokenId,
        newOrder
      );

      setOrder(incomingOrder);

      refreshCart();
    } catch (error) {
      setErrorMessage(error.data.error.message);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);

  return (
    <>
      <Router>
        <div>
          <Navbar
            totalItems={cart && cart.total_items ? cart.total_items : 0}
          />
          <Routes>
            <Route
              path=""
              element={
                <Products
                  products={products}
                  onAddToCart={handleAddToCart}
                  handleUpdateCartQty
                />
              }
            />

            <Route
              path="/Cart"
              element={
                <Cart
                  cart={cart}
                  handleUpdateCartQty={handleUpdateCartQty}
                  handleEmptyCart={handleEmptyCart}
                  handleRemoveFromCart={handleRemoveFromCart}
                />
              }
            />

            <Route path="/SignUp" element={<SignUp />} />
            <Route path="/SignIn" element={<SignIn />} />

            <Route
              path="/CheckOut"
              element={
                <Checkout
                  cart={cart}
                  order={order}
                  onCaptureCheckout={handleCaptureCheckout}
                  error={errorMessage}
                />
              }
            />
          </Routes>
        </div>
      </Router>
    </>
  );
};

export default App;
