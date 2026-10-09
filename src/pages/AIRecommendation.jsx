
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { useCart } from "../context/CartContext";

const moods = [
  { name: "Surprise Me", icon: "✨", description: "Something delicious" },
  { name: "Spicy", icon: "🌶️", description: "Bring the heat" },
  { name: "Cheesy", icon: "🧀", description: "Extra comfort" },
  { name: "Healthy", icon: "🥗", description: "Feel-good food" },
  { name: "Budget", icon: "💰", description: "Under ₹150" },
];

const keywords = {
  Spicy: [
    "spicy", "chilli", "chili", "schezwan", "masala",
    "tikka", "peri peri", "hot", "manchurian"
  ],
  Cheesy: [
    "cheese", "pizza", "burger", "paneer", "sandwich",
    "melt", "loaded"
  ],
  Healthy: [
    "salad", "grilled", "healthy", "steamed", "sprouts",
    "vegetable", "veggie", "light"
  ],
};

function getScore(food, mood) {
  const text =
    `${food.name || ""} ${food.description || ""} ${food.category || ""}`
      .toLowerCase();

  if (mood === "Budget") {
    return Number(food.price) <= 150 ? 2 : 0;
  }

  if (mood === "Surprise Me") return 1;

  return keywords[mood]?.some((word) => text.includes(word)) ? 2 : 0;
}

function AIRecommendation() {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [foods, setFoods] = useState([]);
  const [mood, setMood] = useState("Surprise Me");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    async function loadFoods() {
      setLoading(true);
      setError("");

      const { data, error: fetchError } = await supabase
        .from("foods")
        .select("*")
        .eq("available", true);

      if (!active) return;

      if (fetchError) {
        setError("Food menu load zala nahi. Please try again.");
        setFoods([]);
      } else {
        setFoods(data || []);
      }

      setLoading(false);
    }

    loadFoods();

    return () => {
      active = false;
    };
  }, []);

  const recommendations = useMemo(() => {
    const searchedFoods = foods.filter((food) => {
      const text =
        `${food.name || ""} ${food.category || ""} ${food.description || ""}`
          .toLowerCase();

      return text.includes(search.toLowerCase().trim());
    });

    return searchedFoods
      .map((food) => ({ ...food, smartScore: getScore(food, mood) }))
      .filter((food) => food.smartScore > 0)
      .sort((a, b) => {
        if (b.smartScore !== a.smartScore) {
          return b.smartScore - a.smartScore;
        }

        return Number(a.price) - Number(b.price);
      })
      .slice(0, 8);
  }, [foods, mood, search]);

  const descriptions = {
    "Surprise Me": "Let us find something delicious for you.",
    Spicy: "Flavour-packed dishes for your spicy cravings.",
    Cheesy: "Comfort food for your cheesy mood.",
    Healthy: "Explore lighter choices from our menu.",
    Budget: "Delicious choices priced at ₹150 or less.",
  };

  return (
    <main className="min-h-screen bg-[#090807] px-4 py-8 text-white sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-3xl border border-[#e5a13a]/20 bg-gradient-to-br from-[#241a0d] via-[#17120c] to-[#100e0b] p-6 sm:p-10">
          <div className="pointer-events-none absolute -right-12 -top-16 h-56 w-56 rounded-full bg-[#e5a13a]/10 blur-3xl" />

          <div className="relative max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#e5a13a]/30 bg-[#e5a13a]/10 px-3 py-1.5 text-xs font-bold text-[#f0ad43]">
              ✦ FOODNEST SMART PICKS
            </span>

            <h1 className="mt-5 text-3xl font-black leading-tight sm:text-5xl">
              Your mood.
              <br />
              <span className="text-[#e5a13a]">Your next favourite meal.</span>
            </h1>

            <p className="mt-4 max-w-lg text-sm leading-6 text-[#b3aaa0] sm:text-base">
              Tell us what you're craving. Discover dishes selected from
              the FoodNest menu to match your taste.
            </p>
          </div>
        </div>

        <section className="mt-9">
          <p className="text-xs font-bold uppercase tracking-[2px] text-[#a39a8f]">
            STEP 01 — PICK YOUR MOOD
          </p>

          <h2 className="mt-2 text-xl font-bold sm:text-2xl">
            What sounds good right now?
          </h2>

          <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {moods.map((item) => {
              const selected = mood === item.name;

              return (
                <button
                  key={item.name}
                  type="button"
                  onClick={() => setMood(item.name)}
                  className={`rounded-2xl border p-4 text-left transition ${
                    selected
                      ? "border-[#e5a13a] bg-[#e5a13a]/10 shadow-lg shadow-[#e5a13a]/5"
                      : "border-white/10 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.06]"
                  }`}
                >
                  <span className="text-2xl">{item.icon}</span>
                  <p className={`mt-3 text-sm font-bold ${
                    selected ? "text-[#f0ad43]" : "text-white"
                  }`}>
                    {item.name}
                  </p>
                  <p className="mt-1 text-xs text-[#938b81]">
                    {item.description}
                  </p>
                </button>
              );
            })}
          </div>
        </section>

        <section className="mt-10">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[2px] text-[#e5a13a]">
                STEP 02 — YOUR MATCHES
              </p>
              <h2 className="mt-2 text-2xl font-black sm:text-3xl">
                Recommended for you
              </h2>
              <p className="mt-2 text-sm text-[#968e84]">
                {descriptions[mood]}
              </p>
            </div>

            <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2.5 sm:w-72">
              <span>⌕</span>
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search dishes..."
                className="w-full bg-transparent text-sm text-white outline-none placeholder:text-[#756e65]"
              />
            </div>
          </div>

          {loading ? (
            <div className="mt-8 rounded-2xl border border-white/10 p-10 text-center text-sm text-[#aaa198]">
              Finding your favourites...
            </div>
          ) : error ? (
            <div className="mt-8 rounded-2xl border border-red-500/20 p-8 text-center">
              <p className="text-sm text-red-300">{error}</p>
              <button
                type="button"
                onClick={() => window.location.reload()}
                className="mt-4 rounded-xl bg-[#e5a13a] px-5 py-2.5 text-sm font-bold text-black"
              >
                Try Again
              </button>
            </div>
          ) : recommendations.length === 0 ? (
            <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.02] px-5 py-12 text-center">
              <span className="text-4xl">🍽️</span>
              <h3 className="mt-4 text-lg font-bold">No matching dishes yet</h3>
              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#968e84]">
                Try another mood or check the available items in the restaurant
                menu.
              </p>
              <button
                type="button"
                onClick={() => {
                  setMood("Surprise Me");
                  setSearch("");
                }}
                className="mt-5 rounded-xl bg-[#e5a13a] px-5 py-3 text-sm font-bold text-[#17120b]"
              >
                Show all picks
              </button>
            </div>
          ) : (
            <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {recommendations.map((food) => (
                <article
                  key={food.id}
                  className="group overflow-hidden rounded-2xl border border-white/10 bg-[#12110f] transition hover:-translate-y-1 hover:border-[#e5a13a]/40"
                >
                  <button
                    type="button"
                    onClick={() => navigate(`/food/${food.id}`)}
                    className="block w-full text-left"
                  >
                    <div className="relative flex h-48 items-center justify-center overflow-hidden bg-gradient-to-br from-[#302416] to-[#17130e]">
                      <span className="text-5xl">🍛</span>

                      {food.image_url && (
                        <img
                          src={food.image_url}
                          alt={food.name}
                          loading="lazy"
                          onError={(e) => {
                            e.currentTarget.style.display = "none";
                          }}
                          className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105"
                        />
                      )}

                      <span className="absolute left-3 top-3 rounded-full border border-[#e5a13a]/30 bg-black/70 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#f0ad43]">
                        ✦ Smart pick
                      </span>
                    </div>

                    <div className="p-4">
                      <p className="text-[10px] font-bold uppercase tracking-[1.5px] text-[#e5a13a]">
                        {food.category || "FOODNEST MENU"}
                      </p>
                      <h3 className="mt-2 line-clamp-1 text-lg font-bold">
                        {food.name}
                      </h3>
                      <p className="mt-2 line-clamp-2 min-h-10 text-xs leading-5 text-[#968e84]">
                        {food.description || "A delicious pick from FoodNest."}
                      </p>
                    </div>
                  </button>

                  <div className="flex items-center justify-between gap-2 px-4 pb-4">
                    <p className="text-lg font-black text-white">
                      ₹{Number(food.price).toFixed(0)}
                    </p>
                    <button
                      type="button"
                      onClick={() => addToCart(food)}
                      className="rounded-xl bg-[#e5a13a] px-4 py-2.5 text-xs font-black text-[#17120b] transition hover:bg-[#f4b64f]"
                    >
                      + Add
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        <div className="mt-10 rounded-2xl border border-white/10 bg-white/[0.02] p-5 sm:p-6">
          <p className="text-sm font-bold text-white">
            ✦ How FoodNest Smart Picks work
          </p>
          <p className="mt-2 text-sm leading-6 text-[#968e84]">
            Recommendations currently use your selected mood, dish names,
            descriptions, categories and prices. Personalised AI using customer
            preferences and order history can be added as a further enhancement.
          </p>
        </div>
      </div>
    </main>
  );
}

export default AIRecommendation;
