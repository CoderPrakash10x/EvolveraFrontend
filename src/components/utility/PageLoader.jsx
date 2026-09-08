export default function PageLoader() {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-ink" role="status" aria-live="polite">
      <div className="pointer-events-none absolute inset-0 glow-orange" />
      <div className="relative text-center">
        <p className="font-display text-4xl tracking-tight text-[#F5F5F5]">
          Evolvera<span className="text-orange-500">.</span>
        </p>
        <p className="mt-4 text-[11px] uppercase tracking-[0.28em] text-zinc-500">
          Loading
        </p>
      </div>
    </div>
  );
}
