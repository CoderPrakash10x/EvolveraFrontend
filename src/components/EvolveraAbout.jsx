import { useState } from "react";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    q: "What is Evolvera Club?",
    a: "Evolvera is a student-led, innovation-driven club focused on Artificial Intelligence, Machine Learning, and interdisciplinary collaboration across all engineering branches."
  },
  {
    q: "Who can join Evolvera?",
    a: "Students from all branches and all academic years can join Evolvera. The club is inclusive and open to everyone passionate about technology and innovation."
  },
  {
    q: "What makes Evolvera different from other clubs?",
    a: "Unlike department-specific societies, Evolvera focuses on cross-branch collaboration, real-world AI projects, leadership development, and industry exposure."
  },
  {
    q: "Does Evolvera help in career growth?",
    a: "Yes. Through workshops, hackathons, projects, expert talks, and leadership roles, students gain both technical and professional skills."
  },
  {
    q: "Are there any fees to join Evolvera?",
    a: "No. Evolvera is a student initiative and joining the club is completely free."
  }
];

const Faq = () => {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="bg-black text-white py-32 px-6">
      <div className="max-w-5xl mx-auto">

       
        <div className="mb-20">
          <h2 className="text-5xl md:text-6xl font-black mb-6">
            Frequently Asked <span className="text-orange-500">Questions</span>
          </h2>
          <p className="text-gray-400 max-w-2xl">
            Everything you need to know about Evolvera Club.
          </p>
        </div>

       
        <div className="divide-y divide-white/10 border-t border-white/10">
          {faqs.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={i} className="py-6">
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full flex justify-between items-center text-left gap-6"
                >
                  <span className="text-lg md:text-xl font-semibold">
                    {item.q}
                  </span>
                  <span className="flex-shrink-0 w-10 h-10 rounded-full border border-white/10 flex items-center justify-center
                                   hover:border-orange-500 transition">
                    {isOpen ? (
                      <Minus className="text-orange-500" size={18} />
                    ) : (
                      <Plus size={18} />
                    )}
                  </span>
                </button>

              
                <div
                  className={`grid transition-all duration-300 ${
                    isOpen ? "grid-rows-[1fr] mt-4" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="text-gray-400 leading-relaxed max-w-4xl">
                      {item.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default Faq;
