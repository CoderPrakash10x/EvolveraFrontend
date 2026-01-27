import { motion } from "framer-motion";
import { Mail, Phone } from "lucide-react";

const boardMembers = [
  {
    name: "Mr. Anurag Singh",
    role: "Assistant Professor",
    image: "/anuragsir.png",
    bio: "With over 8 years of teaching experience, Mr. Singh specializes in Natural Language Processing (NLP). He holds an M.Tech and is pursuing a Ph.D., guiding students toward advanced research and innovation in AI.",
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
    <section className="bg-black py-32 px-6">
      <div className="max-w-6xl mx-auto">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="text-4xl md:text-5xl text-white font-extrabold">
           OUR BOARD <span className="text-orange-500">MEMBERS</span>
          </h2>
          <p className="mt-4 max-w-xl text-gray-400 text-sm">
            Meet the visionaries behind Evolvera Club who guide students toward innovation and excellence.
          </p>
        </motion.div>

        {/* Members */}
        <div className="space-y-16">
          {boardMembers.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className={`flex flex-col md:flex-row ${
                i % 2 !== 0 ? "md:flex-row-reverse" : ""
              } items-center gap-10`}
            >
              {/* Image */}
              <div className="relative w-60 h-72 rounded-2xl overflow-hidden border border-white/10">
                <img
                  src={m.image}
                  alt={m.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent" />
              </div>

              {/* Content */}
              <div className="flex-1 bg-[#0c0c0c] border border-white/10 rounded-2xl p-8">
                <h3 className="text-2xl font-bold mb-1">
                  {m.name}
                </h3>

                <p className="text-orange-400 text-sm font-medium mb-4">
                  {m.role}
                </p>

                <p className="text-gray-400 text-sm leading-relaxed mb-6">
                  {m.bio}
                </p>

                <div className="flex flex-col gap-3 text-sm text-gray-300">
                  <div className="flex items-center gap-2">
                    <Mail size={15} className="text-orange-500" />
                    {m.email}
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone size={15} className="text-orange-500" />
                    {m.phone}
                  </div>
                </div>
              </div>

            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
