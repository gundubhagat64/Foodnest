const categories = [
  { icon: "🍕", name: "Pizza" },
  { icon: "🍔", name: "Burgers" },
  { icon: "🍗", name: "Biryani" },
  { icon: "🍜", name: "Chinese" },
  { icon: "🥗", name: "Healthy" },
  { icon: "🍰", name: "Desserts" },
];

const popularFoods = [
  {
    name: "Chicken Biryani",
    description: "Aromatic basmati rice with tender chicken",
    price: "₹249",
    rating: "4.8",
    time: "25 min",
    icon: "🍗",
  },
  {
    name: "Farmhouse Pizza",
    description: "Loaded with fresh veggies and cheese",
    price: "₹299",
    rating: "4.7",
    time: "30 min",
    icon: "🍕",
  },
  {
    name: "Classic Burger",
    description: "Crispy patty with fresh veggies",
    price: "₹199",
    rating: "4.6",
    time: "20 min",
    icon: "🍔",
  },
];

function Home() {
  return (
    <div className="home">

      {/* HERO */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-badge">
            ✨ Your food. Your way.
          </div>

          <h1>
            Good food,
            <br />
            <span>good mood.</span> 😋
          </h1>

          <p>
            Discover delicious food from FoodNest Kitchen,
            <br />
            made fresh and delivered to your doorstep.
          </p>

          {/* SEARCH */}
          <div className="search-box">
            <span>🔍</span>
            <input
              type="text"
              placeholder="Search for dishes, cravings..."
            />
            <button>Search</button>
          </div>

          <div className="quick-options">
            <button>🔥 Popular</button>
            <button>🥗 Healthy</button>
            <button>⚡ Fast Delivery</button>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="section">
        <div className="section-heading">
          <div>
            <small>EXPLORE</small>
            <h2>What are you craving?</h2>
          </div>
        </div>

        <div className="categories">
          {categories.map((category) => (
            <div className="category-card" key={category.name}>
              <div className="category-icon">{category.icon}</div>
              <h3>{category.name}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* AI */}
      <section className="ai-section">
        <div className="ai-content">
          <div className="ai-icon">🤖</div>

          <div>
            <span className="ai-label">FOODNEST AI</span>

            <h2>
              Don't know what to eat?
            </h2>

            <p>
              Tell us your mood, budget or craving.
              Our AI will find the perfect food for you.
            </p>

            <button className="ai-button">
              ✨ Get AI Recommendation
            </button>
          </div>
        </div>

        <div className="ai-food">
          🍕
          <span>+</span>
          🍗
          <span>+</span>
          🥤
        </div>
      </section>

      {/* POPULAR FOOD */}
      <section className="section">
        <div className="section-heading">
          <div>
            <small>FOODNEST KITCHEN</small>
            <h2>Popular right now 🔥</h2>
          </div>

          <button className="view-all">
            View all →
          </button>
        </div>

        <div className="food-grid">
          {popularFoods.map((food) => (
            <div className="food-card" key={food.name}>

              <div className="food-image">
                <span>{food.icon}</span>
                <button className="heart">♡</button>
              </div>

              <div className="food-info">
                <div className="food-title">
                  <h3>{food.name}</h3>
                  <span className="rating">
                    ★ {food.rating}
                  </span>
                </div>

                <p>{food.description}</p>

                <div className="food-bottom">
                  <strong>{food.price}</strong>
                  <span>⏱ {food.time}</span>
                  <button className="add-btn">+</button>
                </div>
              </div>

            </div>
          ))}
        </div>
      </section>

    </div>
  );
}

export default Home;