import { Mail, Phone } from "lucide-react";
import Container from "./ui/Container";

const boardMembers = [
  {
    name: "Mr. Anurag Singh",
    role: "Assistant Professor",
    image: "/anuragsir.png",
    bio: "With over 8 years of teaching experience, Mr. Anurag Singh specializes in Natural Language Processing (NLP). He holds an M.Tech and is pursuing a Ph.D., guiding students toward advanced research and innovation in AI.",
    email: "anuragcse@kipm.edu.in",
    phone: "+91-9648368001",
  },
  {
    name: "Mr. Nitesh Kumar Jaiswal",
    role: "In-Charge – Training & Placement",
    image: "/niteshsir.png",
    bio: "KIPM’s T&P Cell connects students with industry through expert talks, visits, and training—building confidence, leadership, and career-ready skills.",
    email: "tpo.eng@kipm.edu.in",
    phone: "+91-9044514315",
  },
];

export default function OurBoardMembers() {
  return (
    <section className="border-t border-white/10 py-24 md:py-32">
      <Container>
        <h2 className="font-display text-4xl text-white md:text-5xl">Board members</h2>
        <p className="mt-4 max-w-xl text-sm text-neutral-400">
          Faculty and mentors who guide Evolvera toward serious research, industry, and professional practice.
        </p>

        <div className="mt-16 space-y-20">
          {boardMembers.map((m, i) => (
            <article
              key={m.email}
              className={`grid items-center gap-10 md:grid-cols-12 ${i % 2 !== 0 ? "md:[&>div:first-child]:order-2" : ""}`}
            >
              <div className="md:col-span-4">
                <img src={m.image} alt={m.name} className="aspect-[3/4] w-full object-cover" />
              </div>
              <div className="md:col-span-8">
                <h3 className="font-display text-3xl">{m.name}</h3>
                <p className="mt-2 text-sm text-orange-500">{m.role}</p>
                <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-neutral-400">{m.bio}</p>
                <div className="mt-6 space-y-2 text-sm text-neutral-300">
                  <a href={`mailto:${m.email}`} className="flex items-center gap-2 hover:text-orange-500">
                    <Mail size={14} /> {m.email}
                  </a>
                  <a href={`tel:${m.phone}`} className="flex items-center gap-2 hover:text-orange-500">
                    <Phone size={14} /> {m.phone}
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
