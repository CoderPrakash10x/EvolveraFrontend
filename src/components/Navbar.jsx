import { NavLink, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { NAV_LINKS } from "../data/nav";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const desktopClass = ({ isActive }) =>
    `relative text-[13px] tracking-wide transition-colors after:absolute after:-bottom-1 after:left-0 after:h-px after:bg-orange-500 after:transition-all after:duration-300 ${
      isActive ? "text-white after:w-full" : "text-neutral-400 hover:text-white after:w-0"
    }`;

  return (
    <header
      className={`fixed top-0 left-0 z-50 w-full transition-colors duration-300 ${
        scrolled || open
          ? "border-b border-white/10 bg-ink/90 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6" aria-label="Primary">
        <NavLink to="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <img src="/evolvera.png" alt="Evolvera Club" className="h-8 w-auto object-contain" />
          <span className="hidden font-display text-sm tracking-tight text-white sm:block">Evolvera</span>
        </NavLink>

        <div className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <NavLink key={link.to} to={link.to} end={link.to === "/"} className={desktopClass}>
              {link.label}
            </NavLink>
          ))}
        </div>

        <button
          type="button"
          className="relative z-50 flex h-10 w-10 items-center justify-center md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">Menu</span>
          <span className="flex flex-col gap-1.5">
            <span className={`block h-px w-6 bg-white transition ${open ? "translate-y-[4px] rotate-45" : ""}`} />
            <span className={`block h-px w-6 bg-white transition ${open ? "-translate-y-[4px] -rotate-45" : ""}`} />
          </span>
        </button>
      </nav>

      <div
        className={`overflow-hidden border-t border-white/10 bg-black transition-[max-height] duration-300 md:hidden ${
          open ? "max-h-screen" : "max-h-0"
        }`}
      >
        <div className="flex min-h-[calc(100dvh-4rem)] flex-col justify-between px-6 py-10">
          <div className="flex flex-col gap-5">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/"}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `font-display text-4xl tracking-tight ${isActive ? "text-orange-500" : "text-white"}`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>
          <p className="text-xs uppercase tracking-[0.2em] text-neutral-500">KIPM College · Gorakhpur</p>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
