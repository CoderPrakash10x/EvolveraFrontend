import { useEffect, useState } from "react";
import { getDashboardStats } from "../../services/admin.service";
import { useNavigate } from "react-router-dom";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell
} from "recharts";
import { Calendar, Users, Activity, Zap, Clock, CheckCircle } from "lucide-react";

const Dashboard = () => {
  const [stats, setStats] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getDashboardStats().then(setStats);
  }, []);

  const totalRegistrations = stats.reduce((sum, e) => sum + e.registrations, 0);
  const upcomingEvents = stats.filter((e) => e.status === "upcoming").length;
  const liveEvents = stats.filter((e) => e.status === "live").length;
  const pastEvents = stats.filter((e) => e.status === "past").length;

  const chartData = stats.map((e) => ({
    name: e.title.length > 12 ? e.title.slice(0, 12) + "…" : e.title,
    registrations: e.registrations
  }));

  return (
    <div>
      <h1 className="text-4xl font-black mb-2">
        Admin <span className="text-orange-500">Dashboard</span>
      </h1>
      <p className="text-gray-500 text-sm mb-10">Welcome back — here's your overview</p>

      {/* ===== STATS ROW 1 ===== */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
        <StatCard title="Total Events"        value={stats.length}       icon={<Calendar size={20} />} color="orange" />
        <StatCard title="Total Registrations" value={totalRegistrations}  icon={<Users size={20} />}    color="blue" />
        <StatCard title="Live Now"            value={liveEvents}          icon={<Zap size={20} />}      color="red" pulse={liveEvents > 0} />
      </div>

      {/* ===== STATS ROW 2 ===== */}
      <div className="grid grid-cols-2 lg:grid-cols-2 gap-4 mb-10">
        <StatCard title="Upcoming Events" value={upcomingEvents} icon={<Clock size={20} />}       color="yellow" />
        <StatCard title="Past Events"     value={pastEvents}     icon={<CheckCircle size={20} />} color="gray" />
      </div>

      {/* ===== CHARTS ===== */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">

        {/* BAR CHART */}
        <div className="lg:col-span-2 bg-zinc-900 border border-white/10 rounded-2xl p-6">
          <h2 className="text-lg font-bold mb-6">Event-wise Registrations</h2>
          <div className="h-[260px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <XAxis dataKey="name" tick={{ fill: "#666", fontSize: 11 }} />
                <YAxis tick={{ fill: "#666", fontSize: 11 }} />
                <Tooltip
                  contentStyle={{ background: "#111", border: "1px solid #333", borderRadius: 8 }}
                  labelStyle={{ color: "#fff" }}
                />
                <Bar dataKey="registrations" fill="#f97316" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* DONUT */}
        <div className="bg-zinc-900 border border-white/10 rounded-2xl p-6">
          <h2 className="text-lg font-bold mb-4">Registrations Share</h2>
          {stats.filter(e => e.registrations > 0).length === 0 ? (
            <div className="h-[260px] flex items-center justify-center text-gray-600 text-sm">
              No registrations yet
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={260}>
              <PieChart>
                <Pie
                  data={stats.filter(e => e.registrations > 0)}
                  dataKey="registrations"
                  nameKey="title"
                  innerRadius={65}
                  outerRadius={95}
                >
                  {stats.filter(e => e.registrations > 0).map((_, i) => (
                    <Cell
                      key={i}
                      fill={["#f97316", "#22c55e", "#3b82f6", "#eab308", "#ec4899"][i % 5]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ background: "#111", border: "1px solid #333", borderRadius: 8 }}
                />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      {/* ===== EVENT LIST ===== */}
      <div className="bg-zinc-900 border border-white/10 rounded-2xl p-6">
        <h2 className="text-lg font-bold mb-6">All Events</h2>

        <div className="space-y-3">
          {stats.map((e) => (
            <div
              key={e.eventId}
              className="flex items-center justify-between p-4 rounded-xl
                         bg-black border border-white/5 hover:border-orange-500/30 transition"
            >
              <div className="flex items-center gap-4">
                {/* STATUS DOT */}
                <span className={`w-2 h-2 rounded-full ${
                  e.status === "live"     ? "bg-red-500 animate-pulse" :
                  e.status === "upcoming" ? "bg-orange-500" :
                                            "bg-zinc-600"
                }`} />
                <div>
                  <p className="font-semibold text-sm">{e.title}</p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {new Date(e.eventStartAt).toLocaleDateString("en-IN", {
                      day: "numeric", month: "short", year: "numeric"
                    })}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-orange-500 font-black text-lg">{e.registrations}</p>
                  <p className="text-xs text-gray-600">registrations</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                  e.status === "live"     ? "bg-red-500/20 text-red-400" :
                  e.status === "upcoming" ? "bg-orange-500/20 text-orange-400" :
                                            "bg-zinc-700/50 text-gray-400"
                }`}>
                  {e.status}
                </span>
                <button
                  onClick={() => navigate(`/admin/events/${e.eventId}/submissions`)}
                  className="px-3 py-1.5 text-xs bg-orange-500 text-black font-bold rounded-lg hover:scale-105 transition"
                >
                  View
                </button>
              </div>
            </div>
          ))}

          {stats.length === 0 && (
            <p className="text-gray-500 text-sm text-center py-8">
              No events yet — create your first event!
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

/* ================= STAT CARD ================= */
const colorMap = {
  orange: { bg: "bg-orange-500/10", text: "text-orange-500" },
  blue:   { bg: "bg-blue-500/10",   text: "text-blue-400" },
  red:    { bg: "bg-red-500/10",    text: "text-red-400" },
  yellow: { bg: "bg-yellow-500/10", text: "text-yellow-400" },
  gray:   { bg: "bg-zinc-800",      text: "text-gray-400" },
};

const StatCard = ({ title, value, icon, color = "orange", pulse = false }) => {
  const c = colorMap[color];
  return (
    <div className="bg-zinc-900 border border-white/10 rounded-2xl p-5 flex items-center gap-4">
      <div className={`p-3 rounded-xl ${c.bg} ${c.text} ${pulse ? "animate-pulse" : ""}`}>
        {icon}
      </div>
      <div>
        <p className="text-xs text-gray-500 uppercase tracking-wider">{title}</p>
        <p className="text-3xl font-black mt-1">{value}</p>
      </div>
    </div>
  );
};