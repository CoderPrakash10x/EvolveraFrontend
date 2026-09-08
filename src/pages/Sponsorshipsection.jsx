import { SPONSORS } from "../data/sponsors";
import PageHeader from "../components/ui/PageHeader";
import Container from "../components/ui/Container";
import Button from "../components/ui/Button";

export default function SponsorsSection() {
  return (
    <section className="min-h-screen bg-ink text-[#F5F5F5]">
      <PageHeader eyebrow="Sponsors" title="Partners in the work." tone="muted">
        Organizations that believe in students building beyond the syllabus — events, hackathons, and community.
      </PageHeader>

      <Container className="py-16 md:py-24">
        <div className="grid grid-cols-1 divide-y border border-white/10 sm:grid-cols-2 lg:grid-cols-3">
          {SPONSORS.map((sponsor) => (
            <article key={sponsor.id} className="flex flex-col items-start gap-6 p-8 sm:p-10">
              <div className="flex h-24 w-full items-center justify-center bg-white/[0.03] p-4">
                {sponsor.image ? (
                  <img
                    src={sponsor.image}
                    alt={sponsor.name}
                    className="max-h-16 max-w-full object-contain"
                  />
                ) : (
                  <span className="text-orange-500">{sponsor.name}</span>
                )}
              </div>
              <div>
                <h3 className="font-display text-xl">{sponsor.name}</h3>
                <p className="mt-2 text-sm text-neutral-500">{sponsor.description}</p>
                {sponsor.website && (
                  <a
                    href={sponsor.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-block text-sm text-orange-500"
                  >
                    Visit website
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>

        <div className="mt-24 border-t border-white/10 pt-16 md:flex md:items-end md:justify-between">
          <div>
            <h3 className="font-display text-3xl md:text-4xl">Become a sponsor</h3>
            <p className="mt-4 max-w-xl text-neutral-400">
              Partner with Evolvera Club and connect with builders through events, hackathons, and community initiatives.
            </p>
          </div>
          <Button to="/contact" className="mt-8 md:mt-0">
            Get in touch
          </Button>
        </div>
      </Container>
    </section>
  );
}
