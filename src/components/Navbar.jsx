import { NavLink } from "react-router-dom"
import { useEffect, useState } from "react"

const Navbar = () => {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto"
  }, [open])

  const linkClass = ({ isActive }) =>
    `block w-full px-4 py-3 rounded-xl text-sm transition
     ${isActive
       ? "text-white bg-orange-500/20"
       : "text-gray-300 hover:text-white hover:bg-white/10"}`

  return (
    <nav className="fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">

        {/* Navbar Bar */}
        <div className="flex items-center justify-between rounded-full
          bg-black/40 backdrop-blur-xl border border-white/20
          px-5 sm:px-6 py-3 shadow-xl shadow-black/40">

          {/* Logo */}
          <NavLink to="/" onClick={() => setOpen(false)}>
            <img
              src="/evolvera.png"
              alt="Evolvera Logo"
              className="h-8 sm:h-9 object-contain"
            />
          </NavLink>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-3">
            {["/", "/about", "/events", "/gallery", "/team", "/contact"].map((path, i) => (
              <NavLink
                key={i}
                to={path}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-full text-sm transition
                  ${isActive
                    ? "text-white bg-orange-500/20"
                    : "text-gray-300 hover:text-white hover:bg-white/10"}`
                }
              >
                {path === "/" ? "Home" : path.replace("/", "").toUpperCase()}
              </NavLink>
            ))}
          </div>

          {/* Mobile Button */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-white"
          >
            <div className="space-y-1.5">
              <span className={`block w-6 h-0.5 bg-white transition ${open && "rotate-45 translate-y-2"}`} />
              <span className={`block w-6 h-0.5 bg-white transition ${open && "opacity-0"}`} />
              <span className={`block w-6 h-0.5 bg-white transition ${open && "-rotate-45 -translate-y-2"}`} />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Overlay */}
      <div
        className={`md:hidden fixed inset-0 bg-black/60 backdrop-blur-xl
        transition-all duration-300
        ${open ? "opacity-100 visible" : "opacity-0 invisible"}`}
        onClick={() => setOpen(false)}
      />

      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed top-[88px] left-0 w-full px-4
        transition-all duration-300
        ${open ? "translate-y-0 opacity-100" : "-translate-y-6 opacity-0 pointer-events-none"}`}
      >
        <div className="bg-black/80 border border-white/20 rounded-3xl p-4 space-y-2 shadow-2xl">
          <NavLink onClick={() => setOpen(false)} to="/" className={linkClass}>Home</NavLink>
          <NavLink onClick={() => setOpen(false)} to="/about" className={linkClass}>About</NavLink>
          <NavLink onClick={() => setOpen(false)} to="/events" className={linkClass}>Events</NavLink>
          <NavLink onClick={() => setOpen(false)} to="/gallery" className={linkClass}>Gallery</NavLink>
          <NavLink onClick={() => setOpen(false)} to="/team" className={linkClass}>Team</NavLink>
          <NavLink onClick={() => setOpen(false)} to="/contact" className={linkClass}>Contact</NavLink>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
