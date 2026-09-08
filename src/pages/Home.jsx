import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Hero from "../components/Hero";
import UpcomingEvents from "../components/utility/UpcomingEvents";
import HomeEventPopup from "../components/EventPopup";
import { getEvents } from "../services/event.service";
import Faq from "../components/EvolveraAbout";
import SponsorsMarquee from "../components/SponsorsMarquee";
import { asArray } from "../utils/normalize";
import API from "../utils/api";
import { optimizeCloudinaryUrl } from "../utils/media";
import { SPONSORS } from "../data/sponsors";
import { newTeam } from "../data/team";
import Reveal from "../components/ui/Reveal";
import Button from "../components/ui/Button";
import SectionHeading from "../components/ui/SectionHeading";
import Container from "../components/ui/Container";

const SYSTEMS = [
  { n: "01", title: "AI", copy: "Workshops and projects that treat models as tools, not slogans." },
  { n: "02", title: "Development", copy: "Full-stack systems, APIs, and products built in public by student teams." },
  { n: "03", title: "Robotics & engineering", copy: "Hardware, electronics, and mechanical work sitting next to software." },
];

const EXPERIMENTS = [
  { n: "04", title: "Projects", copy: "Cross-branch teams, real constraints, demos that have to work." },
  { n: "05", title: "Workshops", copy: "Hands-on sessions on tools the syllabus does not cover." },
  { n: "06", title: "Hackathons", copy: "Compressed sprints where ideas become working software overnight." },
];

const WORK = [
  { img: "/codecraft - Copy.webp", title: "Code Crafter", meta: "Competitive programming", tone: "text-electric" },
  { img: "/genai.webp", title: "Generative AI", meta: "Applied machine learning", tone: "text-electric" },
  { img: "/tech.webp", title: "Systems & software", meta: "Engineering practice", tone: "text-violetsoft" },
  { img: "/innovation.webp", title: "Innovation lab", meta: "Interdisciplinary builds", tone: "text-violetsoft" },
];

const BRANCHES = [
  { code: "01", name: "Computer Science", copy: "Software, systems, and applied AI across products students actually ship." },
  { code: "02", name: "Artificial Intelligence", copy: "Models, data, and research that leave the classroom and enter projects." },
  { code: "03", name: "Electronics", copy: "Signals, hardware, and intelligent systems at the edge." },
  { code: "04", name: "Electrical", copy: "Energy, IoT, and control — where infrastructure meets software." },
  { code: "05", name: "Mechanical", copy: "Robotics, design, and machines that think with sensors and code." },
  { code: "06", name: "Civil", copy: "Structure, cities, and analysis aided by computation." },
];

const Home = () => {
  const [events, setEvents] = useState([]);
  const [eventsLoading, setEventsLoading] = useState(true);
  const [galleries, setGalleries] = useState([]);

  useEffect(() => {
    getEvents()
      .then((data) => setEvents(asArray(data)))
      .catch(() => setEvents([]))
      .finally(() => setEventsLoading(false));

    API.get("/gallery/public")
      .then((res) => setGalleries(asArray(res.data).slice(0, 5)))
      .catch(() => setGalleries([]));
  }, []);

  const popupEvents = events.filter((e) => e.status !== "past").slice(0, 3);

  return (
    <>
      <HomeEventPopup events={popupEvents} />
      <Hero />

      <section className="relative border-t border-white/10 py-24 md:py-36">
        <Container>
          <Reveal>
            <p className="text-[11px] uppercase tracking-[0.28em] text-zinc-500">02 — Manifesto</p>
            <h2 className="mt-6 max-w-4xl font-display text-[clamp(2rem,5.5vw,4.6rem)] leading-[1.05] tracking-tight text-[#F5F5F5]">
              Evolvera is the place where theory is not enough.
            </h2>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-zinc-400">
              We exist to close the gap between classrooms and practice. Students from every engineering branch collaborate on AI, software, hardware, and research — building a culture that ships, presents, and learns in public.
            </p>
          </Reveal>
        </Container>
      </section>

      <section className="relative overflow-hidden border-t border-white/10 py-24 md:py-32">
        <div className="pointer-events-none absolute inset-0 glow-blue" />
        <Container className="relative">
          <SectionHeading
            index="03"
            eyebrow="Systems"
            title="AI, code, and machines."
            tone="blue"
            description="The technical core of the club — software, models, and hardware that have to work."
          />
          <div className="mt-16 grid gap-0 border-t border-electric/15 md:grid-cols-3">
            {SYSTEMS.map((item) => (
              <Reveal key={item.title} className="border-b border-white/10 py-10 md:border-b-0 md:border-r md:border-white/10 md:px-8 last:md:border-r-0">
                <p className="text-[11px] tabular-nums text-electric">{item.n}</p>
                <h3 className="mt-4 font-display text-2xl text-[#F5F5F5]">{item.title}</h3>
                <p className="mt-3 max-w-sm text-sm leading-relaxed text-zinc-400">{item.copy}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="relative overflow-hidden border-t border-white/10 py-24 md:py-32">
        <div className="pointer-events-none absolute inset-0 glow-violet" />
        <Container className="relative">
          <SectionHeading
            index="04"
            eyebrow="Innovation"
            title="Proof of practice."
            tone="violet"
            description="Selected moments from club events, labs, and builds — using the work we already have."
          />
          <div className="mt-10 mb-16 grid gap-0 border-t border-violetsoft/20 md:grid-cols-3">
            {EXPERIMENTS.map((item) => (
              <Reveal key={item.title} className="py-8 md:px-6">
                <p className="text-[11px] tabular-nums text-violetsoft">{item.n}</p>
                <h3 className="mt-3 font-display text-xl text-[#F5F5F5]">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">{item.copy}</p>
              </Reveal>
            ))}
          </div>
          <div className="grid gap-4 md:grid-cols-12">
            {WORK.map((item, i) => (
              <Reveal
                key={item.title}
                className={`group relative overflow-hidden bg-neutral-950 ${
                  i === 0 ? "md:col-span-7 md:h-[420px]" : i === 1 ? "md:col-span-5 md:h-[420px]" : "md:col-span-6 h-72"
                }`}
              >
                <img
                  src={item.img}
                  alt={item.title}
                  className="h-full w-full object-cover opacity-80 transition duration-700 group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 p-6">
                  <p className={`text-[11px] uppercase tracking-[0.2em] ${item.tone}`}>{item.meta}</p>
                  <h3 className="mt-2 font-display text-2xl text-white">{item.title}</h3>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <UpcomingEvents events={events} loading={eventsLoading} />

      <section className="relative border-t border-white/10 py-24 md:py-32">
        <Container>
          <div className="mb-12 flex items-end justify-between gap-6">
            <SectionHeading index="06" eyebrow="Archive" title="Gallery." tone="muted" />
            <Button to="/gallery" variant="text" className="hidden sm:inline-flex">
              All galleries <ArrowRight size={14} />
            </Button>
          </div>
          {galleries.length === 0 ? (
            <p className="text-sm text-zinc-500">Gallery moments appear here as events are archived.</p>
          ) : (
            <div className="grid grid-cols-2 gap-3 md:grid-cols-6">
              {galleries.map((g, i) => (
                <Link
                  key={g._id}
                  to={`/gallery/${g.slug}`}
                  className={`group relative overflow-hidden bg-neutral-950 grayscale transition duration-500 hover:grayscale-0 ${
                    i === 0 ? "col-span-2 row-span-2 min-h-[280px] md:col-span-3 md:min-h-[360px]" : "min-h-[160px] md:col-span-1"
                  }`}
                >
                  {g.cover?.url && (
                    <img
                      src={optimizeCloudinaryUrl(g.cover.url, 900)}
                      alt={g.title}
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                    />
                  )}
                  <div className="absolute inset-0 bg-black/35 transition group-hover:bg-black/10" />
                  <span className="absolute bottom-3 left-3 text-sm text-white">{g.title}</span>
                </Link>
              ))}
            </div>
          )}
        </Container>
      </section>

      <section className="relative border-t border-white/10 py-24 md:py-32">
        <Container>
          <SectionHeading index="07" eyebrow="Campus" title="Six branches. One table." />
          <div className="mt-16 divide-y border-y border-white/10">
            {BRANCHES.map((b) => (
              <Reveal key={b.code} className="grid grid-cols-1 items-baseline gap-2 py-8 md:grid-cols-12">
                <span className="text-sm tabular-nums text-orange-500 md:col-span-1">{b.code}</span>
                <h3 className="font-display text-2xl text-[#F5F5F5] md:col-span-4">{b.name}</h3>
                <p className="text-sm leading-relaxed text-zinc-400 md:col-span-7">{b.copy}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="relative overflow-hidden border-t border-white/10 py-24 md:py-32">
        <div className="pointer-events-none absolute inset-0 glow-amber" />
        <Container className="relative">
          <p className="text-[11px] uppercase tracking-[0.28em] text-amberglow">08 — Community</p>
          <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { n: "06", l: "Engineering branches" },
              { n: "01", l: "Community" },
              { n: String(newTeam.length).padStart(2, "0"), l: "Current core team" },
              { n: String(SPONSORS.length).padStart(2, "0"), l: "Sponsors" },
            ].map((s) => (
              <div key={s.l}>
                <p className="font-display text-6xl tracking-tight text-amberglow md:text-7xl">{s.n}</p>
                <p className="mt-3 text-sm text-zinc-500">{s.l}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <SponsorsMarquee />

      <section className="relative overflow-hidden border-t border-white/10 py-28 md:py-40">
        <div className="pointer-events-none absolute inset-0 glow-orange" />
        <Container className="relative text-center">
          <Reveal>
            <h2 className="font-display text-[clamp(2.4rem,7vw,6rem)] leading-[0.92] tracking-tight text-[#F5F5F5]">
              Build beyond
              <br />
              the syllabus.
            </h2>
            <div className="mt-10 flex justify-center gap-4">
              <Button to="/contact">
                Get in touch <ArrowRight size={16} />
              </Button>
              <Button to="/events" variant="ghost">
                Upcoming events
              </Button>
            </div>
          </Reveal>
        </Container>
      </section>

      <Faq />
    </>
  );
};

export default Home;
