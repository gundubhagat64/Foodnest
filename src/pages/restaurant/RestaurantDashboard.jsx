import { useNavigate } from "react-router-dom";

function RestaurantDashboard() {
  const navigate = useNavigate();

  const stats = [
    {
      title: "Today's Orders",
      value: "24",
      icon: "📦",
      change: "+12%",
    },
    {
      title: "Today's Revenue",
      value: "₹8,450",
      icon: "₹",
      change: "+18%",
    },
    {
      title: "Preparing",
      value: "06",
      icon: "👨‍🍳",
      change: "Active",
    },
    {
      title: "Menu Items",
      value: "32",
      icon: "🍽️",
      change: "4 categories",
    },
  ];

  const recentOrders = [
    {
      id: "#FN1024",
      customer: "Rahul Patil",
      items: "Chicken Biryani × 2",
      amount: "₹538",
      status: "Preparing",
    },
    {
      id: "#FN1023",
      customer: "Sneha More",
      items: "Farmhouse Pizza × 1",
      amount: "₹339",
      status: "Accepted",
    },
    {
      id: "#FN1022",
      customer: "Amit Jadhav",
      items: "Classic Burger × 2",
      amount: "₹438",
      status: "Ready",
    },
    {
      id: "#FN1021",
      customer: "Priya Shah",
      items: "Paneer Tikka × 1",
      amount: "₹269",
      status: "Delivered",
    },
  ];

  const getStatusStyle = (status) => {
    if (status === "Preparing") {
      return "bg-orange-500/10 text-orange-400 border-orange-500/20";
    }

    if (status === "Accepted") {
      return "bg-blue-500/10 text-blue-400 border-blue-500/20";
    }

    if (status === "Ready") {
      return "bg-yellow-500/10 text-yellow-400 border-yellow-500/20";
    }

    return "bg-green-500/10 text-green-400 border-green-500/20";
  };

  return (
    <div className="min-h-screen bg-[#090807] text-[#f5f1e8]">

      {/* Header */}
      <header className="border-b border-white/10 bg-[#11100f]/90 backdrop-blur-xl">

        <div className="mx-auto flex min-h-[72px] max-w-7xl items-center justify-between gap-4 px-5 sm:px-8 lg:px-10">

          <div>
            <p className="text-[9px] font-black uppercase tracking-[2px] text-[#e5a13a]">
              RESTAURANT PANEL
            </p>

            <h1 className="mt-1 text-lg font-black text-white sm:text-xl">
              FoodNest Kitchen
            </h1>
          </div>

          <div className="flex items-center gap-2">

            <button
              type="button"
              className="hidden rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-xs font-bold text-[#aaa39a] transition hover:border-[#e5a13a]/30 hover:text-white sm:block"
            >
              🔔 Notifications
            </button>

            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-lg transition hover:border-[#e5a13a]/30"
            >
              👤
            </button>

          </div>

        </div>

      </header>

      {/* Content */}
      <main className="mx-auto max-w-7xl px-5 py-7 sm:px-8 sm:py-10 lg:px-10">

        {/* Welcome */}
        <div className="mb-7">

          <p className="text-xs font-semibold text-[#777067]">
            Welcome back, Restaurant Owner 👋
          </p>

          <h2 className="mt-1 text-2xl font-black text-white sm:text-3xl">
            Here's today's overview.
          </h2>

        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">

          {stats.map((stat) => (
            <div
              key={stat.title}
              className="rounded-2xl border border-white/10 bg-[#11100f]/80 p-4 backdrop-blur-xl transition hover:border-[#e5a13a]/20 sm:p-5"
            >

              <div className="flex items-start justify-between">

                <div>
                  <p className="text-[9px] font-bold uppercase tracking-wider text-[#706a62] sm:text-[10px]">
                    {stat.title}
                  </p>

                  <p className="mt-2 text-xl font-black text-white sm:text-2xl">
                    {stat.value}
                  </p>
                </div>

                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#e5a13a]/10 text-sm">
                  {stat.icon}
                </div>

              </div>

              <p className="mt-3 text-[9px] font-bold text-[#e5a13a]">
                {stat.change}
              </p>

            </div>
          ))}

        </div>

        {/* Quick Actions */}
        <section className="mt-7">

          <div className="mb-4">
            <p className="text-[10px] font-black uppercase tracking-[2px] text-[#e5a13a]">
              Manage
            </p>

            <h2 className="mt-1 text-xl font-black text-white">
              Quick Actions
            </h2>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">

            <button
              type="button"
              onClick={() => navigate("/restaurant/menu")}
              className="group rounded-2xl border border-white/10 bg-[#11100f]/80 p-5 text-left backdrop-blur-xl transition hover:-translate-y-1 hover:border-[#e5a13a]/25 hover:bg-[#e5a13a]/5"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#e5a13a]/10 text-xl">
                🍽️
              </div>

              <h3 className="mt-4 text-sm font-black text-white">
                Manage Menu
              </h3>

              <p className="mt-1 text-[10px] leading-4 text-[#716b63]">
                Add, edit or remove food items.
              </p>

              <span className="mt-4 block text-[10px] font-bold text-[#e5a13a]">
                Open Menu →
              </span>
            </button>

            <button
              type="button"
              onClick={() => navigate("/restaurant/orders")}
              className="group rounded-2xl border border-white/10 bg-[#11100f]/80 p-5 text-left backdrop-blur-xl transition hover:-translate-y-1 hover:border-[#e5a13a]/25 hover:bg-[#e5a13a]/5"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10 text-xl">
                📦
              </div>

              <h3 className="mt-4 text-sm font-black text-white">
                Manage Orders
              </h3>

              <p className="mt-1 text-[10px] leading-4 text-[#716b63]">
                Accept, reject and update orders.
              </p>

              <span className="mt-4 block text-[10px] font-bold text-[#e5a13a]">
                View Orders →
              </span>
            </button>

            <button
              type="button"
              onClick={() => navigate("/restaurant/kitchen")}
              className="group rounded-2xl border border-white/10 bg-[#11100f]/80 p-5 text-left backdrop-blur-xl transition hover:-translate-y-1 hover:border-[#e5a13a]/25 hover:bg-[#e5a13a]/5"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-500/10 text-xl">
                👨‍🍳
              </div>

              <h3 className="mt-4 text-sm font-black text-white">
                Kitchen
              </h3>

              <p className="mt-1 text-[10px] leading-4 text-[#716b63]">
                See active orders and preparation status.
              </p>

              <span className="mt-4 block text-[10px] font-bold text-[#e5a13a]">
                Open Kitchen →
              </span>
            </button>

            <button
              type="button"
              className="group rounded-2xl border border-white/10 bg-[#11100f]/80 p-5 text-left backdrop-blur-xl transition hover:-translate-y-1 hover:border-[#e5a13a]/25 hover:bg-[#e5a13a]/5"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-500/10 text-xl">
                📊
              </div>

              <h3 className="mt-4 text-sm font-black text-white">
                Analytics
              </h3>

              <p className="mt-1 text-[10px] leading-4 text-[#716b63]">
                Track sales and restaurant performance.
              </p>

              <span className="mt-4 block text-[10px] font-bold text-[#e5a13a]">
                View Analytics →
              </span>
            </button>

          </div>

        </section>

        {/* Recent Orders */}
        <section className="mt-8">

          <div className="mb-4 flex items-end justify-between">

            <div>
              <p className="text-[10px] font-black uppercase tracking-[2px] text-[#e5a13a]">
                Live Activity
              </p>

              <h2 className="mt-1 text-xl font-black text-white">
                Recent Orders
              </h2>
            </div>

            <button
              type="button"
              onClick={() => navigate("/restaurant/orders")}
              className="text-[10px] font-bold text-[#8d867d] transition hover:text-[#e5a13a]"
            >
              View all →
            </button>

          </div>

          {/* Desktop table */}
          <div className="hidden overflow-hidden rounded-3xl border border-white/10 bg-[#11100f]/80 backdrop-blur-xl md:block">

            <div className="grid grid-cols-[110px_1fr_1.4fr_100px_130px] gap-4 border-b border-white/10 px-5 py-3 text-[9px] font-black uppercase tracking-wider text-[#625d56]">
              <span>Order</span>
              <span>Customer</span>
              <span>Items</span>
              <span>Amount</span>
              <span>Status</span>
            </div>

            {recentOrders.map((order) => (
              <div
                key={order.id}
                className="grid grid-cols-[110px_1fr_1.4fr_100px_130px] items-center gap-4 border-b border-white/5 px-5 py-4 last:border-0"
              >

                <span className="text-xs font-black text-[#f0ad43]">
                  {order.id}
                </span>

                <span className="text-xs font-bold text-white">
                  {order.customer}
                </span>

                <span className="text-xs text-[#817a71]">
                  {order.items}
                </span>

                <span className="text-xs font-black text-white">
                  {order.amount}
                </span>

                <span
                  className={`w-fit rounded-lg border px-2.5 py-1.5 text-[9px] font-bold ${getStatusStyle(
                    order.status
                  )}`}
                >
                  {order.status}
                </span>

              </div>
            ))}

          </div>

          {/* Mobile cards */}
          <div className="space-y-3 md:hidden">

            {recentOrders.map((order) => (
              <div
                key={order.id}
                className="rounded-2xl border border-white/10 bg-[#11100f]/80 p-4 backdrop-blur-xl"
              >

                <div className="flex items-center justify-between">

                  <span className="text-xs font-black text-[#f0ad43]">
                    {order.id}
                  </span>

                  <span
                    className={`rounded-lg border px-2 py-1 text-[8px] font-bold ${getStatusStyle(
                      order.status
                    )}`}
                  >
                    {order.status}
                  </span>

                </div>

                <p className="mt-3 text-xs font-black text-white">
                  {order.customer}
                </p>

                <p className="mt-1 text-[10px] text-[#817a71]">
                  {order.items}
                </p>

                <div className="mt-3 flex items-center justify-between border-t border-white/5 pt-3">

                  <span className="text-[9px] text-[#625d56]">
                    Order amount
                  </span>

                  <span className="text-sm font-black text-white">
                    {order.amount}
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