import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";
import Tracking from "./pages/Tracking";
import AIRecommendation from "./pages/AIRecommendation";
import Profile from "./pages/Profile";
import Orders from "./pages/Orders";

import Login from "./pages/Login";
import Register from "./pages/Register";

import RestaurantLogin from "./pages/restaurant/RestaurantLogin";
import RestaurantDashboard from "./pages/restaurant/RestaurantDashboard";

import { CartProvider } from "./context/CartContext";

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-success" element={<OrderSuccess />} />
          <Route path="/tracking" element={<Tracking />} />
          <Route path="/ai" element={<AIRecommendation />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/orders" element={<Orders />} />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route
            path="/restaurant/login"
            element={<RestaurantLogin />}
          />

          <Route
            path="/restaurant/dashboard"
            element={<RestaurantDashboard />}
          />
        </Routes>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;