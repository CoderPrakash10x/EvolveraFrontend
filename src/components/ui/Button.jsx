import { Link } from "react-router-dom";

const variants = {
  primary:
    "bg-orange-500 text-black hover:bg-white hover:scale-[1.02] hover:shadow-[0_0_28px_rgba(249,115,22,0.28)]",
  ghost:
    "border border-white/15 text-white hover:border-orange-500 hover:text-orange-500",
  text: "text-white hover:text-orange-500 px-0 py-0",
};

export default function Button({
  to,
  href,
  children,
  variant = "primary",
  className = "",
  ...props
}) {
  const cls = `group inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold tracking-tight transition duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 focus-visible:ring-offset-black disabled:opacity-50 ${variants[variant] || variants.primary} ${className}`;

  if (to) {
    return (
      <Link to={to} className={cls} {...props}>
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={cls} {...props}>
        {children}
      </a>
    );
  }

  return (
    <button className={cls} {...props}>
      {children}
    </button>
  );
}
