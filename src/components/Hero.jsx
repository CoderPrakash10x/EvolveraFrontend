import { lazy, Suspense } from "react";
import { ArrowRight } from "lucide-react";
import Button from "./ui/Button";

const WireframeScene = lazy(() => import("./WireframeScene"));

export default function Hero() {
  return (
    <section className="relative isolate min-h-[100svh] overflow-hidden bg-ink">
      <div className="pointer-events-none absolute inset-0 grid-fine opacity-40" />
      <div className="pointer-events-none absolute inset-0 glow-orange" />
      <div className="pointer-events-none absolute inset-0 glow-blue" />
      <div className="pointer-events-none absolute inset-0 glow-violet opacity-80" />
      <div className="pointer-events-none absolute inset-0 noise" />

      <div className="pointer-events-none absolute inset-0 opacity-70">
        <Suspense fallback={null}>
          <WireframeScene />
        </Suspense>
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-ink via-ink/80 to-ink/15" />

      <div className="relative mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-end px-6 pb-16 pt-28 md:justify-center md:pb-24 md:pt-32">
        <p className="mb-6 text-[11px] font-medium uppercase tracking-[0.28em] text-orange-500">
          KIPM College · Student engineering society
        </p>

        <h1 className="font-display text-[clamp(3.4rem,14vw,9.5rem)] leading-[0.82] tracking-tight text-[#F5F5F5]">
          Evolvera.
        </h1>

        <p className="mt-8 max-w-xl text-lg leading-relaxed text-zinc-300 md:text-xl">
          Six engineering branches. One community. Real projects, AI, and innovation — engineering beyond the syllabus.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <Button to="/events">
            View events
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
          </Button>
          <Button to="/about" variant="ghost">
            About the club
          </Button>
        </div>

        <dl className="mt-16 grid max-w-lg grid-cols-3 gap-6 border-t border-white/10 pt-6 text-[11px] uppercase tracking-[0.18em] text-zinc-500">
          <div>
            <dt>Campus</dt>
            <dd className="mt-1 text-[#F5F5F5]">Gorakhpur</dd>
          </div>
          <div>
            <dt>Branches</dt>
            <dd className="mt-1 text-[#F5F5F5]">CSE · ECE · ME · CE · EE · AI</dd>
          </div>
          <div>
            <dt>Focus</dt>
            <dd className="mt-1 text-[#F5F5F5]">Build, ship, learn</dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
