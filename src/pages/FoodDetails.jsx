import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { supabase } from "../lib/supabase";

function FoodDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [food, setFood] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchFood = async () => {
    setLoading(true);
    setError("");

    const { data, error: fetchError } = await supabase
      .from("foods")
      .select("*")
      .eq("id", id)
      .eq("available", true)
      .single();

    if (fetchError) {
      setError(fetchError.message);
      setFood(null);
    } else {
      setFood(data);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchFood();
  }, [id]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#11100f] text-white">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-2 border-white/10 border-t-[#e5a13a]" />
          <p className="mt-4 text-sm text-[#aaa49b]">
            Loading food details...
          </p>
        </div>
      </div>
    );
  }

  if (error || !food) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#11100f] px-5 text-white">
        <div className="w-full max-w-lg rounded-3xl border border-red-500/20 bg-red-500/10 p-8 text-center">
          <div className="text-5xl">⚠️</div>

          <h2 className="mt-4 text-xl font-black">
            Food not found
          </h2>

          <p className="mt-2 text-sm text-red-300/70">
            {error || "This food item is not available."}
          </p>

          <button
            type="button"
            onClick={() => navigate("/menu")}
            className="mt-6 rounded-xl bg-[#e5a13a] px-6 py-3 text-sm font-black text-[#17120b]"
          >
            ← Back to Menu
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#11100f] px-5 py-10 text-white sm:px-8 lg:px-10">

      <div className="mx-auto max-w-6xl">

        {/* BACK */}
        <button
          type="button"
          onClick={() => navigate("/menu")}
          className="mb-8 text-sm font-bold text-[#aaa49b] transition hover:text-[#e5a13a]"
        >
          ← Back to Menu
        </button>

        <div className="grid overflow-hidden rounded-[32px] border border-white/10 bg-[#191817] shadow-2xl shadow-black/40 lg:grid-cols-2">

          {/* IMAGE */}
          <div className="relative min-h-[420px] overflow-hidden bg-gradient-to-br from-[#302217] via-[#211a15] to-[#151412]">

            <div className="absolute inset-0 bg-[#e5a13a]/5" />

            {food.image_url ? (
              <img
                src={food.image_url}
                alt={food.name}
                className="relative h-full min-h-[420px] w-full object-cover"
              />
            ) : (
              <div className="flex min-h-[420px] items-center justify-center text-9xl">
                🍽️
              </div>
            )}

            <div className="absolute left-5 top-5 rounded-xl border border-white/10 bg-black/50 px-4 py-2 text-xs font-bold text-[#f0b34e] backdrop-blur-md">
              {food.category}
            </div>

          </div>

          {/* DETAILS */}
          <div className="flex flex-col justify-center p-7 sm:p-10">

            <p className="text-[10px] font-black uppercase tracking-[2px] text-[#a87835]">
              FOODNEST KITCHEN
            </p>

            <h1 className="mt-3 text-3xl font-black text-white sm:text-4xl">
              {food.name}
            </h1>

            <p className="mt-5 text-sm leading-7 text-[#8f887e]">
              {food.description}
            </p>

            <div className="mt-7 flex items-end justify-between border-b border-white/10 pb-6">

              <div>
                <p className="text-xs text-[#68635c]">
                  Price
                </p>

                <p className="mt-1 text-3xl font-black text-[#f0b34e]">
                  ₹{food.price}
                </p>
              </div>

              <div className="rounded-xl bg-[#e5a13a]/10 px-3 py-2 text-xs font-bold text-[#f0b34e]">
                ✓ Available
              </div>

            </div>

            {/* INFO */}
            <div className="mt-6 grid grid-cols-3 gap-3">

              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-center">
                <div className="text-xl">🍽️</div>
                <p className="mt-2 text-[10px] text-[#77726a]">
                  Freshly Made
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-center">
                <div className="text-xl">🛵</div>
                <p className="mt-2 text-[10px] text-[#77726a]">
                  Fast Delivery
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-center">
                <div className="text-xl">🔒</div>
                <p className="mt-2 text-[10px] text-[#77726a]">
                  Secure Order
                </p>
              </div>

            </div>

            {/* ADD TO CART */}
            <button
              type="button"
              onClick={() => {
                addToCart(food);
                navigate("/cart");
              }}
              className="mt-8 w-full rounded-2xl bg-[#e5a13a] py-4 text-sm font-black text-[#17120b] transition hover:bg-[#ffc15a] hover:shadow-xl hover:shadow-[#e5a13a]/20"
            >
              Add to Cart →
            </button>

          </div>

        </div>

      </div>
    </div>
  );
}

export default FoodDetails;