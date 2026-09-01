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
    id: 1,
    name: "Chicken Biryani",
    description: "Aromatic basmati rice with tender chicken",
    price: 249,
    rating: "4.8",
    time: "25 min",
    icon: "🍗",
  },
  {
    id: 2,
    name: "Farmhouse Pizza",
    description: "Loaded with fresh veggies and melted cheese",
    price: 299,
    rating: "4.7",
    time: "30 min",
    icon: "🍕",
  },
  {
    id: 3,
    name: "Classic Burger",
    description: "Crispy patty with fresh veggies and sauce",
    price: 199,
    rating: "4.6",
    time: "20 min",
    icon: "🍔",
  },
];

function Home() {
  return (
    <div className="home">

      {/* HERO */}
      <section className="hero-new">
        <div className="hero-new-content">

          <div className="hero-new-badge">
            ✦ Freshly made for you
          </div>

          <h1>
            Crave it.
            <br />
            <span>We'll bring it.</span>
          </h1>

          <p>
            Delicious food from FoodNest Kitchen,
            <br />
            prepared fresh and delivered fast.
          </p>

          {/* SEARCH */}
          <div className="modern-search">
            <span>⌕</span>

            <input
              type="text"
              placeholder="What are you craving today?"
            />

            <button>Find Food</button>
          </div>

          <div className="hero-actions">
            <button className="ai-quick-btn">
              🤖 Ask FoodNest AI
            </button>

            <button className="discover-btn">
              🔥 Today's Picks
            </button>
          </div>

        </div>

        {/* HERO FOOD VISUAL */}
        <div className="hero-food-visual">

          <div className="hero-circle"></div>

          <div className="floating-card card-rating">
            <span>★</span>
            <div>
              <strong>4.8</strong>
              <small>Top rated</small>
            </div>
          </div>

          <div className="main-food-visual">
            🍛
          </div>

          <div className="floating-card card-delivery">
            <span>⚡</span>
            <div>
              <strong>25 min</strong>
              <small>Fast delivery</small>
            </div>
          </div>

        </div>
      </section>

      {/* CATEGORY */}
      <section className="category-section">

        <div className="category-heading">
          <div>
            <span>EXPLORE MENU</span>
            <h2>What are you in the mood for?</h2>
          </div>

          <button className="scroll-arrow">
            →
          </button>
        </div>

        <div className="category-list">

          {categories.map((category) => (
            <div
              className="category-item"
              key={category.name}
            >
              <div className="category-circle">
                {category.icon}
              </div>

              <span>{category.name}</span>
            </div>
          ))}

        </div>

      </section>

      {/* AI SECTION */}
      <section className="ai-modern">

        <div className="ai-modern-left">

          <div className="ai-logo">
            🤖
          </div>

          <div>
            <span className="ai-small-title">
              FOODNEST AI
            </span>

            <h2>
              Your personal
              <br />
              food assistant.
            </h2>

            <p>
              Not sure what to eat? Tell FoodNest AI
              your mood, budget or craving.
            </p>

            <button className="ai-modern-button">
              Find my perfect meal ✨
            </button>
          </div>

        </div>

        <div className="ai-suggestions">

          <div className="suggestion-card">
            <span>🌶️</span>
            <div>
              <strong>Something spicy</strong>
              <small>Try Chicken Biryani</small>
            </div>
          </div>

          <div className="suggestion-card">
            <span>🥗</span>
            <div>
              <strong>Something healthy</strong>
              <small>Try our Healthy Bowl</small>
            </div>
          </div>

          <div className="suggestion-card">
            <span>💰</span>
            <div>
              <strong>Under ₹300</strong>
              <small>Best value meals</small>
            </div>
          </div>

        </div>

      </section>

      {/* POPULAR FOOD */}
      <section className="food-section">

        <div className="food-section-heading">

          <div>
            <span>FOODNEST KITCHEN</span>
            <h2>Popular today 🔥</h2>
          </div>

          <button className="view-menu-btn">
            View full menu →
          </button>

        </div>

        <div className="modern-food-grid">

          {popularFoods.map((food) => (

            <div
              className="modern-food-card"
              key={food.id}
            >

              <div className="modern-food-image">

                <div className="food-emoji">
                  {food.icon}
                </div>

                <button className="modern-heart">
                  ♡
                </button>

                <span className="popular-tag">
                  🔥 Popular
                </span>

              </div>

              <div className="modern-food-info">

                <div className="modern-food-title">

                  <h3>{food.name}</h3>

                  <span className="modern-rating">
                    ★ {food.rating}
                  </span>

                </div>

                <p>
                  {food.description}
                </p>

                <div className="modern-food-footer">

                  <div>
                    <strong>₹{food.price}</strong>
                    <span> • {food.time}</span>
                  </div>

                  <button className="modern-add-btn">
                    +
                  </button>

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