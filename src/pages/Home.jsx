import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import heroImage from "../assets/foodnest-hero.png.png";
import { supabase } from "../lib/supabase";

const categories = [
  { name: "Biryani", icon: "🍛" },
  { name: "Pizza", icon: "🍕" },
  { name: "Burger", icon: "🍔" },
  { name: "Chinese", icon: "🍜" },
  { name: "Starters", icon: "🥘" },
  { name: "Desserts", icon: "🍰" },
];

function Home() {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchFoods = async () => {
    setLoading(true);
    setError("");

    const { data, error: fetchError } = await supabase
      .from("foods")
      .select("*")
      .eq("available", true)
      .limit(4);

    if (fetchError) {
      setError(fetchError.message);
      setFoods([]);
    } else {
      setFoods(data || []);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchFoods();
  }, []);

  const popularFoods = foods;

  const featuredFood = popularFoods[0];

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#090807] text-[#f5f1e8]">

      {/* Background Image */}
      <div
        className="pointer-events-none fixed inset-0 z-0 scale-105 bg-cover bg-center opacity-35 blur-[3px]"
        style={{
          backgroundImage: `url(${heroImage})`,
        }}
      />

      {/* Dark overlays */}
      <div className="pointer-events-none fixed inset-0 z-0 bg-gradient-to-r from-[#080706]/95 via-[#0b0908]/80 to-[#0b0908]/55" />

      <div className="pointer-events-none fixed inset-0 z-0 bg-gradient-to-b from-[#080706]/80 via-[#0d0b09]/40 to-[#0d0b09]/98" />

      {/* Orange glow */}
      <div className="pointer-events-none fixed right-[-180px] top-[15%] z-0 h-[500px] w-[500px] rounded-full bg-[#e59a32]/10 blur-[130px]" />

      <div className="relative z-10">

        {/* HERO */}
        <section className="mx-auto max-w-7xl px-5 pb-14 pt-10 sm:px-8 sm:pb-20 sm:pt-16 lg:px-10 lg:pt-20">
          <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">

            {/* LEFT */}
            <div className="max-w-2xl">

              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#e5a13a]/20 bg-[#e5a13a]/10 px-3.5 py-2 text-[10px] font-bold uppercase tracking-[1.5px] text-[#f0ad43] backdrop-blur-md sm:text-xs">
                <span className="h-1.5 w-1.5 rounded-full bg-[#e5a13a] shadow-[0_0_10px_#e5a13a]" />
                Fresh • Fast • Delicious
              </div>

              <h1 className="text-[42px] font-black leading-[0.98] tracking-[-2px] text-white sm:text-6xl lg:text-7xl">
                Cravings
                <br />
                <span className="text-[#e5a13a]">meet</span> comfort.
              </h1>

              <p className="mt-5 max-w-xl text-sm leading-6 text-[#aaa39a] sm:text-base sm:leading-7">
                Discover delicious food made fresh at FoodNest Kitchen.
                Order your favourites and enjoy a smooth, fast delivery
                experience.
              </p>

              {/* BUTTONS */}
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">

                <button
                  type="button"
                  onClick={() => navigate("/menu")}
                  className="rounded-2xl bg-[#e5a13a] px-7 py-3.5 text-sm font-black text-[#17120b] shadow-lg shadow-[#e5a13a]/20 transition hover:-translate-y-0.5 hover:bg-[#f0ad43]"
                >
                  Explore Menu →
                </button>

                <button
                  type="button"
                  onClick={() => navigate("/ai")}
                  className="rounded-2xl border border-white/10 bg-white/[0.05] px-7 py-3.5 text-sm font-bold text-white backdrop-blur-md transition hover:border-[#e5a13a]/30 hover:bg-[#e5a13a]/10"
                >
                  ✦ AI Food Finder
                </button>

              </div>

              {/* STATS */}
              <div className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-4 border-t border-white/10 pt-6">

                <div>
                  <p className="text-lg font-black text-white">4.8★</p>
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-[#746e65]">
                    Rating
                  </p>
                </div>

                <div className="h-8 w-px bg-white/10" />

                <div>
                  <p className="text-lg font-black text-white">20–30</p>
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-[#746e65]">
                    Min Delivery
                  </p>
                </div>

                <div className="h-8 w-px bg-white/10" />

                <div>
                  <p className="text-lg font-black text-white">100%</p>
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-[#746e65]">
                    Fresh Food
                  </p>
                </div>

              </div>

            </div>

            {/* RIGHT FOOD VISUAL */}
            <div className="relative mx-auto w-full max-w-md lg:max-w-lg">

              <div className="absolute inset-8 rounded-full bg-[#e5a13a]/10 blur-[70px]" />

              <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-black/20 p-2 shadow-2xl shadow-black/40 backdrop-blur-sm">

                <div
                  className="aspect-[4/4.2] rounded-[26px] bg-cover bg-center"
                  style={{
                    backgroundImage: `url(${heroImage})`,
                  }}
                />

                {/* Floating Card */}
                <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between rounded-2xl border border-white/10 bg-[#11100f]/85 px-4 py-3 backdrop-blur-xl">

                  <div className="flex items-center gap-3">

                    <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl bg-[#e5a13a]/15 text-xl">
                      {featuredFood?.image_url ? (
                        <img
                          src={featuredFood.image_url}
                          alt={featuredFood.name}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        "🍛"
                      )}
                    </div>

                    <div>
                      <p className="text-xs font-black text-white">
                        {featuredFood?.name || "Chef's Special"}
                      </p>

                      <p className="mt-0.5 text-[10px] text-[#827b72]">
                        Freshly prepared
                      </p>
                    </div>

                  </div>

                  <span className="rounded-lg bg-[#e5a13a]/10 px-2.5 py-1 text-[10px] font-bold text-[#f0ad43]">
                    ★ 4.8
                  </span>

                </div>

              </div>

            </div>

          </div>
        </section>

        {/* CATEGORIES */}
        <section className="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:px-10">

          <div className="mb-6 flex items-end justify-between">

            <div>
              <p className="text-[10px] font-bold uppercase tracking-[2px] text-[#e5a13a]">
                Explore
              </p>

              <h2 className="mt-1 text-2xl font-black text-white sm:text-3xl">
                What are you craving?
              </h2>
            </div>

            <button
              type="button"
              onClick={() => navigate("/menu")}
              className="hidden text-xs font-bold text-[#a49c91] transition hover:text-[#e5a13a] sm:block"
            >
              View all →
            </button>

          </div>

          <div className="grid grid-cols-3 gap-3 sm:grid-cols-3 md:grid-cols-6">

            {categories.map((category) => (
              <button
                key={category.name}
                type="button"
                onClick={() => navigate("/menu")}
                className="group rounded-2xl border border-white/10 bg-white/[0.035] p-3.5 text-center backdrop-blur-md transition hover:-translate-y-1 hover:border-[#e5a13a]/25 hover:bg-[#e5a13a]/10"
              >

                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-white/[0.05] text-2xl transition group-hover:scale-110 group-hover:bg-[#e5a13a]/10">
                  {category.icon}
                </div>

                <p className="mt-2.5 text-[10px] font-bold text-[#aaa39a] group-hover:text-white sm:text-xs">
                  {category.name}
                </p>

              </button>
            ))}

          </div>

        </section>

        {/* AI SECTION */}
        <section className="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:px-10">

          <div className="relative overflow-hidden rounded-[28px] border border-[#e5a13a]/15 bg-gradient-to-br from-[#20170d]/90 via-[#15120f]/90 to-[#0d0b09]/90 p-6 shadow-2xl shadow-black/20 sm:p-9">

            <div className="absolute right-[-60px] top-[-80px] h-56 w-56 rounded-full bg-[#e5a13a]/10 blur-[70px]" />

            <div className="relative grid items-center gap-6 md:grid-cols-[1fr_auto]">

              <div>

                <div className="mb-3 inline-flex rounded-xl bg-[#e5a13a]/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-wider text-[#f0ad43]">
                  ✦ FoodNest AI
                </div>

                <h2 className="max-w-xl text-2xl font-black leading-tight text-white sm:text-3xl">
                  Don't know what to order?
                  <br />
                  <span className="text-[#e5a13a]">
                    Let AI decide.
                  </span>
                </h2>

                <p className="mt-3 max-w-lg text-xs leading-5 text-[#8e877d] sm:text-sm">
                  Tell us your mood, taste or budget and get personalised
                  food suggestions instantly.
                </p>

              </div>

              <button
                type="button"
                onClick={() => navigate("/ai")}
                className="w-full rounded-2xl bg-[#e5a13a] px-6 py-3.5 text-xs font-black text-[#17120b] transition hover:bg-[#f0ad43] md:w-auto"
              >
                Try AI Recommendations →
              </button>

            </div>

          </div>

        </section>

        {/* POPULAR FOOD */}
        <section className="mx-auto max-w-7xl px-5 py-10 pb-20 sm:px-8 lg:px-10">

          <div className="mb-6 flex items-end justify-between">

            <div>
              <p className="text-[10px] font-bold uppercase tracking-[2px] text-[#e5a13a]">
                Top Picks
              </p>

              <h2 className="mt-1 text-2xl font-black text-white sm:text-3xl">
                Popular right now
              </h2>
            </div>

            <button
              type="button"
              onClick={() => navigate("/menu")}
              className="text-xs font-bold text-[#a49c91] transition hover:text-[#e5a13a]"
            >
              Full menu →
            </button>

          </div>

          {/* LOADING */}
          {loading && (
            <div className="rounded-3xl border border-white/10 bg-[#11100f]/75 px-6 py-16 text-center backdrop-blur-xl">
              <div className="mx-auto h-10 w-10 animate-spin rounded-full border-2 border-white/10 border-t-[#e5a13a]" />

              <p className="mt-5 text-sm text-[#aaa39a]">
                Loading popular food...
              </p>
            </div>
          )}

          {/* ERROR */}
          {!loading && error && (
            <div className="rounded-3xl border border-red-500/20 bg-red-500/10 px-6 py-12 text-center">

              <div className="text-5xl">
                ⚠️
              </div>

              <h3 className="mt-4 text-lg font-bold text-red-400">
                Unable to load food
              </h3>

              <p className="mx-auto mt-2 max-w-xl text-xs text-red-300/70">
                {error}
              </p>

              <button
                type="button"
                onClick={fetchFoods}
                className="mt-5 rounded-xl bg-[#e5a13a] px-5 py-3 text-xs font-bold text-[#17120b]"
              >
                Try Again
              </button>

            </div>
          )}

          {/* FOOD GRID */}
          {!loading && !error && popularFoods.length > 0 && (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

              {popularFoods.map((food) => (
                <div
                  key={food.id}
                  className="group overflow-hidden rounded-3xl border border-white/10 bg-[#11100f]/75 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-[#e5a13a]/25 hover:shadow-xl hover:shadow-black/30"
                >

                  {/* IMAGE */}
                  <div className="relative flex h-40 items-center justify-center overflow-hidden bg-gradient-to-br from-[#25201a] to-[#100e0c] sm:h-44">

                    <div className="absolute inset-0 bg-[#e5a13a]/5 opacity-0 transition group-hover:opacity-100" />

                    {food.image_url ? (
                      <img
                        src={food.image_url}
                        alt={food.name}
                        className="relative z-10 h-full w-full object-cover transition duration-300 group-hover:scale-105"
                      />
                    ) : (
                      <span className="relative text-7xl transition duration-300 group-hover:scale-110">
                        🍽️
                      </span>
                    )}

                  </div>

                  {/* DETAILS */}
                  <div className="p-4">

                    <div className="flex items-start justify-between gap-2">

                      <div>
                        <h3 className="text-sm font-black text-white">
                          {food.name}
                        </h3>

                        <p className="mt-1 text-[10px] text-[#746e65]">
                          {food.category}
                        </p>
                      </div>

                      <span className="whitespace-nowrap text-sm font-black text-[#f0ad43]">
                        ₹{food.price}
                      </span>

                    </div>

                    <p className="mt-2 line-clamp-2 text-[10px] leading-4 text-[#858077]">
                      {food.description}
                    </p>

                    <button
                      type="button"
                      onClick={() => addToCart(food)}
                      className="mt-4 w-full rounded-xl border border-[#e5a13a]/20 bg-[#e5a13a]/10 py-2.5 text-[10px] font-black text-[#f0ad43] transition hover:bg-[#e5a13a] hover:text-[#17120b]"
                    >
                      + Add to Cart
                    </button>

                  </div>

                </div>
              ))}

            </div>
          )}

          {/* EMPTY */}
          {!loading && !error && popularFoods.length === 0 && (
            <div className="rounded-3xl border border-white/10 bg-[#11100f]/75 px-6 py-16 text-center">

              <div className="text-6xl">
                🍽️
              </div>

              <h3 className="mt-5 text-xl font-bold text-white">
                No food available
              </h3>

              <p className="mt-2 text-sm text-[#77726a]">
                Restaurant has not added any available food yet.
              </p>

              <button
                type="button"
                onClick={() => navigate("/menu")}
                className="mt-5 rounded-xl bg-[#e5a13a] px-5 py-3 text-xs font-bold text-[#17120b]"
              >
                Open Menu
              </button>

            </div>
          )}

        </section>

        {/* FOOTER */}
        <footer className="border-t border-white/10 bg-[#090807]/80 px-5 py-7 backdrop-blur-xl">

          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 text-center sm:flex-row sm:text-left">

            <div>
              <p className="text-sm font-black text-white">
                Food<span className="text-[#e5a13a]">Nest</span>
              </p>

              <p className="mt-1 text-[9px] text-[#625d56]">
                FOOD • MOOD • DELIVERY
              </p>
            </div>

            <p className="text-[10px] text-[#625d56]">
              Fresh food. Better mood. © 2026 FoodNest.
            </p>

          </div>

        </footer>

      </div>
    </div>
  );
}

export default Home;