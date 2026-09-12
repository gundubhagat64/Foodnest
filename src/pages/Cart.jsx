import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Cart() {
  const navigate = useNavigate();

  const {
    cartItems,
    cartTotal,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
  } = useCart();

  const deliveryFee = cartItems.length > 0 ? 40 : 0;
  const grandTotal = cartTotal + deliveryFee;

  if (cartItems.length === 0) {
    return (
      <div className="cart-page">
        <div className="empty-cart">
          <div className="empty-cart-icon">🛒</div>

          <span className="cart-small-title">
            YOUR CART
          </span>

          <h1>Your cart is empty</h1>

          <p>
            Looks like you haven't added anything yet.
            <br />
            Let's find something delicious!
          </p>

          <button
            className="cart-browse-btn"
            onClick={() => navigate("/menu")}
          >
            Explore Menu →
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <section className="cart-container">

        <div className="cart-header">
          <div>
            <span className="cart-small-title">
              FOODNEST KITCHEN
            </span>

            <h1>Your Cart</h1>

            <p>
              {cartItems.length} items selected
            </p>
          </div>

          <button
            className="continue-shopping"
            onClick={() => navigate("/menu")}
          >
            ← Continue Shopping
          </button>
        </div>

        <div className="cart-layout">

          <div className="cart-items-section">
            {cartItems.map((item) => (
              <div
                className="cart-item-card"
                key={item.id}
              >

                <div className="cart-item-image">
                  <span>{item.image}</span>
                </div>

                <div className="cart-item-details">

                  <div className="cart-item-top">
                    <div>
                      <h3>{item.name}</h3>
                      <span>{item.category}</span>
                    </div>

                    <button
                      className="remove-cart-btn"
                      onClick={() =>
                        removeFromCart(item.id)
                      }
                    >
                      ×
                    </button>
                  </div>

                  <p>{item.description}</p>

                  <div className="cart-item-bottom">

                    <strong>
                      ₹{item.price}
                    </strong>

                    <div className="quantity-control">

                      <button
                        onClick={() =>
                          decreaseQuantity(item.id)
                        }
                      >
                        −
                      </button>

                      <span>
                        {item.quantity}
                      </span>

                      <button
                        onClick={() =>
                          increaseQuantity(item.id)
                        }
                      >
                        +
                      </button>

                    </div>

                    <strong>
                      ₹{item.price * item.quantity}
                    </strong>

                  </div>

                </div>

              </div>
            ))}
          </div>

          <div className="cart-summary">

            <div className="summary-title">
              <h2>Order Summary</h2>
              <span>FoodNest</span>
            </div>

            <div className="summary-row">
              <span>Food Total</span>
              <strong>₹{cartTotal}</strong>
            </div>

            <div className="summary-row">
              <span>Delivery Fee</span>
              <strong>₹{deliveryFee}</strong>
            </div>

            <div className="summary-row">
              <span>Taxes</span>
              <strong>Included</strong>
            </div>

            <div className="summary-divider"></div>

            <div className="summary-total">
              <span>Total</span>
              <strong>₹{grandTotal}</strong>
            </div>

            <button
              className="checkout-btn"
              onClick={() => navigate("/checkout")}
            >
              Proceed to Checkout →
            </button>

            <div className="secure-payment">
              🔒 Secure & safe checkout
            </div>

          </div>

        </div>

      </section>
    </div>
  );
}

export default Cart;