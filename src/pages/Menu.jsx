import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import heroImage from "../assets/foodnest-hero.png.png";
import { supabase } from "../lib/supabase";

const categories = [
  "All",
  "Biryani",
  "Pizza",
  "Burger",
  "Starters",
  "Chinese",
  "Desserts",
];

function Menu() {
  const [foods, setFoods] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { addToCart, cartItems } = useCart();

  // Fetch foods from Supabase
  const fetchFoods = async () => {
    setLoading(true);
    setError("");

    const { data, error: fetchError } = await supabase
      .from("foods")
      .select("*")
      .eq("available", true);

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

  // Search + category filter
  const filteredFoods = foods.filter((food) => {
    const matchesCategory =
      activeCategory === "All" ||
      food.category === activeCategory;

    const matchesSearch =
      food.name?.toLowerCase().includes(search.toLowerCase()) ||
      food.category?.toLowerCase().includes(search.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  // Cart quantity
  const getQuantity = (id) => {
    const item = cartItems.find((item) => item.id === id);
    return item ? item.quantity : 0;
  };

  return (
    <div className="min-h-screen bg-[#11100f] text-white">

      {/* HERO */}
      <section className="relative min-h-[560px] overflow-hidden">

        <div
          className="absolute inset-0 scale-105 bg-cover bg-center"
          style={{
            backgroundImage: `url(${heroImage})`,
          }}
        />

        <div className="absolute inset-0 backdrop-blur-[3px]" />

        <div className="absolute inset-0 bg-gradient-to-r from-[#090807]/95 via-[#090807]/75 to-[#090807]/35" />

        <div className="absolute inset-0 bg-gradient-to-t from-[#11100f] via-transparent to-[#090807]/40" />

        <div className="pointer-events-none absolute -right-32 top-0 h-96 w-96 rounded-full bg-[#e59a32]/15 blur-3xl" />

        <div className="relative mx-auto flex min-h-[560px] max-w-7xl items-center px-5 py-20 sm:px-8">

          <div className="max-w-2xl">

            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#e5a13a]/30 bg-[#e5a13a]/10 px-4 py-2 text-[10px] font-bold tracking-[2px] text-[#f2b44f] backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-[#f2b44f]" />
              FOODNEST KITCHEN
            </div>

            <h1 className="text-5xl font-black leading-[0.95] tracking-[-2px] sm:text-6xl lg:text-7xl">
              Good food.
              <br />
              <span className="bg-gradient-to-r from-[#f0a52f] via-[#ffbd4d] to-[#ffe0a0] bg-clip-text text-transparent">
                Better mood.
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-sm leading-7 text-[#c0bbb2] sm:text-base">
              Explore freshly prepared favourites from FoodNest Kitchen.
              Pick your craving and let us handle the rest.
            </p>

            {/* SEARCH */}
            <div className="mt-8 flex h-14 w-full max-w-xl items-center rounded-2xl border border-white/15 bg-[#1c1b19]/80 p-1.5 shadow-2xl shadow-black/60 backdrop-blur-xl">

              <span className="pl-4 text-xl text-[#858078]">
                ⌕
              </span>

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search your favourite food..."
                className="min-w-0 flex-1 bg-transparent px-3 text-sm text-white outline-none placeholder:text-[#777168]"
              />

              <button
                type="button"
                className="h-11 rounded-xl bg-[#e5a13a] px-6 text-xs font-bold text-[#17120b] transition hover:bg-[#ffc15a]"
              >
                Search
              </button>

            </div>

            {/* FEATURES */}
            <div className="mt-8 flex flex-wrap gap-6 text-xs text-[#aaa49b]">

              <div className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#e5a13a]/15">
                  🛵
                </span>
                Fast Delivery
              </div>

              <div className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#e5a13a]/15">
                  ✦
                </span>
                Freshly Prepared
              </div>

              <div className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#e5a13a]/15">
                  🛡️
                </span>
                Secure Payment
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* MENU CONTENT */}
      <main className="mx-auto max-w-7xl px-5 pb-20 sm:px-8">

        {/* HEADER */}
        <div className="flex flex-col gap-5 py-10 sm:flex-row sm:items-end sm:justify-between">

          <div>
            <p className="text-[10px] font-bold tracking-[2px] text-[#a87835]">
              OUR MENU
            </p>

            <h2 className="mt-2 text-3xl font-black sm:text-4xl">
              What are you craving?
            </h2>

            <p className="mt-2 text-xs text-[#77726a]">
              Handpicked favourites, prepared fresh for you.
            </p>
          </div>

          <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-[#1b1917] px-4 py-3 text-xs text-[#aaa49b]">
            <span className="h-2 w-2 rounded-full bg-[#e5a13a]" />
            FoodNest Kitchen
          </div>

        </div>

        {/* CATEGORY FILTER */}
        <div className="mb-9 flex gap-2 overflow-x-auto pb-2">

          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              className={
                activeCategory === category
                  ? "whitespace-nowrap rounded-xl border border-[#e5a13a] bg-[#e5a13a] px-5 py-3 text-xs font-bold text-[#17120b] shadow-lg shadow-[#e5a13a]/15"
                  : "whitespace-nowrap rounded-xl border border-white/10 bg-[#1a1917] px-5 py-3 text-xs font-semibold text-[#918c84] transition hover:border-[#e5a13a]/30 hover:text-white"
              }
            >
              {category}
            </button>
          ))}

        </div>

        {/* LOADING */}
        {loading && (
          <div className="rounded-3xl border border-white/10 bg-[#191817] px-6 py-20 text-center">

            <div className="mx-auto h-10 w-10 animate-spin rounded-full border-2 border-white/10 border-t-[#e5a13a]" />

            <p className="mt-5 text-sm font-semibold text-[#aaa49b]">
              Loading FoodNest menu...
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
              Unable to load menu
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
        {!loading && !error && filteredFoods.length > 0 && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

            {filteredFoods.map((food) => {

              const quantity = getQuantity(food.id);

              return (
                <div
                  key={food.id}
                  className="group overflow-hidden rounded-2xl border border-white/10 bg-[#191817] shadow-xl shadow-black/30 transition duration-300 hover:-translate-y-2 hover:border-[#e5a13a]/25"
                >

                  {/* FOOD IMAGE */}
                  <div className="relative flex h-60 items-center justify-center overflow-hidden bg-gradient-to-br from-[#302217] via-[#211a15] to-[#151412]">

                    <div className="absolute h-44 w-44 rounded-full bg-[#e5a13a]/10 blur-3xl transition duration-500 group-hover:bg-[#e5a13a]/20" />

                    {food.image_url ? (
                      <img
                        src={food.image_url}
                        alt={food.name}
                        className="relative z-10 h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <span className="relative z-10 text-8xl drop-shadow-2xl transition duration-500 group-hover:scale-110">
                        🍽️
                      </span>
                    )}

                    {/* HEART */}
                    <button
                      type="button"
                      className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/40 text-xl text-white backdrop-blur-md transition hover:border-[#e5a13a]/50 hover:text-[#f0b04a]"
                    >
                      ♡
                    </button>

                  </div>

                  {/* FOOD DETAILS */}
                  <div className="p-5">

                    <h3 className="text-lg font-bold text-white">
                      {food.name}
                    </h3>

                    <p className="mt-1 text-[10px] font-semibold uppercase tracking-[1px] text-[#9b7134]">
                      {food.category}
                    </p>

                    <p className="mt-3 min-h-[40px] text-xs leading-5 text-[#77726a]">
                      {food.description}
                    </p>

                    {/* PRICE + ADD */}
                    <div className="mt-5 flex items-center justify-between">

                      <div>
                        <span className="text-xl font-black text-white">
                          ₹{food.price}
                        </span>

                        <span className="ml-2 text-[10px] text-[#68635c]">
                          per serving
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() => addToCart(food)}
                        className={
                          quantity > 0
                            ? "rounded-xl border border-[#e5a13a]/40 bg-[#e5a13a]/10 px-5 py-3 text-xs font-bold text-[#f0b34e]"
                            : "rounded-xl bg-[#e5a13a] px-5 py-3 text-xs font-bold text-[#17120b] transition hover:bg-[#ffc15a] hover:shadow-lg hover:shadow-[#e5a13a]/20"
                        }
                      >
                        {quantity > 0
                          ? `✓ Added ${quantity}`
                          : "+ Add"}
                      </button>

                    </div>

                  </div>

                </div>
              );
            })}

          </div>
        )}

        {/* EMPTY STATE */}
        {!loading && !error && filteredFoods.length === 0 && (
          <div className="rounded-3xl border border-white/10 bg-[#191817] px-6 py-16 text-center">

            <div className="text-6xl">
              🍽️
            </div>

            <h3 className="mt-5 text-xl font-bold">
              No food found
            </h3>

            <p className="mt-2 text-sm text-[#77726a]">
              Try another search or category.
            </p>

            <button
              type="button"
              onClick={() => {
                setSearch("");
                setActiveCategory("All");
              }}
              className="mt-5 rounded-xl bg-[#e5a13a] px-5 py-3 text-xs font-bold text-[#17120b] transition hover:bg-[#ffc15a]"
            >
              View All Food
            </button>

          </div>
        )}

      </main>

    </div>
  );
}

export default Menu;