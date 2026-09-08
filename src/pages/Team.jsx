import { founders, newTeam, previousTeam } from "../data/team";
import PageHeader from "../components/ui/PageHeader";
import Container from "../components/ui/Container";
import Button from "../components/ui/Button";

function Member({ member, featured = false, muted = false }) {
  return (
    <article className={`group ${featured ? "md:col-span-2" : ""}`}>
      <div className={`overflow-hidden bg-neutral-950 ${featured ? "aspect-[4/5] md:aspect-[16/10]" : "aspect-[3/4]"}`}>
        <img
          src={member.img}
          alt={member.name}
          onError={(e) => {
            e.currentTarget.src = "/Teams/placeholder.jpg";
          }}
          className={`h-full w-full object-cover object-top transition duration-700 group-hover:scale-[1.03] ${
            muted ? "opacity-70 grayscale group-hover:grayscale-0 group-hover:opacity-100" : ""
          }`}
        />
      </div>
      <div className="mt-4 flex items-start justify-between gap-3">
        <div>
          <h3 className="font-display text-lg text-white md:text-xl">{member.name}</h3>
          {member.dept && <p className="mt-1 text-xs text-neutral-500">{member.dept}</p>}
        </div>
        <p className="max-w-[40%] text-right text-[11px] uppercase tracking-[0.12em] text-orange-500">
          {member.role}
        </p>
      </div>
    </article>
  );
}

export default function Team() {
  const featured = newTeam.slice(0, 2);
  const rest = newTeam.slice(2);

  return (
    <div className="bg-ink text-[#F5F5F5]">
      <PageHeader eyebrow="Team" title={<>The people<br />behind it.</>} tone="orange">
        Three generations. One mission. Meet every mind that has shaped Evolvera Club.
      </PageHeader>

      <Container className="py-16">
        <div className="grid grid-cols-2 gap-px bg-white/10 md:grid-cols-4">
          {[
            { value: newTeam.length, label: "Active core" },
            { value: previousTeam.length, label: "Previous batch" },
            { value: founders.length, label: "Founders" },
            { value: 3, label: "Generations" },
          ].map((s) => (
            <div key={s.label} className="bg-ink px-4 py-8">
              <p className="font-display text-4xl text-amberglow">{s.value}</p>
              <p className="mt-2 text-xs uppercase tracking-[0.16em] text-neutral-500">{s.label}</p>
            </div>
          ))}
        </div>
      </Container>

      <section className="border-t border-white/10 py-20">
        <Container>
          <p className="text-[11px] uppercase tracking-[0.28em] text-orange-500">2025 – 2026</p>
          <h2 className="mt-4 font-display text-4xl md:text-6xl">Current team.</h2>
          <div className="mt-14 grid grid-cols-1 gap-10 md:grid-cols-2">
            {featured.map((m) => (
              <Member key={m.name} member={m} featured />
            ))}
          </div>
          <div className="mt-10 grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
            {rest.map((m) => (
              <Member key={m.name + m.role} member={m} />
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-white/10 py-20">
        <Container>
          <p className="text-[11px] uppercase tracking-[0.28em] text-neutral-500">2024 – 2025</p>
          <h2 className="mt-4 font-display text-4xl text-white/80">Previous batch.</h2>
          <div className="mt-14 grid grid-cols-2 gap-6 md:grid-cols-4 lg:grid-cols-7">
            {previousTeam.map((m) => (
              <Member key={m.name} member={m} muted />
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-white/10 py-20">
        <Container>
          <p className="text-[11px] uppercase tracking-[0.28em] text-neutral-500">Founding batch</p>
          <h2 className="mt-4 font-display text-4xl">Where it began.</h2>
          <div className="mt-14 grid grid-cols-2 gap-6 md:grid-cols-4">
            {founders.map((m) => (
              <Member key={m.name} member={m} muted />
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-white/10 py-20 text-center">
        <Container>
          <h3 className="font-display text-3xl">Want to be part of the next chapter?</h3>
          <div className="mt-8">
            <Button to="/contact">Get in touch</Button>
          </div>
        </Container>
      </section>
    </div>
  );
}
