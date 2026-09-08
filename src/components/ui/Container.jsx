export default function Container({ children, className = "", as: Tag = "div" }) {
  return <Tag className={`mx-auto w-full max-w-7xl px-6 ${className}`}>{children}</Tag>;
}
