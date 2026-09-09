import { SPONSORS } from "../data/sponsors";
import Container from "./ui/Container";
import { Link } from "react-router-dom";

function SponsorLogo({ sponsor }) {
  return (
    <div className="flex h-20 min-w-[200px] items-center justify-center border border-white/10 px-8">
      <img
        src={sponsor.image}
        alt={sponsor.name}
        loading="lazy"
        decoding="async"
        className="max-h-12 max-w-[160px] object-contain opacity-70 grayscale transition duration-500 hover:opacity-100 hover:grayscale-0"
      />
    </div>
  );
}

export default function SponsorsMarquee() {
  return (
    <section className="border-y border-white/10 py-16">
      <Container>
        <div className="mb-8 flex items-center justify-between">
          <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-orange-500">
            02 — Sponsors
          </p>
          <Link to="/sponsor" className="text-sm text-neutral-400 hover:text-white">
            View all
          </Link>
        </div>
        <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
          <div className="sponsor-marquee flex w-max">
            {[0, 1].map((group) => (
              <div key={group} className="flex shrink-0 gap-4 pr-4" aria-hidden={group === 1}>
                {SPONSORS.map((sponsor) => (
                  <SponsorLogo key={`${group}-${sponsor.id}`} sponsor={sponsor} />
                ))}
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
