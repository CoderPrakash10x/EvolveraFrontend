import { useEffect, useMemo, useState } from "react";
import { getDashboardStats } from "../../services/admin.service";
import { useNavigate } from "react-router-dom";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
} from "recharts";

import {
  CalendarDays,
  Users,
  Activity,
  Zap,
  Clock3,
  CheckCircle2,
  ArrowUpRight,
  ArrowRight,
  TrendingUp,
} from "lucide-react";

const Dashboard = () => {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const data = await getDashboardStats();
        setStats(data || []);
      } catch (error) {
        console.error("Dashboard error:", error);
        setStats([]);
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  const totalRegistrations = useMemo(
    () =>
      stats.reduce(
        (sum, event) => sum + (Number(event.registrations) || 0),
        0
      ),
    [stats]
  );

  const upcomingEvents = stats.filter(
    (event) => event.status === "upcoming"
  ).length;

  const liveEvents = stats.filter(
    (event) => event.status === "live"
  ).length;

  const pastEvents = stats.filter(
    (event) => event.status === "past"
  ).length;

  const chartData = useMemo(
    () =>
      stats.map((event) => ({
        name:
          event.title?.length > 16
            ? `${event.title.slice(0, 16)}…`
            : event.title || "Untitled",
        registrations: Number(event.registrations) || 0,
      })),
    [stats]
  );

  const registrationEvents = stats.filter(
    (event) => Number(event.registrations) > 0
  );

  const pieColors = [
    "#f97316",
    "#3b82f6",
    "#22c55e",
    "#eab308",
    "#ec4899",
  ];

  return (
    <div className="min-h-full text-white pb-12">

      {/* =========================================================
          HEADER
      ========================================================= */}

      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 mb-10">

        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
            <span className="text-xs uppercase tracking-[0.22em] text-zinc-500">
              Admin Overview
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-black tracking-tight">
            Admin{" "}
            <span className="text-orange-500">
              Dashboard
            </span>
          </h1>

          <p className="text-zinc-500 mt-3 text-sm">
            Monitor events, registrations and activity from one place.
          </p>
        </div>

        <button
          onClick={() => navigate("/admin/events")}
          className="
            group
            flex items-center gap-2
            w-fit
            px-4 py-2.5
            rounded-xl
            border border-white/10
            bg-white/[0.03]
            text-sm font-semibold
            text-zinc-300
            hover:text-white
            hover:border-orange-500/40
            hover:bg-orange-500/[0.06]
            transition-all
          "
        >
          Manage Events
          <ArrowUpRight
            size={16}
            className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition"
          />
        </button>
      </div>

      {/* =========================================================
          STATS
      ========================================================= */}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-4">

        <StatCard
          title="Total Events"
          value={stats.length}
          subtitle="All events"
          icon={<CalendarDays size={20} />}
          accent="orange"
        />

        <StatCard
          title="Registrations"
          value={totalRegistrations}
          subtitle="Total participants"
          icon={<Users size={20} />}
          accent="blue"
        />

        <StatCard
          title="Upcoming"
          value={upcomingEvents}
          subtitle="Events scheduled"
          icon={<Clock3 size={20} />}
          accent="yellow"
        />

        <StatCard
          title="Live Now"
          value={liveEvents}
          subtitle={liveEvents > 0 ? "Currently active" : "Nothing live"}
          icon={<Zap size={20} />}
          accent="red"
          pulse={liveEvents > 0}
        />
      </div>

      {/* =========================================================
          SECONDARY INFO
      ========================================================= */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">

        <div
          className="
            group
            relative overflow-hidden
            bg-zinc-900/70
            border border-white/[0.08]
            rounded-2xl
            p-5
            hover:border-orange-500/20
            transition-all
          "
        >
          <div className="absolute -right-10 -top-10 w-32 h-32 bg-orange-500/5 blur-3xl rounded-full" />

          <div className="relative flex items-center justify-between">

            <div className="flex items-center gap-4">

              <div className="w-11 h-11 rounded-xl bg-orange-500/10 text-orange-500 flex items-center justify-center">
                <TrendingUp size={20} />
              </div>

              <div>
                <p className="text-xs uppercase tracking-wider text-zinc-500">
                  Registration Activity
                </p>

                <p className="text-lg font-bold mt-1">
                  {totalRegistrations > 0
                    ? "People are registering"
                    : "Waiting for registrations"}
                </p>
              </div>

            </div>

            <div className="text-right">
              <p className="text-2xl font-black text-orange-500">
                {totalRegistrations}
              </p>

              <p className="text-[11px] text-zinc-600">
                registrations
              </p>
            </div>

          </div>
        </div>

        <div
          className="
            group
            relative overflow-hidden
            bg-zinc-900/70
            border border-white/[0.08]
            rounded-2xl
            p-5
            hover:border-white/15
            transition-all
          "
        >
          <div className="flex items-center justify-between">

            <div className="flex items-center gap-4">

              <div className="w-11 h-11 rounded-xl bg-zinc-800 text-zinc-400 flex items-center justify-center">
                <CheckCircle2 size={20} />
              </div>

              <div>
                <p className="text-xs uppercase tracking-wider text-zinc-500">
                  Event Status
                </p>

                <p className="text-lg font-bold mt-1">
                  {pastEvents} completed
                </p>
              </div>

            </div>

            <div className="flex items-center gap-2 text-xs">
              <span className="w-2 h-2 rounded-full bg-orange-500" />
              <span className="text-zinc-500">
                {upcomingEvents} upcoming
              </span>
            </div>

          </div>
        </div>

      </div>

      {/* =========================================================
          CHART SECTION
      ========================================================= */}

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5 mb-8">

        {/* ================= BAR CHART ================= */}

        <div
          className="
            xl:col-span-2
            bg-zinc-900/70
            border border-white/[0.08]
            rounded-2xl
            p-6
            overflow-hidden
          "
        >

          <div className="flex items-start justify-between mb-7">

            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-zinc-600 mb-2">
                Analytics
              </p>

              <h2 className="text-lg font-bold">
                Event Registrations
              </h2>

              <p className="text-xs text-zinc-500 mt-1">
                Registration count by event
              </p>
            </div>

            <div className="w-9 h-9 rounded-lg bg-orange-500/10 text-orange-500 flex items-center justify-center">
              <Activity size={18} />
            </div>

          </div>

          <div className="h-[310px]">

            {chartData.length === 0 ? (

              <EmptyChart />

            ) : (

              <ResponsiveContainer width="100%" height="100%">

                <BarChart
                  data={chartData}
                  margin={{
                    top: 10,
                    right: 10,
                    left: -20,
                    bottom: 5,
                  }}
                  barCategoryGap="28%"
                >

                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="rgba(255,255,255,0.06)"
                    vertical={false}
                  />

                  <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{
                      fill: "#71717a",
                      fontSize: 11,
                    }}
                    dy={10}
                  />

                  <YAxis
                    allowDecimals={false}
                    axisLine={false}
                    tickLine={false}
                    tick={{
                      fill: "#52525b",
                      fontSize: 11,
                    }}
                  />

                  <Tooltip
                    cursor={{
                      fill: "rgba(255,255,255,0.025)",
                    }}
                    content={<CustomTooltip />}
                  />

                  <Bar
                    dataKey="registrations"
                    fill="#f97316"
                    radius={[7, 7, 3, 3]}
                    maxBarSize={52}
                  />

                </BarChart>

              </ResponsiveContainer>

            )}

          </div>
        </div>

        {/* ================= DONUT ================= */}

        <div
          className="
            bg-zinc-900/70
            border border-white/[0.08]
            rounded-2xl
            p-6
          "
        >

          <div className="mb-2">
            <p className="text-xs uppercase tracking-[0.18em] text-zinc-600 mb-2">
              Distribution
            </p>

            <h2 className="text-lg font-bold">
              Registration Share
            </h2>

            <p className="text-xs text-zinc-500 mt-1">
              Participation across events
            </p>
          </div>

          {registrationEvents.length === 0 ? (

            <div className="h-[280px]">
              <EmptyChart />
            </div>

          ) : (

            <div className="relative h-[280px]">

              <ResponsiveContainer width="100%" height="100%">

                <PieChart>

                  <Pie
                    data={registrationEvents}
                    dataKey="registrations"
                    nameKey="title"
                    innerRadius={70}
                    outerRadius={98}
                    paddingAngle={4}
                    stroke="none"
                  >

                    {registrationEvents.map((event, index) => (
                      <Cell
                        key={event.eventId || index}
                        fill={pieColors[index % pieColors.length]}
                      />
                    ))}

                  </Pie>

                  <Tooltip
                    content={<CustomTooltip />}
                  />

                </PieChart>

              </ResponsiveContainer>

              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">

                <div className="text-center">
                  <p className="text-3xl font-black">
                    {totalRegistrations}
                  </p>

                  <p className="text-[10px] uppercase tracking-widest text-zinc-600 mt-1">
                    Total
                  </p>
                </div>

              </div>

            </div>

          )}

          {/* Legend */}

          {registrationEvents.length > 0 && (

            <div className="space-y-2 mt-2">

              {registrationEvents.slice(0, 4).map((event, index) => (

                <div
                  key={event.eventId || index}
                  className="flex items-center justify-between gap-3"
                >

                  <div className="flex items-center gap-2 min-w-0">

                    <span
                      className="w-2 h-2 rounded-full shrink-0"
                      style={{
                        backgroundColor:
                          pieColors[index % pieColors.length],
                      }}
                    />

                    <span className="text-xs text-zinc-400 truncate">
                      {event.title}
                    </span>

                  </div>

                  <span className="text-xs font-bold text-zinc-300">
                    {event.registrations}
                  </span>

                </div>

              ))}

            </div>

          )}

        </div>

      </div>

      {/* =========================================================
          EVENTS
      ========================================================= */}

      <div
        className="
          bg-zinc-900/70
          border border-white/[0.08]
          rounded-2xl
          overflow-hidden
        "
      >

        <div className="p-6 border-b border-white/[0.06] flex items-center justify-between">

          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-zinc-600 mb-2">
              Management
            </p>

            <h2 className="text-lg font-bold">
              All Events
            </h2>
          </div>

          <button
            onClick={() => navigate("/admin/events")}
            className="
              hidden sm:flex
              items-center gap-1.5
              text-xs font-semibold
              text-zinc-500
              hover:text-orange-500
              transition
            "
          >
            View all
            <ArrowRight size={14} />
          </button>

        </div>

        <div className="p-4 sm:p-6">

          {loading ? (

            <div className="space-y-3">

              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="
                    h-[76px]
                    rounded-xl
                    bg-white/[0.025]
                    border border-white/[0.04]
                    animate-pulse
                  "
                />
              ))}

            </div>

          ) : stats.length === 0 ? (

            <div className="py-14 text-center">

              <div className="w-12 h-12 mx-auto rounded-xl bg-zinc-800 flex items-center justify-center text-zinc-600 mb-4">
                <CalendarDays size={20} />
              </div>

              <p className="text-sm font-semibold text-zinc-400">
                No events yet
              </p>

              <p className="text-xs text-zinc-600 mt-1">
                Create your first event to get started.
              </p>

            </div>

          ) : (

            <div className="space-y-2">

              {stats.map((event) => (

                <EventRow
                  key={event.eventId}
                  event={event}
                  onView={() =>
                    navigate(
                      `/admin/events/${event.eventId}/submissions`
                    )
                  }
                />

              ))}

            </div>

          )}

        </div>

      </div>

    </div>
  );
};

export default Dashboard;


/* =========================================================
   STAT CARD
========================================================= */

const StatCard = ({
  title,
  value,
  subtitle,
  icon,
  accent = "orange",
  pulse = false,
}) => {

  const accents = {
    orange: {
      icon: "bg-orange-500/10 text-orange-500",
      glow: "bg-orange-500/10",
    },

    blue: {
      icon: "bg-blue-500/10 text-blue-400",
      glow: "bg-blue-500/10",
    },

    yellow: {
      icon: "bg-yellow-500/10 text-yellow-400",
      glow: "bg-yellow-500/10",
    },

    red: {
      icon: "bg-red-500/10 text-red-400",
      glow: "bg-red-500/10",
    },
  };

  const color = accents[accent];

  return (
    <div
      className="
        group
        relative overflow-hidden
        bg-zinc-900/70
        border border-white/[0.08]
        rounded-2xl
        p-5
        hover:border-white/[0.14]
        transition-all
      "
    >

      <div
        className={`
          absolute
          -right-10
          -top-10
          w-28
          h-28
          rounded-full
          blur-3xl
          opacity-30
          ${color.glow}
        `}
      />

      <div className="relative flex items-start justify-between">

        <div
          className={`
            w-11 h-11
            rounded-xl
            flex items-center justify-center
            ${color.icon}
            ${pulse ? "animate-pulse" : ""}
          `}
        >
          {icon}
        </div>

        <ArrowUpRight
          size={15}
          className="
            text-zinc-700
            group-hover:text-zinc-400
            transition
          "
        />

      </div>

      <div className="relative mt-5">

        <p className="text-[11px] uppercase tracking-[0.14em] text-zinc-600">
          {title}
        </p>

        <p className="text-3xl font-black tracking-tight mt-1">
          {value}
        </p>

        <p className="text-xs text-zinc-600 mt-1">
          {subtitle}
        </p>

      </div>

    </div>
  );
};


/* =========================================================
   EVENT ROW
========================================================= */

const EventRow = ({ event, onView }) => {

  const statusConfig = {
    live: {
      dot: "bg-red-500 animate-pulse",
      badge: "bg-red-500/10 text-red-400 border-red-500/10",
      label: "Live",
    },

    upcoming: {
      dot: "bg-orange-500",
      badge: "bg-orange-500/10 text-orange-400 border-orange-500/10",
      label: "Upcoming",
    },

    past: {
      dot: "bg-zinc-600",
      badge: "bg-zinc-800 text-zinc-500 border-white/5",
      label: "Past",
    },
  };

  const status =
    statusConfig[event.status] || statusConfig.past;

  const formattedDate = event.eventStartAt
    ? new Date(event.eventStartAt).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "Date unavailable";

  return (
    <div
      className="
        group
        flex flex-col sm:flex-row
        sm:items-center
        justify-between
        gap-4
        p-4
        rounded-xl
        border border-white/[0.05]
        bg-black/20
        hover:bg-white/[0.025]
        hover:border-orange-500/20
        transition-all
      "
    >

      <div className="flex items-center gap-4 min-w-0">

        <div className="flex flex-col items-center gap-1 shrink-0">

          <span
            className={`w-2.5 h-2.5 rounded-full ${status.dot}`}
          />

          <span className="w-px h-5 bg-white/[0.06]" />

        </div>

        <div className="min-w-0">

          <p className="font-semibold text-sm text-zinc-200 truncate">
            {event.title || "Untitled Event"}
          </p>

          <p className="text-xs text-zinc-600 mt-1">
            {formattedDate}
          </p>

        </div>

      </div>

      <div className="flex items-center justify-between sm:justify-end gap-4">

        <div className="text-right">

          <p className="text-orange-500 font-black text-lg leading-none">
            {event.registrations || 0}
          </p>

          <p className="text-[10px] uppercase tracking-wider text-zinc-700 mt-1">
            Registrations
          </p>

        </div>

        <span
          className={`
            px-2.5 py-1
            rounded-full
            border
            text-[10px]
            uppercase
            tracking-wider
            font-bold
            ${status.badge}
          `}
        >
          {status.label}
        </span>

        <button
          onClick={onView}
          className="
            px-3.5 py-2
            rounded-lg
            bg-orange-500
            text-black
            text-xs
            font-bold
            hover:bg-orange-400
            hover:-translate-y-0.5
            transition-all
          "
        >
          View
        </button>

      </div>

    </div>
  );
};


/* =========================================================
   CUSTOM TOOLTIP
========================================================= */

const CustomTooltip = ({ active, payload, label }) => {

  if (!active || !payload || !payload.length) {
    return null;
  }

  return (
    <div
      className="
        bg-zinc-950
        border border-white/10
        rounded-xl
        px-4 py-3
        shadow-2xl
      "
    >
      <p className="text-xs text-zinc-500 mb-1">
        {label}
      </p>

      <p className="text-sm font-bold text-white">
        {payload[0].value}{" "}
        <span className="text-zinc-500 font-normal">
          registrations
        </span>
      </p>
    </div>
  );
};


/* =========================================================
   EMPTY CHART
========================================================= */

const EmptyChart = () => {
  return (
    <div className="h-full flex flex-col items-center justify-center">

      <div className="w-11 h-11 rounded-xl bg-zinc-800 flex items-center justify-center text-zinc-600 mb-3">
        <Activity size={18} />
      </div>

      <p className="text-sm text-zinc-500">
        No registration data
      </p>

      <p className="text-xs text-zinc-700 mt-1">
        Data will appear here once users register.
      </p>

    </div>
  );
};