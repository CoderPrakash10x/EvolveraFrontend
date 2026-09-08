export default function SectionHeading({
  index,
  eyebrow,
  title,
  description,
  className = "",
  tone = "orange",
}) {
  const tones = {
    orange: "text-orange-500",
    blue: "text-electric",
    violet: "text-violetsoft",
    amber: "text-amberglow",
    muted: "text-neutral-500",
  };

  return (
    <div className={className}>
      {eyebrow && (
        <p className={`mb-5 flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.28em] ${tones[tone] || tones.orange}`}>
          {index && <span className="tabular-nums text-white/40">{index}</span>}
          {eyebrow}
        </p>
      )}
      <h2 className="font-display text-3xl tracking-tight text-[#F5F5F5] sm:text-4xl md:text-5xl lg:text-[3.4rem] leading-[1.05]">
        {title}
      </h2>
      {description && (
        <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-zinc-400">
          {description}
        </p>
      )}
    </div>
  );
}
