import React, { useState, useEffect, lazy, Suspense } from "react";
import { commerce } from "./lib/commerce";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const Navbar = lazy(() => import("./Components/Navbar/Navbar"));
const Products = lazy(() => import("./Components/Products/Products"));
const Cart = lazy(() => import("./Components/Cart/Cart"));
const ProductView = lazy(() =>
  import("./Components/Products/ProductView/ProductView")
);
const Login = lazy(() => import("./Components/UserSign/Login/Login"));
const CreateAccount = lazy(() =>
  import("./Components/UserSign/CreateAccount/CreateAccount")
);
const UserProfile = lazy(() => import("./Components/User/UserProfile"));

const App = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});

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
          <Suspense fallback={<h1>Carregando...</h1>}>
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
                path="/Carrinho"
                element={
                  <Cart
                    cart={cart}
                    handleUpdateCartQty={handleUpdateCartQty}
                    handleEmptyCart={handleEmptyCart}
                    handleRemoveFromCart={handleRemoveFromCart}
                  />
                }
              />

              <Route path="/product-view/:id" element={<ProductView />} />

              <Route path="/CriarConta" element={<CreateAccount />} />
              <Route path="/Login" element={<Login />} />

              <Route path="/Perfil" element={<UserProfile />} />
            </Routes>
          </Suspense>
        </div>
      </Router>
    </>
  );
};

export default App;
