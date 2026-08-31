function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">
        <span>🍴</span> FoodNest
      </div>

      <div className="location">
        <span>📍</span>
        <div>
          <small>Deliver to</small>
          <p>Choose your location ▾</p>
        </div>
      </div>

      <div className="nav-actions">
        <button className="nav-btn">🔍 Search</button>
        <button className="nav-btn">🛒 Cart</button>
        <button className="profile-btn">👤</button>
      </div>
    </nav>
  );
}

export default Navbar;