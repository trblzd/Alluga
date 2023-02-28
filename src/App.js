import React, { useState, useEffect, lazy, Suspense, useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import { commerce } from "./lib/commerce";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

const Navbar = lazy(() => import("./Components/Navbar/Navbar"));
const Products = lazy(() => import("./Components/Products/Products"));
const Cart = lazy(() => import("./Components/Cart/Cart"));
const Login = lazy(() => import("./Components/UserSign/Login/Login"));
const Checkout = lazy(() =>
  import("./Components/CheckoutForm/Checkout/Checkout")
);
const CreateAccount = lazy(() =>
  import("./Components/UserSign/CreateAccount/CreateAccount")
);
const UserProfile = lazy(() => import("./Components/User/UserProfile"));

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

  const handleRemoveFromCart = async (productId) => {
    const item = await commerce.cart.remove(productId);
    setCart(item);
  };

  const handleEmptyCart = async () => {
    const item = await commerce.cart.empty();
    setCart(item);
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

  const { currentUser } = useContext(AuthContext);

  const RequireAuth = ({ children }) => {
    return currentUser ? children : <Navigate to="/Login" />;
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
              <Route path="/Login" element={<Login />} />
              <Route
                path=""
                element={
                  <RequireAuth>
                    <Products
                      products={products}
                      onAddToCart={handleAddToCart}
                      handleUpdateCartQty
                    />
                  </RequireAuth>
                }
              />

              <Route
                path="/Carrinho"
                element={
                  <RequireAuth>
                    <Cart
                      cart={cart}
                      handleEmptyCart={handleEmptyCart}
                      handleRemoveFromCart={handleRemoveFromCart}
                    />
                  </RequireAuth>
                }
              />
              <Route
                path="/Checkout"
                element={
                  <Checkout
                    cart={cart}
                    onCaptureCheckout={handleCaptureCheckout}
                    error={errorMessage}
                  />
                }
              />

              <Route path="/CriarConta" element={<CreateAccount />} />

              <Route
                path="/Perfil"
                element={
                  <RequireAuth>
                    <UserProfile />
                  </RequireAuth>
                }
              />
            </Routes>
          </Suspense>
        </div>
      </Router>
    </>
  );
};

export default App;
