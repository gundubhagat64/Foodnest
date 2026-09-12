import { useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { cartCount } = useCart();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-[#11100f]/85 shadow-lg shadow-black/20 backdrop-blur-xl">

      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 sm:px-8">

        {/* LOGO */}
        <button
          type="button"
          onClick={() => navigate("/")}
          className="group flex items-center gap-3"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#e5a13a]/25 bg-[#e5a13a]/10 text-xl shadow-lg shadow-[#e5a13a]/5 transition group-hover:scale-105">
            🍴
          </span>

          <div className="text-left">
            <p className="text-lg font-black tracking-tight text-white">
              Food<span className="text-[#e5a13a]">Nest</span>
            </p>

            <p className="hidden text-[8px] font-semibold tracking-[2px] text-[#716c64] sm:block">
              FOOD • MOOD • DELIVERY
            </p>
          </div>
        </button>

        {/* DESKTOP NAV */}
        <div className="hidden items-center gap-1 md:flex">

          <button
            type="button"
            onClick={() => navigate("/")}
            className={
              isActive("/")
                ? "rounded-xl bg-white/[0.07] px-4 py-2.5 text-xs font-bold text-[#f0ad43]"
                : "rounded-xl px-4 py-2.5 text-xs font-semibold text-[#8e8981] transition hover:bg-white/[0.04] hover:text-white"
            }
          >
            Home
          </button>

          <button
            type="button"
            onClick={() => navigate("/menu")}
            className={
              isActive("/menu")
                ? "rounded-xl bg-white/[0.07] px-4 py-2.5 text-xs font-bold text-[#f0ad43]"
                : "rounded-xl px-4 py-2.5 text-xs font-semibold text-[#8e8981] transition hover:bg-white/[0.04] hover:text-white"
            }
          >
            Menu
          </button>

          <button
            type="button"
            onClick={() => navigate("/ai")}
            className={
              isActive("/ai")
                ? "rounded-xl bg-[#e5a13a]/10 px-4 py-2.5 text-xs font-bold text-[#f0ad43]"
                : "rounded-xl px-4 py-2.5 text-xs font-semibold text-[#8e8981] transition hover:bg-white/[0.04] hover:text-white"
            }
          >
            <span className="mr-1">✦</span>
            AI
          </button>

          <button
            type="button"
            onClick={() => navigate("/orders")}
            className={
              isActive("/orders")
                ? "rounded-xl bg-white/[0.07] px-4 py-2.5 text-xs font-bold text-[#f0ad43]"
                : "rounded-xl px-4 py-2.5 text-xs font-semibold text-[#8e8981] transition hover:bg-white/[0.04] hover:text-white"
            }
          >
            Orders
          </button>

        </div>

        {/* ACTIONS */}
        <div className="flex items-center gap-2">

          {/* CART */}
          <button
            type="button"
            onClick={() => navigate("/cart")}
            className="relative flex h-10 items-center gap-2 rounded-xl border border-white/10 bg-white/[0.035] px-3 text-[#aaa49b] transition hover:border-[#e5a13a]/30 hover:bg-[#e5a13a]/10 hover:text-white"
          >

            <span className="text-lg">
              🛒
            </span>

            <span className="hidden text-xs font-semibold sm:block">
              Cart
            </span>

            {cartCount > 0 && (
              <span className="absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#e5a13a] px-1 text-[9px] font-black text-[#17120b] shadow-lg shadow-[#e5a13a]/20">
                {cartCount}
              </span>
            )}

          </button>

          {/* PROFILE */}
          <button
            type="button"
            onClick={() => navigate("/profile")}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.035] text-lg text-[#aaa49b] transition hover:border-[#e5a13a]/30 hover:bg-[#e5a13a]/10 hover:text-white"
          >
            👤
          </button>

        </div>

      </div>

      {/* MOBILE NAV */}
      <div className="border-t border-white/5 bg-[#151412]/95 md:hidden">

        <div className="mx-auto flex max-w-md items-center justify-around px-2 py-2">

          <button
            type="button"
            onClick={() => navigate("/")}
            className={
              isActive("/")
                ? "flex min-w-[65px] flex-col items-center gap-1 text-[#e5a13a]"
                : "flex min-w-[65px] flex-col items-center gap-1 text-[#716c64]"
            }
          >
            <span className="text-base">⌂</span>
            <span className="text-[9px] font-semibold">Home</span>
          </button>

          <button
            type="button"
            onClick={() => navigate("/menu")}
            className={
              isActive("/menu")
                ? "flex min-w-[65px] flex-col items-center gap-1 text-[#e5a13a]"
                : "flex min-w-[65px] flex-col items-center gap-1 text-[#716c64]"
            }
          >
            <span className="text-base">🍽️</span>
            <span className="text-[9px] font-semibold">Menu</span>
          </button>

          <button
            type="button"
            onClick={() => navigate("/ai")}
            className={
              isActive("/ai")
                ? "flex min-w-[65px] flex-col items-center gap-1 text-[#e5a13a]"
                : "flex min-w-[65px] flex-col items-center gap-1 text-[#716c64]"
            }
          >
            <span className="text-base">✦</span>
            <span className="text-[9px] font-semibold">AI</span>
          </button>

          <button
            type="button"
            onClick={() => navigate("/orders")}
            className={
              isActive("/orders")
                ? "flex min-w-[65px] flex-col items-center gap-1 text-[#e5a13a]"
                : "flex min-w-[65px] flex-col items-center gap-1 text-[#716c64]"
            }
          >
            <span className="text-base">📦</span>
            <span className="text-[9px] font-semibold">Orders</span>
          </button>

        </div>

      </div>

    </nav>
  );
}

export default Navbar;