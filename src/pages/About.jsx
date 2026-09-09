import OurBoardMembers from "../components/Ourboardmember";
import PageHeader from "../components/ui/PageHeader";
import Container from "../components/ui/Container";
import Reveal from "../components/ui/Reveal";
import Button from "../components/ui/Button";

const objectives = [
  { id: "01", title: "AI Implementation", desc: "Spread AI knowledge and promote real-world implementation across all engineering branches." },
  { id: "02", title: "Collaborative Learning", desc: "Develop project-based and collaborative learning through cross-department teams." },
  { id: "03", title: "Industry Insight", desc: "Conduct seminars and invite guest speakers from academia and industry leaders." },
  { id: "04", title: "Empowerment", desc: "Empower students with leadership, soft skills, and networking opportunities." },
  { id: "05", title: "Innovation", desc: "Build a generation of innovators, creators, and future tech leaders." },
];

const branches = [
  { name: "Computer Science", text: "Explore AI, ML, and cross-domain projects that sharpen problem-solving." },
  { name: "Mechanical", text: "Learn AI-driven robotics, design, and predictive maintenance." },
  { name: "Civil", text: "Use computation for structural analysis and smarter planning." },
  { name: "Electrical", text: "Work on smart grids, IoT, and energy optimization systems." },
  { name: "ECE", text: "Signal processing, hardware, and intelligent embedded systems." },
  { name: "AI / ML", text: "Early, serious exposure to research, models, and applied intelligence." },
];

const activities = [
  "AI & ML Workshops",
  "Coding Battles",
  "Hackathons",
  "Product Challenges",
  "Leadership Sessions",
  "Industry Interaction",
  "Idea Showcases",
];

export default function About() {
  return (
    <div className="bg-ink text-[#F5F5F5]">
      <PageHeader eyebrow="About" title={<>Engineering<br />beyond the syllabus.</>}>
        Evolvera aims to bridge the gap between theoretical learning and practical skills by fostering collaboration across all departments.
      </PageHeader>

      <section className="relative overflow-hidden py-24 md:py-32">
        <div className="pointer-events-none absolute inset-0 glow-violet opacity-70" />
        <Container className="relative grid gap-16 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <div className="grid grid-cols-2 gap-3">
              <img src="/card1.jpg" alt="Evolvera workshop" className="h-64 w-full object-cover" />
              <img src="/card2.webp" alt="Evolvera community" className="mt-10 h-64 w-full object-cover" />
            </div>
          </Reveal>
          <Reveal className="lg:col-span-7">
            <p className="text-[11px] uppercase tracking-[0.28em] text-violetsoft">Why we exist</p>
            <h2 className="mt-6 font-display text-4xl tracking-tight md:text-5xl">
              We nurture innovators.
            </h2>
            <div className="mt-8 space-y-5 text-[15px] leading-relaxed text-neutral-400">
              <p>
                We blend creativity and technology to unite students from all engineering branches. Through seminars, hackathons, and interdisciplinary projects, we build an ecosystem where innovation thrives and boundaries fade.
              </p>
              <p>
                Evolvera empowers students to go beyond textbooks — to experiment, build, and showcase talent on a collaborative platform where ideas are nurtured into reality.
              </p>
              <p className="text-amberglow">
                Founded in 2025, Evolvera is driven by a vision to shape the next generation of innovators, creators, and tech leaders.
              </p>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="relative overflow-hidden border-y border-white/10 py-24">
        <div className="pointer-events-none absolute inset-0 glow-blue opacity-80" />
        <Container className="relative">
          <p className="text-[11px] uppercase tracking-[0.28em] text-electric">Mission & vision</p>
          <div className="mt-12 grid gap-12 md:grid-cols-2">
            <div>
              <h3 className="font-display text-3xl">Mission</h3>
              <p className="mt-4 text-neutral-400 leading-relaxed">
                Spread applied AI and modern engineering practice across every branch — not as a specialty club, but as a shared culture of building.
              </p>
            </div>
            <div>
              <h3 className="font-display text-3xl">Vision</h3>
              <p className="mt-4 text-neutral-400 leading-relaxed">
                A generation of students who can collaborate across disciplines, ship real work, and lead with both technical depth and professional skill.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-24 md:py-32">
        <Container>
          <h2 className="font-display text-4xl md:text-5xl">What students actually do.</h2>
          <ol className="mt-16 divide-y border-y border-white/10">
            {objectives.map((o) => (
              <li key={o.id} className="grid grid-cols-1 gap-3 py-10 md:grid-cols-12">
                <span className={`md:col-span-2 ${o.id === "01" ? "text-electric" : o.id === "05" ? "text-violetsoft" : "text-orange-500"}`}>{o.id}</span>
                <h3 className="font-display text-2xl md:col-span-4">{o.title}</h3>
                <p className="text-sm leading-relaxed text-neutral-400 md:col-span-6">{o.desc}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <OurBoardMembers />

      <section className="border-t border-white/10 py-24 md:py-32">
        <Container>
          <h2 className="font-display text-4xl md:text-5xl">Six branches, one culture.</h2>
          <div className="mt-16 grid gap-px bg-white/10 md:grid-cols-3">
            {branches.map((b) => (
              <div key={b.name} className="bg-ink p-8">
                <h3 className="font-display text-xl">{b.name}</h3>
                <p className="mt-3 text-sm leading-relaxed text-neutral-400">{b.text}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-white/10 py-24">
        <Container className="grid gap-16 md:grid-cols-2">
          <div>
            <img src="/genai.webp" alt="AI and innovation at Evolvera" className="h-72 w-full object-cover" />
            <h3 className="mt-6 font-display text-2xl">AI & innovation</h3>
            <p className="mt-3 text-sm text-neutral-400">
              Promote AI knowledge and hands-on implementation through workshops, projects, and research-driven learning.
            </p>
          </div>
          <div>
            <img src="/innovation.webp" alt="Leadership and growth" className="h-72 w-full object-cover" />
            <h3 className="mt-6 font-display text-2xl">Leadership & growth</h3>
            <p className="mt-3 text-sm text-neutral-400">
              Develop leadership, communication, and professional skills through events, seminars, and industry exposure.
            </p>
          </div>
        </Container>
      </section>

      <section className="border-t border-white/10 py-24">
        <Container>
          <h2 className="font-display text-4xl">Planned activities</h2>
          <div className="mt-10 flex flex-wrap gap-3">
            {activities.map((act) => (
              <span key={act} className="border border-white/15 px-4 py-2 text-xs uppercase tracking-[0.16em] text-neutral-300">
                {act}
              </span>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-white/10 py-28 text-center">
        <Container>
          <h2 className="font-display text-[clamp(2rem,6vw,4.5rem)] leading-[1] tracking-tight">
            We&apos;ve built dreams.
            <br />
            We nurture innovators.
          </h2>
          <p className="mx-auto mt-8 max-w-xl text-neutral-400">
            Everything you need to kickstart innovation — empowering students to collaborate, experiment, and create impactful tech solutions.
          </p>
          <div className="mt-10">
            <Button to="/contact">Get started</Button>
          </div>
        </Container>
      </section>
    </div>
  );
}
