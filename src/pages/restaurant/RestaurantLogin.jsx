import { useState } from "react";
import { useNavigate } from "react-router-dom";

function RestaurantLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please enter email and password.");
      return;
    }

    if (
      email === "restaurant@foodnest.com" &&
      password === "123456"
    ) {
      localStorage.setItem("restaurantLoggedIn", "true");
      navigate("/restaurant/dashboard");
    } else {
      setError("Invalid restaurant credentials.");
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#090807] px-5 py-10 text-[#f5f1e8]">

      <div className="pointer-events-none absolute left-[-120px] top-[-100px] h-80 w-80 rounded-full bg-[#e5a13a]/10 blur-[100px]" />

      <div className="pointer-events-none absolute bottom-[-120px] right-[-100px] h-80 w-80 rounded-full bg-[#e5a13a]/10 blur-[100px]" />

      <div className="relative z-10 w-full max-w-md">

        <div className="rounded-[32px] border border-white/10 bg-[#11100f]/90 p-6 shadow-2xl shadow-black/40 backdrop-blur-2xl sm:p-8">

          {/* Logo */}
          <div className="text-center">

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-[#e5a13a]/20 bg-[#e5a13a]/10 text-3xl shadow-lg shadow-[#e5a13a]/10">
              🍴
            </div>

            <p className="mt-5 text-[9px] font-black uppercase tracking-[2px] text-[#e5a13a]">
              FOODNEST
            </p>

            <h1 className="mt-1 text-2xl font-black text-white sm:text-3xl">
              Restaurant Login
            </h1>

            <p className="mt-2 text-xs leading-5 text-[#777067]">
              Manage your menu, orders and restaurant operations.
            </p>

          </div>

          {/* Login Form */}
          <form
            onSubmit={handleLogin}
            className="mt-8 space-y-5"
          >

            {/* Email */}
            <div>

              <label className="mb-2 block text-[10px] font-bold uppercase tracking-wider text-[#8b847b]">
                Restaurant Email
              </label>

              <div className="relative">

                <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm">
                  ✉️
                </span>

                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError("");
                  }}
                  placeholder="restaurant@foodnest.com"
                  className="h-12 w-full rounded-xl border border-white/10 bg-white/[0.035] pl-11 pr-4 text-xs text-white outline-none transition placeholder:text-[#514d47] focus:border-[#e5a13a]/40 focus:bg-[#e5a13a]/5"
                />

              </div>

            </div>

            {/* Password */}
            <div>

              <label className="mb-2 block text-[10px] font-bold uppercase tracking-wider text-[#8b847b]">
                Password
              </label>

              <div className="relative">

                <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm">
                  🔒
                </span>

                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError("");
                  }}
                  placeholder="Enter your password"
                  className="h-12 w-full rounded-xl border border-white/10 bg-white/[0.035] pl-11 pr-12 text-xs text-white outline-none transition placeholder:text-[#514d47] focus:border-[#e5a13a]/40 focus:bg-[#e5a13a]/5"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg text-xs text-[#716b63] transition hover:bg-white/5 hover:text-white"
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>

              </div>

            </div>

            {/* Error */}
            {error && (
              <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-[10px] font-semibold text-red-400">
                {error}
              </div>
            )}

            {/* Login Button */}
            <button
              type="submit"
              className="w-full rounded-xl bg-[#e5a13a] py-3.5 text-xs font-black text-[#17120b] shadow-lg shadow-[#e5a13a]/20 transition hover:-translate-y-0.5 hover:bg-[#f0ad43]"
            >
              Login to Dashboard →
            </button>

          </form>

          {/* Demo Credentials */}
          <div className="mt-6 rounded-xl border border-white/5 bg-white/[0.025] p-3.5 text-center">

            <p className="text-[9px] font-bold uppercase tracking-wider text-[#625d56]">
              Demo Credentials
            </p>

            <p className="mt-2 text-[10px] text-[#817a71]">
              restaurant@foodnest.com
            </p>

            <p className="mt-1 text-[10px] text-[#817a71]">
              Password: 123456
            </p>

          </div>

          {/* Back */}
          <button
            type="button"
            onClick={() => navigate("/")}
            className="mt-5 w-full text-center text-[10px] font-bold text-[#625d56] transition hover:text-[#e5a13a]"
          >
            ← Back to FoodNest
          </button>

        </div>

        <p className="mt-5 text-center text-[9px] text-[#4f4b46]">
          Restaurant access • FoodNest Kitchen
        </p>

      </div>

    </div>
  );
}

export default RestaurantLogin;