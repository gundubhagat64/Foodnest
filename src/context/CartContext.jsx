import { createContext, useContext, useState } from "react";

const CartContext = createContext();

function getSavedCart() {
  const savedCart = localStorage.getItem("foodnest-cart");

  if (savedCart) {
    return JSON.parse(savedCart);
  }

  return [];
}

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(getSavedCart);

  const saveCart = (items) => {
    setCartItems(items);
    localStorage.setItem("foodnest-cart", JSON.stringify(items));
  };

  const addToCart = (food) => {
    const existingItem = cartItems.find(
      (item) => item.id === food.id
    );

    let updatedItems;

    if (existingItem) {
      updatedItems = cartItems.map((item) =>
        item.id === food.id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      );
    } else {
      updatedItems = [
        ...cartItems,
        {
          ...food,
          quantity: 1,
        },
      ];
    }

    saveCart(updatedItems);
  };

  const increaseQuantity = (id) => {
    const updatedItems = cartItems.map((item) =>
      item.id === id
        ? {
            ...item,
            quantity: item.quantity + 1,
          }
        : item
    );

    saveCart(updatedItems);
  };

  const decreaseQuantity = (id) => {
    const updatedItems = cartItems
      .map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity - 1,
            }
          : item
      )
      .filter((item) => item.quantity > 0);

    saveCart(updatedItems);
  };

  const removeFromCart = (id) => {
    const updatedItems = cartItems.filter(
      (item) => item.id !== id
    );

    saveCart(updatedItems);
  };

  const clearCart = () => {
    saveCart([]);
  };

  const cartCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const cartTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartCount,
        cartTotal,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}