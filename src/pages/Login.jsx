import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "../lib/supabase";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");

    if (!email || !password) {
      setError("Please enter email and password.");
      return;
    }

    setLoading(true);

    const { error: loginError } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });

    if (loginError) {
      setError(loginError.message);
      setLoading(false);
      return;
    }

    setLoading(false);
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-[#090807] px-5 py-10 text-white">
      <div className="mx-auto flex min-h-[85vh] max-w-md items-center justify-center">

        <div className="w-full rounded-[30px] border border-white/10 bg-[#11100f] p-7 shadow-2xl sm:p-8">

          <div className="text-center">

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#e5a13a]/10 text-3xl">
              🍴
            </div>

            <p className="mt-5 text-[10px] font-black uppercase tracking-[3px] text-[#e5a13a]">
              FOODNEST
            </p>

            <h1 className="mt-2 text-3xl font-black">
              Welcome Back
            </h1>

            <p className="mt-2 text-xs text-[#777067]">
              Login to continue to FoodNest
            </p>

          </div>

          <form
            onSubmit={handleLogin}
            className="mt-8 space-y-4"
          >

            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError("");
              }}
              className="h-12 w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 text-sm outline-none placeholder:text-[#57514b] focus:border-[#e5a13a]/50"
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
              className="h-12 w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 text-sm outline-none placeholder:text-[#57514b] focus:border-[#e5a13a]/50"
            />

            {error && (
              <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-xs text-red-400">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-[#e5a13a] py-3.5 text-sm font-black text-[#17120b] transition hover:bg-[#f0ad43] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Logging in..." : "Login →"}
            </button>

          </form>

          <p className="mt-6 text-center text-xs text-[#777067]">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-bold text-[#e5a13a]"
            >
              Create Account
            </Link>
          </p>

        </div>

      </div>
    </div>
  );
}

export default Login;