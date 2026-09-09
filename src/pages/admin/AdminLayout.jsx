import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  CalendarDays,
  Users,
  Image,
  MessageSquare,
  LogOut,
  Menu,
  X,
  ChevronRight,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { removeAdminToken } from "../../utils/auth";

const AdminLayout = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const logout = () => {
    removeAdminToken();
    navigate("/admin/login");
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  const linkClass = ({ isActive }) =>
    `group relative flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200
    ${
      isActive
        ? "bg-orange-500 text-black shadow-[0_8px_25px_rgba(249,115,22,0.15)]"
        : "text-zinc-500 hover:text-white hover:bg-white/[0.05]"
    }`;

  return (
    <div className="min-h-screen bg-[#050505] text-white">

      {/* ================= MOBILE TOP BAR ================= */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-40 h-16 bg-[#080808]/90 backdrop-blur-xl border-b border-white/[0.08] flex items-center justify-between px-4">

        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center">
            <ShieldCheck
              size={17}
              className="text-orange-500"
            />
          </div>

          <span className="font-black">
            Evolvera{" "}
            <span className="text-orange-500">
              Admin
            </span>
          </span>
        </div>

        <button
          onClick={() => setSidebarOpen(true)}
          className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-white/5 transition"
        >
          <Menu size={21} />
        </button>
      </header>

      {/* ================= MOBILE OVERLAY ================= */}
      {sidebarOpen && (
        <div
          onClick={closeSidebar}
          className="lg:hidden fixed inset-0 z-40 bg-black/70 backdrop-blur-sm"
        />
      )}

      {/* ================= SIDEBAR ================= */}
      <aside
        className={`
          fixed
          top-0
          left-0
          z-50
          h-screen
          w-[270px]
          bg-[#080808]
          border-r border-white/[0.08]
          flex flex-col
          transition-transform
          duration-300
          lg:translate-x-0
          ${
            sidebarOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }
        `}
      >

        {/* Sidebar Glow */}
        <div className="absolute top-0 left-0 right-0 h-40 bg-orange-500/[0.025] blur-3xl pointer-events-none" />

        {/* ================= BRAND ================= */}
        <div className="relative px-5 pt-6 pb-6">

          <div className="flex items-center justify-between">

            <div className="flex items-center gap-3">

              <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center shadow-[0_0_25px_rgba(249,115,22,0.08)]">
                <ShieldCheck
                  size={21}
                  className="text-orange-500"
                />
              </div>

              <div>
                <h1 className="text-[17px] font-black tracking-tight">
                  Evolvera
                </h1>

                <p className="text-[10px] uppercase tracking-[0.2em] text-orange-500 font-bold">
                  Admin Panel
                </p>
              </div>

            </div>

            {/* Mobile Close */}
            <button
              onClick={closeSidebar}
              className="lg:hidden p-2 rounded-lg text-zinc-500 hover:text-white hover:bg-white/5 transition"
            >
              <X size={19} />
            </button>

          </div>
        </div>

        {/* Divider */}
        <div className="mx-5 h-px bg-white/[0.06]" />

        {/* ================= NAVIGATION ================= */}
        <div className="flex-1 px-4 py-6 overflow-y-auto">

          <div className="flex items-center gap-2 px-3 mb-3">
            <Sparkles
              size={11}
              className="text-orange-500"
            />

            <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-zinc-600">
              Management
            </span>
          </div>

          <nav className="space-y-1.5">

            {/* Dashboard */}
            <NavLink
              to="/admin"
              end
              onClick={closeSidebar}
              className={linkClass}
            >
              {({ isActive }) => (
                <>
                  <LayoutDashboard
                    size={18}
                    strokeWidth={isActive ? 2.5 : 2}
                  />

                  <span className="flex-1">
                    Dashboard
                  </span>

                  {isActive && (
                    <ChevronRight size={15} />
                  )}
                </>
              )}
            </NavLink>

            {/* Events */}
            <NavLink
              to="/admin/events"
              onClick={closeSidebar}
              className={linkClass}
            >
              {({ isActive }) => (
                <>
                  <CalendarDays
                    size={18}
                    strokeWidth={isActive ? 2.5 : 2}
                  />

                  <span className="flex-1">
                    Events
                  </span>

                  {isActive && (
                    <ChevronRight size={15} />
                  )}
                </>
              )}
            </NavLink>

            {/* Registrations */}
            <NavLink
              to="/admin/registrations"
              onClick={closeSidebar}
              className={linkClass}
            >
              {({ isActive }) => (
                <>
                  <Users
                    size={18}
                    strokeWidth={isActive ? 2.5 : 2}
                  />

                  <span className="flex-1">
                    Registrations
                  </span>

                  {isActive && (
                    <ChevronRight size={15} />
                  )}
                </>
              )}
            </NavLink>

            {/* Gallery */}
            <NavLink
              to="/admin/gallery"
              onClick={closeSidebar}
              className={linkClass}
            >
              {({ isActive }) => (
                <>
                  <Image
                    size={18}
                    strokeWidth={isActive ? 2.5 : 2}
                  />

                  <span className="flex-1">
                    Gallery
                  </span>

                  {isActive && (
                    <ChevronRight size={15} />
                  )}
                </>
              )}
            </NavLink>

            {/* Contact */}
            <NavLink
              to="/admin/contact"
              onClick={closeSidebar}
              className={linkClass}
            >
              {({ isActive }) => (
                <>
                  <MessageSquare
                    size={18}
                    strokeWidth={isActive ? 2.5 : 2}
                  />

                  <span className="flex-1">
                    Contact
                  </span>

                  {isActive && (
                    <ChevronRight size={15} />
                  )}
                </>
              )}
            </NavLink>

          </nav>
        </div>

        {/* ================= BOTTOM ================= */}
        <div className="px-4 pb-5">

          {/* Admin Profile */}
          <div className="mb-3 p-3 rounded-xl bg-white/[0.025] border border-white/[0.06]">

            <div className="flex items-center gap-3">

              <div className="w-9 h-9 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center">
                <ShieldCheck
                  size={17}
                  className="text-orange-500"
                />
              </div>

              <div className="min-w-0">
                <p className="text-xs font-bold text-white">
                  Administrator
                </p>

                <p className="text-[10px] text-zinc-600 truncate">
                  Evolvera Control Panel
                </p>
              </div>

            </div>

          </div>

          {/* Logout */}
          <button
            onClick={logout}
            className="
              w-full
              flex
              items-center
              gap-3
              px-4
              py-3
              rounded-xl
              text-red-400
              hover:text-red-300
              hover:bg-red-500/[0.07]
              border
              border-transparent
              hover:border-red-500/10
              transition-all
              text-sm
              font-bold
            "
          >
            <LogOut size={18} />

            <span>
              Logout
            </span>
          </button>

          <p className="text-center text-[9px] text-zinc-700 mt-4 uppercase tracking-[0.18em]">
            Admin • Secure Area
          </p>

        </div>
      </aside>

      {/* ================= MAIN CONTENT ================= */}
      <main
        className="
          min-h-screen
          lg:ml-[270px]
          pt-16
          lg:pt-0
          relative
        "
      >

        {/* Main Background Glow */}
        <div className="fixed top-0 right-0 w-[450px] h-[300px] bg-orange-500/[0.025] blur-[120px] pointer-events-none" />

        {/* Content */}
        <div className="relative p-5 sm:p-7 lg:p-10 xl:p-12 max-w-[1600px]">
          <Outlet />
        </div>

      </main>
    </div>
  );
};

export default AdminLayout;