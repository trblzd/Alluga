import React, { useState, useEffect, lazy, Suspense } from "react";
import { commerce } from "./lib/commerce";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const Navbar = lazy(() => import("./Components/Navbar/Navbar"));
const Products = lazy(() => import("./Components/Products/Products"));
const Cart = lazy(() => import("./Components/Cart/Cart"));
const ProductView = lazy(() =>
  import("./Components/Products/ProductView/ProductView")
);
const SignIn = lazy(() => import("./Components/UserSign/SignIn/SignIn"));
const SignUp = lazy(() => import("./Components/UserSign/SignUp/SignUp"));
const AddProduct = lazy(() =>
  import("./Components/Products/AddProduct/AddProduct")
);
const RemoveProduct = lazy(() =>
  import("./Components/Products/RemoveProduct/RemoveProduct")
);
const CartTest = lazy(() => import("./Components/Cart/CartTest"));

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
  const listProducts = async () => {
    const { list } = await commerce.products.list();

    setProducts(list);
  };
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

              <Route
                path="/CartTest"
                element={
                  <CartTest
                    cart={cart}
                    handleUpdateCartQty={handleUpdateCartQty}
                    handleEmptyCart={handleEmptyCart}
                    handleRemoveFromCart={handleRemoveFromCart}
                  />
                }
              />

              <Route path="/product-view/:id" element={<ProductView />} />

              <Route path="AddProduct" element={<AddProduct />} />
              <Route path="RemoveProduct" element={<RemoveProduct />} />

              <Route path="/SignUp" element={<SignUp />} />
              <Route path="/SignIn" element={<SignIn />} />
            </Routes>
          </Suspense>
        </div>
      </Router>
    </>
  );
};

export default App;
