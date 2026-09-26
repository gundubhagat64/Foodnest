import { useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabase";

function RestaurantDashboard() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/restaurant/login");
  };

  const stats = [
    {
      title: "Today's Orders",
      value: "24",
      icon: "📦",
    },
    {
      title: "Revenue",
      value: "₹8,450",
      icon: "💰",
    },
    {
      title: "Pending Orders",
      value: "6",
      icon: "⏳",
    },
    {
      title: "Menu Items",
      value: "18",
      icon: "🍽️",
    },
  ];

  return (
    <div className="min-h-screen bg-[#090807] text-white">

      <header className="border-b border-white/10 bg-[#11100f]">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5">

          <div>
            <p className="text-[10px] font-black uppercase tracking-[3px] text-[#e5a13a]">
              FOODNEST
            </p>

            <h1 className="mt-1 text-xl font-black sm:text-2xl">
              Restaurant Dashboard
            </h1>
          </div>

          <button
            onClick={handleLogout}
            className="rounded-xl border border-white/10 px-4 py-2 text-xs font-bold text-[#aaa39a] transition hover:border-red-500/30 hover:bg-red-500/10 hover:text-red-400"
          >
            Logout
          </button>

        </div>
      </header>

      <main className="mx-auto max-w-7xl px-5 py-8">

        <div className="mb-8">

          <p className="text-xs text-[#777067]">
            Welcome back 👋
          </p>

          <h2 className="mt-1 text-2xl font-black sm:text-3xl">
            FoodNest Kitchen
          </h2>

          <p className="mt-2 text-xs text-[#625d56]">
            Manage your restaurant, menu and orders from one place.
          </p>

        </div>

        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">

          {stats.map((stat) => (
            <div
              key={stat.title}
              className="rounded-2xl border border-white/10 bg-[#11100f] p-5"
            >

              <div className="flex items-center justify-between">

                <span className="text-2xl">
                  {stat.icon}
                </span>

                <span className="h-2 w-2 rounded-full bg-[#e5a13a]" />

              </div>

              <p className="mt-5 text-[10px] font-bold uppercase tracking-wider text-[#777067]">
                {stat.title}
              </p>

              <p className="mt-1 text-2xl font-black text-white">
                {stat.value}
              </p>

            </div>
          ))}

        </div>

        <section className="mt-8">

          <h2 className="mb-4 text-lg font-black">
            Quick Actions
          </h2>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

            <button
              onClick={() => navigate("/restaurant/menu")}
              className="rounded-2xl border border-[#e5a13a]/20 bg-[#e5a13a]/10 p-5 text-left transition hover:-translate-y-1 hover:bg-[#e5a13a]/15"
            >
              <div className="text-2xl">🍔</div>

              <h3 className="mt-4 text-sm font-black">
                Manage Menu
              </h3>

              <p className="mt-1 text-[10px] text-[#777067]">
                Add, edit or remove food items.
              </p>
            </button>

            <button
              className="rounded-2xl border border-white/10 bg-[#11100f] p-5 text-left transition hover:-translate-y-1 hover:bg-white/[0.04]"
            >
              <div className="text-2xl">📦</div>

              <h3 className="mt-4 text-sm font-black">
                Orders
              </h3>

              <p className="mt-1 text-[10px] text-[#777067]">
                View and manage customer orders.
              </p>
            </button>

            <button
              className="rounded-2xl border border-white/10 bg-[#11100f] p-5 text-left transition hover:-translate-y-1 hover:bg-white/[0.04]"
            >
              <div className="text-2xl">👨‍🍳</div>

              <h3 className="mt-4 text-sm font-black">
                Kitchen
              </h3>

              <p className="mt-1 text-[10px] text-[#777067]">
                Track food preparation status.
              </p>
            </button>

            <button
              className="rounded-2xl border border-white/10 bg-[#11100f] p-5 text-left transition hover:-translate-y-1 hover:bg-white/[0.04]"
            >
              <div className="text-2xl">📊</div>

              <h3 className="mt-4 text-sm font-black">
                Analytics
              </h3>

              <p className="mt-1 text-[10px] text-[#777067]">
                View sales and restaurant performance.
              </p>
            </button>

          </div>

        </section>

        <section className="mt-8 rounded-2xl border border-white/10 bg-[#11100f] p-6">

          <div className="flex items-center justify-between">

            <div>
              <h2 className="text-lg font-black">
                Recent Orders
              </h2>

              <p className="mt-1 text-[10px] text-[#625d56]">
                Latest restaurant activity
              </p>
            </div>

            <span className="rounded-lg bg-green-500/10 px-3 py-1.5 text-[9px] font-bold text-green-400">
              LIVE
            </span>

          </div>

          <div className="mt-6 space-y-3">

            {[
              ["#FN1024", "Chicken Biryani × 2", "₹498", "Preparing"],
              ["#FN1023", "Farmhouse Pizza × 1", "₹299", "Ready"],
              ["#FN1022", "Classic Burger × 2", "₹398", "Delivered"],
            ].map((order) => (
              <div
                key={order[0]}
                className="flex flex-col gap-3 rounded-xl border border-white/5 bg-white/[0.02] p-4 sm:flex-row sm:items-center sm:justify-between"
              >

                <div>
                  <p className="text-xs font-black">
                    {order[0]}
                  </p>

                  <p className="mt-1 text-[10px] text-[#777067]">
                    {order[1]}
                  </p>
                </div>

                <div className="flex items-center justify-between gap-5 sm:justify-end">

                  <span className="text-xs font-black">
                    {order[2]}
                  </span>

                  <span className="rounded-lg bg-[#e5a13a]/10 px-3 py-1.5 text-[9px] font-bold text-[#e5a13a]">
                    {order[3]}
                  </span>

                </div>

              </div>
            ))}

          </div>

        </section>

      </main>

    </div>
  );
}

export default RestaurantDashboard;