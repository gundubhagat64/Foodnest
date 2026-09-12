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
      <div className="min-h-[calc(100vh-72px)] bg-[#090807] px-5 py-16 text-[#f5f1e8] sm:px-8">
        <div className="mx-auto flex min-h-[65vh] max-w-xl items-center justify-center">
          <div className="w-full rounded-[32px] border border-white/10 bg-[#11100f]/80 p-8 text-center shadow-2xl shadow-black/30 backdrop-blur-xl sm:p-12">

            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-[#e5a13a]/10 text-4xl">
              🛒
            </div>

            <p className="mt-6 text-[10px] font-black uppercase tracking-[2px] text-[#e5a13a]">
              FOODNEST KITCHEN
            </p>

            <h1 className="mt-2 text-3xl font-black text-white sm:text-4xl">
              Your cart is empty
            </h1>

            <p className="mx-auto mt-3 max-w-sm text-xs leading-5 text-[#817a71] sm:text-sm">
              Looks like you haven't added anything yet.
              Let's find something delicious!
            </p>

            <button
              type="button"
              onClick={() => navigate("/menu")}
              className="mt-7 rounded-2xl bg-[#e5a13a] px-7 py-3.5 text-xs font-black text-[#17120b] shadow-lg shadow-[#e5a13a]/20 transition hover:bg-[#f0ad43]"
            >
              Explore Menu →
            </button>

          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-72px)] bg-[#090807] px-5 py-8 text-[#f5f1e8] sm:px-8 sm:py-12 lg:px-10">

      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">

          <div>
            <p className="text-[10px] font-black uppercase tracking-[2px] text-[#e5a13a]">
              FOODNEST KITCHEN
            </p>

            <h1 className="mt-1 text-3xl font-black tracking-tight text-white sm:text-4xl">
              Your Cart
            </h1>

            <p className="mt-1 text-xs text-[#777067]">
              {cartItems.reduce(
                (total, item) => total + item.quantity,
                0
              )}{" "}
              items selected
            </p>
          </div>

          <button
            type="button"
            onClick={() => navigate("/menu")}
            className="w-fit rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-xs font-bold text-[#aaa39a] transition hover:border-[#e5a13a]/30 hover:bg-[#e5a13a]/10 hover:text-white"
          >
            ← Continue Shopping
          </button>

        </div>

        {/* Main layout */}
        <div className="grid gap-6 lg:grid-cols-[1fr_380px]">

          {/* Cart Items */}
          <div className="space-y-3">

            {cartItems.map((item) => (
              <div
                key={item.id}
                className="group rounded-3xl border border-white/10 bg-[#11100f]/80 p-4 shadow-xl shadow-black/10 backdrop-blur-xl transition hover:border-[#e5a13a]/20 sm:p-5"
              >

                <div className="flex gap-4">

                  {/* Food image */}
                  <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#282119] to-[#15120f] text-4xl sm:h-24 sm:w-24 sm:text-5xl">
                    {item.image}
                  </div>

                  {/* Details */}
                  <div className="min-w-0 flex-1">

                    <div className="flex items-start justify-between gap-2">

                      <div className="min-w-0">
                        <h3 className="truncate text-sm font-black text-white sm:text-base">
                          {item.name}
                        </h3>

                        <p className="mt-1 text-[10px] font-semibold text-[#706a62]">
                          {item.category}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeFromCart(item.id)}
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-lg text-[#68625b] transition hover:bg-red-500/10 hover:text-red-400"
                        aria-label={`Remove ${item.name}`}
                      >
                        ×
                      </button>

                    </div>

                    <p className="mt-2 hidden text-xs leading-5 text-[#777067] sm:block">
                      {item.description}
                    </p>

                    <div className="mt-4 flex items-center justify-between gap-3">

                      <span className="text-sm font-black text-[#f0ad43]">
                        ₹{item.price}
                      </span>

                      {/* Quantity */}
                      <div className="flex items-center rounded-xl border border-white/10 bg-white/[0.04]">

                        <button
                          type="button"
                          onClick={() => decreaseQuantity(item.id)}
                          className="flex h-8 w-8 items-center justify-center text-sm font-black text-[#aaa39a] transition hover:bg-[#e5a13a]/10 hover:text-[#f0ad43]"
                        >
                          −
                        </button>

                        <span className="flex h-8 min-w-8 items-center justify-center border-x border-white/10 text-xs font-black text-white">
                          {item.quantity}
                        </span>

                        <button
                          type="button"
                          onClick={() => increaseQuantity(item.id)}
                          className="flex h-8 w-8 items-center justify-center text-sm font-black text-[#aaa39a] transition hover:bg-[#e5a13a]/10 hover:text-[#f0ad43]"
                        >
                          +
                        </button>

                      </div>

                      <span className="text-sm font-black text-white">
                        ₹{item.price * item.quantity}
                      </span>

                    </div>

                  </div>

                </div>

              </div>
            ))}

          </div>

          {/* Summary */}
          <div className="lg:sticky lg:top-24 lg:self-start">

            <div className="rounded-3xl border border-white/10 bg-[#11100f]/90 p-5 shadow-2xl shadow-black/30 backdrop-blur-xl sm:p-6">

              <div className="flex items-center justify-between">

                <div>
                  <p className="text-[10px] font-black uppercase tracking-[1.5px] text-[#e5a13a]">
                    FOODNEST
                  </p>

                  <h2 className="mt-1 text-xl font-black text-white">
                    Order Summary
                  </h2>
                </div>

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#e5a13a]/10 text-lg">
                  🧾
                </div>

              </div>

              <div className="my-5 h-px bg-white/10" />

              <div className="space-y-4">

                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#817a71]">Food Total</span>
                  <span className="font-bold text-white">
                    ₹{cartTotal}
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#817a71]">Delivery Fee</span>
                  <span className="font-bold text-white">
                    ₹{deliveryFee}
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#817a71]">Taxes</span>
                  <span className="font-bold text-[#7d766d]">
                    Included
                  </span>
                </div>

              </div>

              <div className="my-5 h-px bg-white/10" />

              <div className="flex items-end justify-between">

                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-[#706960]">
                    Grand Total
                  </p>

                  <p className="mt-1 text-2xl font-black text-white">
                    ₹{grandTotal}
                  </p>
                </div>

                <span className="rounded-lg bg-green-500/10 px-2.5 py-1.5 text-[9px] font-bold text-green-400">
                  Secure
                </span>

              </div>

              <button
                type="button"
                onClick={() => navigate("/checkout")}
                className="mt-6 w-full rounded-2xl bg-[#e5a13a] py-4 text-xs font-black text-[#17120b] shadow-lg shadow-[#e5a13a]/20 transition hover:-translate-y-0.5 hover:bg-[#f0ad43]"
              >
                Proceed to Checkout →
              </button>

              <div className="mt-4 flex items-center justify-center gap-2 text-[9px] text-[#625d56]">
                <span>🔒</span>
                Secure & safe checkout
              </div>

            </div>

            {/* Mini note */}
            <div className="mt-3 rounded-2xl border border-white/5 bg-white/[0.025] p-4 text-center">
              <p className="text-[10px] leading-4 text-[#686159]">
                Freshly prepared food delivered with care from FoodNest
                Kitchen.
              </p>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

export default Cart;