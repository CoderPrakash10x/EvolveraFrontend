import { useEffect, useState } from "react";
import { getDashboardStats } from "../../services/admin.service";
import { useNavigate } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { Calendar, Users, Activity } from "lucide-react";

const Dashboard = () => {
  const [stats, setStats] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getDashboardStats().then(setStats);
  }, []);

  const totalRegistrations = stats.reduce(
    (sum, e) => sum + e.registrations,
    0
  );

  const chartData = stats.map((e) => ({
    name: e.title.length > 12 ? e.title.slice(0, 12) + "…" : e.title,
    registrations: e.registrations
  }));

  return (
    <div>
      <h1 className="text-4xl font-black mb-10">
        Admin <span className="text-orange-500">Dashboard</span>
      </h1>

      {/* ===== STATS ===== */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
        <StatCard
          title="Total Events"
          value={stats.length}
          icon={<Calendar />}
        />
        <StatCard
          title="Total Registrations"
          value={totalRegistrations}
          icon={<Users />}
        />
        <StatCard
          title="Active Events"
          value={stats.length}
          icon={<Activity />}
        />
      </div>

      {/* ===== CHARTS ===== */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-14">

        {/* BAR CHART */}
        <div className="lg:col-span-2 bg-zinc-900 border border-white/10 rounded-2xl p-6">
          <h2 className="text-xl font-bold mb-6">
            Event-wise Registrations
          </h2>

          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar
                  dataKey="registrations"
                  fill="#f97316"
                  radius={[6, 6, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* DONUT */}
        <div className="bg-zinc-900 border border-white/10 rounded-2xl p-6">
          <h2 className="text-xl font-bold mb-6">
            Registrations Share
          </h2>

          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={stats}
                dataKey="registrations"
                nameKey="title"
                innerRadius={70}
                outerRadius={100}
              >
                {stats.map((_, i) => (
                  <Cell
                    key={i}
                    fill={["#f97316", "#22c55e", "#3b82f6", "#eab308"][i % 4]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ===== EVENT LIST ===== */}
      <div className="bg-zinc-900 border border-white/10 rounded-2xl p-6">
        <h2 className="text-xl font-bold mb-6">
          Event-wise Registrations
        </h2>

        <div className="space-y-4">
          {stats.map((e) => (
            <div
              key={e.eventId}
              className="flex items-center justify-between p-4 rounded-xl bg-black border border-white/10 hover:border-orange-500 transition"
            >
              <div>
                <p className="font-semibold">{e.title}</p>
                <p className="text-sm text-gray-400">
                  {e.registrations} registrations
                </p>
              </div>

              <button
                onClick={() =>
                  navigate(`/admin/registrations/${e.eventId}`)
                }
                className="px-4 py-2 text-sm bg-orange-500 text-black font-bold rounded-lg"
              >
                View
              </button>
            </div>
          ))}

          {stats.length === 0 && (
            <p className="text-gray-500 text-sm">
              No events yet.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

/* ================= STAT CARD ================= */

const StatCard = ({ title, value, icon }) => (
  <div className="bg-zinc-900 border border-white/10 rounded-2xl p-6 flex items-center gap-4">
    <div className="p-3 rounded-xl bg-orange-500/20 text-orange-500">
      {icon}
    </div>
    <div>
      <p className="text-sm text-gray-400">{title}</p>
      <p className="text-4xl font-black mt-1">{value}</p>
    </div>
  </div>
);
