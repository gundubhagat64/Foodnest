import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import heroImage from "../assets/foodnest-hero.png.png";

const categories = [
  { name: "Pizza", icon: "🍕" },
  { name: "Burgers", icon: "🍔" },
  { name: "Biryani", icon: "🍗" },
  { name: "Chinese", icon: "🍜" },
  { name: "Healthy", icon: "🥗" },
  { name: "Desserts", icon: "🍰" },
];

const popularFoods = [
  {
    id: 1,
    name: "Chicken Biryani",
    price: 249,
    rating: "4.8",
    time: "25 min",
    category: "Biryani",
    description: "Aromatic basmati rice with tender chicken",
    image: "🍗",
  },
  {
    id: 2,
    name: "Farmhouse Pizza",
    price: 299,
    rating: "4.7",
    time: "30 min",
    category: "Pizza",
    description: "Loaded with fresh vegetables and cheese",
    image: "🍕",
  },
  {
    id: 3,
    name: "Classic Burger",
    price: 199,
    rating: "4.6",
    time: "20 min",
    category: "Burger",
    description: "Crispy patty with fresh veggies",
    image: "🍔",
  },
];

function Home() {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0d0b09] text-[#f5f1e8]">

      {/* FULL PAGE FOOD BACKGROUND */}
      <div
        className="pointer-events-none fixed inset-0 z-0 bg-cover bg-center opacity-35 blur-[3px] scale-105"
        style={{
          backgroundImage: `url(${heroImage})`,
        }}
      />

      {/* DARK OVERLAY */}
      <div className="pointer-events-none fixed inset-0 z-0 bg-gradient-to-r from-[#080706]/95 via-[#0b0908]/80 to-[#0b0908]/55" />

      {/* TOP/BOTTOM OVERLAY */}
      <div className="pointer-events-none fixed inset-0 z-0 bg-gradient-to-b from-[#080706]/70 via-transparent to-[#0d0b09]/95" />

      {/* WARM GLOW */}
      <div className="pointer-events-none fixed right-[-150px] top-[15%] z-0 h-[500px] w-[500px] rounded-full bg-[#e59a32]/10 blur-[120px]" />

      {/* ALL CONTENT */}
      <div className="relative z-10">

        {/* HERO */}
        <section className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-5 py-14 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-6 lg:py-20">

          <div className="relative z-10">

            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#e5a13a]/30 bg-[#18130e]/70 px-4 py-2 text-xs font-semibold text-[#f2b44f] backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-[#f2b44f]" />
              Fresh food • Fast delivery
            </div>

            <h1 className="max-w-3xl text-5xl font-black leading-[0.95] tracking-[-2px] sm:text-6xl lg:text-7xl">
              Crave it.
              <br />
              <span className="bg-gradient-to-r from-[#f0a52f] via-[#ffbd4d] to-[#ffe0a0] bg-clip-text text-transparent">
                We’ll bring it.
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-sm leading-7 text-[#c0bbb2] sm:text-base">
              Delicious meals from FoodNest Kitchen, freshly prepared
              and delivered straight to your doorstep.
            </p>

            {/* SEARCH */}
            <div className="mt-8 flex h-14 w-full max-w-xl items-center rounded-2xl border border-white/15 bg-[#15120f]/75 p-1.5 shadow-2xl shadow-black/60 backdrop-blur-xl focus-within:border-[#e5a13a]/40">

              <span className="pl-4 text-xl text-[#858078]">
                ⌕
              </span>

              <input
                type="text"
                placeholder="What are you craving today?"
                className="min-w-0 flex-1 bg-transparent px-3 text-sm text-white outline-none placeholder:text-[#777168]"
              />

              <button
                onClick={() => navigate("/menu")}
                className="h-11 rounded-xl bg-[#e5a13a] px-6 text-xs font-bold text-[#17120b] transition hover:bg-[#ffc15a] hover:shadow-lg hover:shadow-[#e5a13a]/20"
              >
                Find Food
              </button>

            </div>

            {/* ACTIONS */}
            <div className="mt-4 flex flex-col gap-3 sm:flex-row">

              <button
                onClick={() => navigate("/ai")}
                className="rounded-xl border border-[#e5a13a]/30 bg-[#18130e]/70 px-5 py-3 text-sm font-semibold text-[#f0b34e] backdrop-blur-md transition hover:-translate-y-1 hover:bg-[#e5a13a]/15"
              >
                ✦ Ask FoodNest AI
              </button>

              <button
                onClick={() => navigate("/menu")}
                className="rounded-xl border border-white/10 bg-[#151412]/65 px-5 py-3 text-sm font-semibold text-[#aaa49a] backdrop-blur-md transition hover:-translate-y-1 hover:border-white/20 hover:text-white"
              >
                Today's Picks
              </button>

            </div>

            {/* TRUST */}
            <div className="mt-8 flex flex-wrap gap-5 text-xs text-[#9b958b]">
              <span>✓ Freshly prepared</span>
              <span>✓ Fast delivery</span>
              <span>✓ Secure payment</span>
            </div>

          </div>

          {/* RIGHT FOOD VISUAL */}
          <div className="relative mx-auto flex h-[350px] w-full max-w-[420px] items-center justify-center sm:h-[410px]">

            <div className="absolute h-[285px] w-[285px] rounded-full border border-[#e5a13a]/15 bg-[#17120e]/60 shadow-2xl shadow-black/70 backdrop-blur-sm sm:h-[330px] sm:w-[330px]" />

            <div className="absolute h-[225px] w-[225px] rounded-full border border-[#e5a13a]/15 bg-[#201a13]/60 shadow-2xl backdrop-blur-sm sm:h-[265px] sm:w-[265px]" />

            <div className="relative z-10 flex h-48 w-48 items-center justify-center rounded-full border border-[#e5a13a]/20 bg-gradient-to-br from-[#3a2a19]/90 to-[#15110d]/90 text-[95px] shadow-[0_30px_80px_rgba(0,0,0,0.75)] backdrop-blur-md sm:h-60 sm:w-60 sm:text-[115px]">
              🍛
            </div>

            {/* RATING */}
            <div className="absolute left-0 top-8 z-20 rounded-2xl border border-white/10 bg-[#171411]/90 px-3 py-2.5 shadow-xl backdrop-blur-xl sm:left-2">

              <div className="flex items-center gap-2">

                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#302318] text-lg">
                  ⭐
                </span>

                <div>
                  <p className="text-xs font-bold text-white">
                    4.8 Rating
                  </p>

                  <p className="text-[10px] text-[#716b61]">
                    Loved by foodies
                  </p>
                </div>

              </div>

            </div>

            {/* DELIVERY */}
            <div className="absolute bottom-7 right-0 z-20 rounded-2xl border border-white/10 bg-[#171411]/90 px-3 py-2.5 shadow-xl backdrop-blur-xl sm:right-2">

              <div className="flex items-center gap-2">

                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#302318] text-lg">
                  🛵
                </span>

                <div>
                  <p className="text-xs font-bold text-white">
                    25 min
                  </p>

                  <p className="text-[10px] text-[#716b61]">
                    Quick delivery
                  </p>
                </div>

              </div>

            </div>

          </div>

        </section>

        {/* CATEGORIES */}
        <section className="relative mx-auto max-w-7xl px-5 py-10 sm:px-8">

          <div className="mb-7 flex items-end justify-between">

            <div>
              <p className="text-[10px] font-bold tracking-[2px] text-[#b0782f]">
                EXPLORE
              </p>

              <h2 className="mt-2 text-2xl font-bold sm:text-3xl">
                What are you craving?
              </h2>
            </div>

            <button
              onClick={() => navigate("/menu")}
              className="hidden text-xs font-semibold text-[#e5a13a] sm:block"
            >
              View all →
            </button>

          </div>

          <div className="grid grid-cols-3 gap-3 sm:grid-cols-6 sm:gap-4">

            {categories.map((category) => (

              <button
                key={category.name}
                onClick={() => navigate("/menu")}
                className="group text-center"
              >

                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-white/10 bg-[#171411]/75 text-3xl shadow-lg shadow-black/30 backdrop-blur-md transition duration-300 group-hover:-translate-y-2 group-hover:border-[#e5a13a]/40 group-hover:bg-[#e5a13a]/10 sm:h-24 sm:w-24 sm:text-4xl">
                  {category.icon}
                </div>

                <p className="mt-3 text-xs font-semibold text-[#aaa49a] transition group-hover:text-white">
                  {category.name}
                </p>

              </button>

            ))}

          </div>

        </section>

        {/* AI SECTION */}
        <section className="relative mx-auto my-12 max-w-6xl px-5 sm:px-8">

          <div className="relative overflow-hidden rounded-3xl border border-[#e5a13a]/20 bg-[#1b1510]/80 p-6 shadow-2xl shadow-black/50 backdrop-blur-xl sm:p-9">

            <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#e5a13a]/10 blur-3xl" />

            <div className="relative grid items-center gap-8 lg:grid-cols-2">

              <div>

                <div className="flex items-start gap-4">

                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-[#e5a13a]/25 bg-[#e5a13a]/10 text-xl text-[#f0b34e]">
                    ✦
                  </div>

                  <div>

                    <p className="text-[10px] font-bold tracking-[2px] text-[#d6a04a]">
                      FOODNEST AI
                    </p>

                    <h2 className="mt-2 text-2xl font-black sm:text-3xl">
                      Your personal food assistant.
                    </h2>

                    <p className="mt-3 max-w-md text-xs leading-6 text-[#918b81]">
                      Tell us what you're in the mood for and AI will
                      help you discover the perfect meal.
                    </p>

                  </div>

                </div>

                <button
                  onClick={() => navigate("/ai")}
                  className="mt-6 rounded-xl bg-[#e5a13a] px-5 py-3 text-xs font-bold text-[#17120b] transition hover:bg-[#ffc15a] hover:shadow-lg hover:shadow-[#e5a13a]/20"
                >
                  Ask FoodNest AI →
                </button>

              </div>

              <div className="space-y-2">

                {[
                  ["🌶️", "Something spicy", "Try our Chicken Biryani"],
                  ["🧀", "Cheesy mood", "Farmhouse Pizza sounds perfect"],
                  ["🥗", "Light & healthy", "Fresh meals for you"],
                ].map(([icon, title, text]) => (

                  <button
                    key={title}
                    onClick={() => navigate("/ai")}
                    className="flex w-full items-center gap-3 rounded-xl border border-white/10 bg-black/25 p-3 text-left transition hover:-translate-x-1 hover:border-[#e5a13a]/30 hover:bg-black/35"
                  >

                    <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 text-lg">
                      {icon}
                    </span>

                    <div>

                      <p className="text-xs font-bold text-white">
                        {title}
                      </p>

                      <p className="mt-1 text-[10px] text-[#706a61]">
                        {text}
                      </p>

                    </div>

                  </button>

                ))}

              </div>

            </div>

          </div>

        </section>

        {/* POPULAR FOOD */}
        <section className="relative mx-auto max-w-7xl px-5 pb-20 sm:px-8">

          <div className="mb-7 flex items-end justify-between">

            <div>

              <p className="text-[10px] font-bold tracking-[2px] text-[#b0782f]">
                FOODNEST KITCHEN
              </p>

              <h2 className="mt-2 text-2xl font-bold sm:text-3xl">
                Popular today
              </h2>

            </div>

            <button
              onClick={() => navigate("/menu")}
              className="text-xs font-semibold text-[#e5a13a]"
            >
              Full menu →
            </button>

          </div>

          <div className="grid gap-5 md:grid-cols-3">

            {popularFoods.map((food) => (

              <div
                key={food.id}
                className="group overflow-hidden rounded-2xl border border-white/10 bg-[#171512]/90 shadow-xl shadow-black/40 backdrop-blur-md transition duration-300 hover:-translate-y-2 hover:border-[#e5a13a]/25"
              >

                <div className="relative flex h-48 items-center justify-center bg-gradient-to-br from-[#302217] to-[#181512]">

                  <span className="text-7xl transition duration-300 group-hover:scale-110 group-hover:-rotate-3">
                    {food.image}
                  </span>

                  <button
                    type="button"
                    className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-black/35 text-lg backdrop-blur-md transition hover:border-[#e5a13a]/40 hover:text-[#e2b45a]"
                  >
                    ♡
                  </button>

                  <span className="absolute bottom-3 left-3 rounded-lg border border-white/10 bg-[#11100f]/90 px-2.5 py-1.5 text-[10px] font-bold text-[#c8c2b7] backdrop-blur-md">
                    ✦ Popular
                  </span>

                </div>

                <div className="p-4">

                  <div className="flex items-center justify-between gap-3">

                    <div>

                      <h3 className="text-base font-bold text-white">
                        {food.name}
                      </h3>

                      <p className="mt-1 text-[10px] text-[#666159]">
                        {food.category}
                      </p>

                    </div>

                    <span className="rounded-md bg-[#36543d] px-2 py-1 text-[10px] font-bold text-[#d9eadc]">
                      ★ {food.rating}
                    </span>

                  </div>

                  <p className="mt-3 text-xs leading-5 text-[#777168]">
                    {food.description}
                  </p>

                  <div className="mt-4 flex items-center justify-between">

                    <div>

                      <span className="text-lg font-bold text-white">
                        ₹{food.price}
                      </span>

                      <span className="ml-1 text-[10px] text-[#625d55]">
                        • {food.time}
                      </span>

                    </div>

                    <button
                      onClick={() => addToCart(food)}
                      className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#e5a13a] text-xl font-light text-[#17120b] transition hover:scale-105 hover:bg-[#ffc15a]"
                    >
                      +
                    </button>

                  </div>

                </div>

              </div>

            ))}

          </div>

        </section>

      </div>
    </div>
  );
}

export default Home;