import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  CalendarDays,
  Users,
  Image,
  LogOut
} from "lucide-react";
import { removeAdminToken } from "../../utils/auth";

const AdminLayout = () => {
  const navigate = useNavigate();

  const logout = () => {
    removeAdminToken();
    navigate("/admin/login");
  };

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition
     ${
       isActive
         ? "bg-orange-500 text-black"
         : "text-gray-400 hover:text-white hover:bg-white/10"
     }`;

  return (
    <div className="min-h-screen bg-black text-white flex">

      {/* ===== SIDEBAR ===== */}
      <aside className="w-64 border-r border-white/10 p-6 flex flex-col">
        
       
        <div className="mb-10">
          <h1 className="text-2xl font-black tracking-tight">
            Evolvera <span className="text-orange-500">Admin</span>
          </h1>
        </div>

        
        <nav className="flex-1 space-y-2">
          <NavLink to="/admin" end className={linkClass}>
            <LayoutDashboard size={18} /> Dashboard
          </NavLink>

          <NavLink to="/admin/events" className={linkClass}>
            <CalendarDays size={18} /> Events
          </NavLink>

          <NavLink to="/admin/registrations" className={linkClass}>
            <Users size={18} /> Registrations
          </NavLink>

          <NavLink to="/admin/gallery" className={linkClass}>
            <Image size={18} /> Gallery
          </NavLink>

          <NavLink to="/admin/contact" className={linkClass}>
            <Image size={18} /> Contact
          </NavLink>

        </nav>

        {/* LOGOUT */}
        <button
          onClick={logout}
          className="flex items-center gap-3 px-4 py-3 mt-6 rounded-xl
                     text-red-400 hover:bg-red-500/10 transition text-sm font-bold"
        >
          <LogOut size={18} />
          Logout
        </button>
      </aside>

      
      <main className="flex-1 p-10 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
