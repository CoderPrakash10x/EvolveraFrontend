export default function Divider({ className = "" }) {
  return <div className={`h-px w-full bg-white/10 ${className}`} role="separator" />;
}