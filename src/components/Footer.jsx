import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#11100f] px-5 py-8 text-white sm:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-black">
            Food<span className="text-[#e5a13a]">Nest</span>
          </h2>
          <p className="mt-2 text-xs text-[#817a71]">
            Food • Mood • Delivery
          </p>
        </div>

        <div className="flex flex-wrap gap-5 text-sm text-[#aaa39a]">
          <Link to="/" className="hover:text-[#e5a13a]">
            Home
          </Link>
          <Link to="/menu" className="hover:text-[#e5a13a]">
            Menu
          </Link>
          <Link to="/ai" className="hover:text-[#e5a13a]">
            AI Recommendations
          </Link>
          <Link to="/cart" className="hover:text-[#e5a13a]">
            Cart
          </Link>
        </div>
      </div>

      <div className="mx-auto mt-7 max-w-7xl border-t border-white/10 pt-5 text-center text-xs text-[#686159]">
        © {new Date().getFullYear()} FoodNest. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;