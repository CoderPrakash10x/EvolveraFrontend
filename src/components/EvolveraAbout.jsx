import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import Container from "./ui/Container";

const faqs = [
  {
    q: "What is Evolvera Club?",
    a: "Evolvera is a student-led, innovation-driven club focused on Artificial Intelligence, Machine Learning, and interdisciplinary collaboration across all engineering branches.",
  },
  {
    q: "Who can join Evolvera?",
    a: "Students from all branches and all academic years can join Evolvera. The club is inclusive and open to everyone passionate about technology and innovation.",
  },
  {
    q: "What makes Evolvera different from other clubs?",
    a: "Unlike department-specific societies, Evolvera focuses on cross-branch collaboration, real-world AI projects, leadership development, and industry exposure.",
  },
  {
    q: "Does Evolvera help in career growth?",
    a: "Yes. Through workshops, hackathons, projects, expert talks, and leadership roles, students gain both technical and professional skills.",
  },
  {
    q: "Are there any fees to join Evolvera?",
    a: "No. Evolvera is a student initiative and joining the club is completely free.",
  },
];

const Faq = () => {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="border-t border-white/10 py-24 md:py-32">
      <Container>
        <h2 className="font-display text-4xl text-white md:text-5xl">Questions people actually ask.</h2>
        <div className="mt-14 divide-y border-y border-white/10">
          {faqs.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={item.q} className="py-6">
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-6 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="font-display text-lg text-white md:text-xl">{item.q}</span>
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center border border-white/15 text-neutral-400">
                    {isOpen ? <Minus size={14} /> : <Plus size={16} />}
                  </span>
                </button>
                <div className={`grid transition-all duration-300 ${isOpen ? "mt-4 grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                  <div className="overflow-hidden">
                    <p className="max-w-2xl text-[15px] leading-relaxed text-neutral-400">{item.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
};

export default Faq;
