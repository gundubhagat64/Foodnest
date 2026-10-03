import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

function Profile() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadProfile = async () => {
      setLoading(true);
      setError("");

      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        navigate("/login");
        return;
      }

      setUser(user);

      const { data, error: profileError } = await supabase
        .from("profiles")
        .select("full_name, phone, role")
        .eq("id", user.id)
        .single();

      if (profileError) {
        setError(profileError.message);
        setLoading(false);
        return;
      }

      setProfile(data);
      setLoading(false);
    };

    loadProfile();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#090807] text-white">
        <div className="text-center">
          <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-2 border-white/10 border-t-[#e5a13a]" />
          <p className="text-sm text-[#aaa39a]">
            Loading profile...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#090807] px-5 text-white">
        <div className="w-full max-w-lg rounded-3xl border border-red-500/20 bg-red-500/10 p-8 text-center">
          <div className="text-5xl">⚠️</div>

          <h2 className="mt-4 text-xl font-black">
            Unable to load profile
          </h2>

          <p className="mt-2 text-sm text-red-300/70">
            {error}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#090807] px-5 py-10 text-white sm:px-8 lg:px-10">
      <div className="mx-auto max-w-5xl">

        {/* HEADER */}
        <div className="mb-8">
          <p className="text-[10px] font-black uppercase tracking-[2px] text-[#e5a13a]">
            FOODNEST ACCOUNT
          </p>

          <h1 className="mt-2 text-3xl font-black sm:text-4xl">
            My Profile
          </h1>

          <p className="mt-2 text-sm text-[#777067]">
            Manage your FoodNest account details.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">

          {/* PROFILE CARD */}
          <div className="rounded-[28px] border border-white/10 bg-[#11100f] p-7 shadow-2xl">

            <div className="flex flex-col items-center text-center">

              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-[#e5a13a]/10 text-4xl ring-1 ring-[#e5a13a]/20">
                👤
              </div>

              <h2 className="mt-5 text-2xl font-black text-white">
                {profile?.full_name || "FoodNest User"}
              </h2>

              <p className="mt-1 text-xs text-[#777067]">
                {profile?.role || "customer"}
              </p>

              <div className="mt-5 rounded-xl bg-[#e5a13a]/10 px-4 py-2 text-xs font-bold text-[#e5a13a]">
                ● Active Account
              </div>

            </div>

          </div>

          {/* DETAILS */}
          <div className="rounded-[28px] border border-white/10 bg-[#11100f] p-7 shadow-2xl">

            <h3 className="text-lg font-black text-white">
              Personal Information
            </h3>

            <div className="mt-6 space-y-4">

              {/* NAME */}
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <p className="text-[10px] font-bold uppercase tracking-[1.5px] text-[#6f6961]">
                  Full Name
                </p>

                <p className="mt-2 text-sm font-semibold text-white">
                  {profile?.full_name || "Not available"}
                </p>
              </div>

              {/* EMAIL */}
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <p className="text-[10px] font-bold uppercase tracking-[1.5px] text-[#6f6961]">
                  Email Address
                </p>

                <p className="mt-2 text-sm font-semibold text-white break-all">
                  {user?.email || "Not available"}
                </p>
              </div>

              {/* PHONE */}
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <p className="text-[10px] font-bold uppercase tracking-[1.5px] text-[#6f6961]">
                  Phone Number
                </p>

                <p className="mt-2 text-sm font-semibold text-white">
                  {profile?.phone || "Not available"}
                </p>
              </div>

              {/* ROLE */}
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <p className="text-[10px] font-bold uppercase tracking-[1.5px] text-[#6f6961]">
                  Account Type
                </p>

                <p className="mt-2 text-sm font-semibold capitalize text-white">
                  {profile?.role || "customer"}
                </p>
              </div>

            </div>

            {/* ACTIONS */}
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">

              <button
                type="button"
                onClick={() => navigate("/orders")}
                className="flex-1 rounded-xl border border-white/10 bg-white/[0.04] py-3 text-sm font-bold text-white transition hover:border-[#e5a13a]/30 hover:bg-[#e5a13a]/10"
              >
                View My Orders
              </button>

              <button
                type="button"
                onClick={handleLogout}
                className="flex-1 rounded-xl bg-[#e5a13a] py-3 text-sm font-black text-[#17120b] transition hover:bg-[#f0ad43]"
              >
                Logout
              </button>

            </div>

          </div>

        </div>
      </div>
    </div>
  );
}

export default Profile;