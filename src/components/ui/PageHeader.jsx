import Container from "./Container";

export default function PageHeader({ eyebrow, title, children, tone = "orange" }) {
  const tones = {
    orange: "text-orange-500",
    blue: "text-electric",
    violet: "text-violetsoft",
    amber: "text-amberglow",
    muted: "text-zinc-500",
  };

  return (
    <header className="relative overflow-hidden border-b border-white/10 pt-28 pb-14 md:pt-36 md:pb-20">
      {tone === "orange" && <div className="pointer-events-none absolute inset-0 glow-orange opacity-50" />}
      {tone === "blue" && <div className="pointer-events-none absolute inset-0 glow-blue opacity-50" />}
      {tone === "violet" && <div className="pointer-events-none absolute inset-0 glow-violet opacity-50" />}
      {tone === "amber" && <div className="pointer-events-none absolute inset-0 glow-amber opacity-50" />}
      <Container className="relative">
        {eyebrow && (
          <p className={`mb-6 text-[11px] font-medium uppercase tracking-[0.28em] ${tones[tone] || tones.orange}`}>
            {eyebrow}
          </p>
        )}
        <h1 className="font-display max-w-5xl text-[clamp(2.6rem,8vw,6.8rem)] leading-[0.9] tracking-tight text-[#F5F5F5]">
          {title}
        </h1>
        {children && (
          <div className="mt-7 max-w-xl text-base leading-relaxed text-zinc-400">
            {children}
          </div>
        )}
      </Container>
    </header>
  );
}
