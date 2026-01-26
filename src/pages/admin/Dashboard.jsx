import { useEffect, useState } from "react";
import { getDashboardStats } from "../../services/admin.service";
import { useNavigate } from "react-router-dom";

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

  return (
    <div>
      <h1 className="text-4xl font-black mb-10">
        Admin <span className="text-orange-500">Dashboard</span>
      </h1>

      {/* ===== STATS CARDS ===== */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">

        <StatCard title="Total Events" value={stats.length} />
        <StatCard title="Total Registrations" value={totalRegistrations} />
        <StatCard title="Active Events" value={stats.length} />

      </div>

      {/* ===== EVENT REGISTRATIONS ===== */}
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

const StatCard = ({ title, value }) => (
  <div className="bg-zinc-900 border border-white/10 rounded-2xl p-6">
    <p className="text-sm text-gray-400">{title}</p>
    <p className="text-4xl font-black mt-2">{value}</p>
  </div>
);
