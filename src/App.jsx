import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import { CartProvider } from "./context/CartContext";

function App() {
  return (
    <CartProvider>
      <Navbar />
      <Home />
    </CartProvider>
  );
}

export default App;