import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

/* =====================================================
   NEW TEAM 2025-2026
   Folder: /public/NewTeams/
   ===================================================== */
const newTeam = [
  { role: "President",                  name: "Syed Faiz Jamal",    dept: "CSE",         img: "/NewTeams/Syed.jpg" },
  { role: "Vice President",             name: "Asmita Tripathi",    dept: "CSE (AI&ML)", img: "/NewTeams/AsmitaTripathi.jpg" },
  { role: "Secretary",                  name: "Bhupati Khetan",     dept: "ECE",          img: "/NewTeams/Bhupati.jpg" },
  { role: "Deputy Secretary",           name: "Amrita Singh",       dept: "CSE",          img: "/NewTeams/Amrita.png" },
  { role: "Treasurer",                  name: "Akshay Kumar",       dept: "CSE (AI&ML)", img: "/NewTeams/Akshay kumar cse(ai&ml).jpg" },
  { role: "Technical Head",             name: "Ayush Kumar",        dept: "CSE",          img: "/NewTeams/Ayush Kumar.jpg" },
  { role: "Technical Head",             name: "Prakash Dubey",      dept: "CSE",          img: "/NewTeams/prakash Dubey .jpg" },
  { role: "Management Head",            name: "Ankita Tripathi",    dept: "CSE (AI&ML)", img: "/NewTeams/Ankita.jpg" },
  { role: "Management Head",            name: "Alquma Ansari",      dept: "CSE (AI&ML)", img: "/NewTeams/Alquma Ansari (CSE AI_ML).jpg" },
  { role: "Management Head",            name: "Diwakar Kashyap",    dept: "EE",           img: "/NewTeams/Diwakar Kashyap(EE).png" },
  { role: "Social Media Head",          name: "Ashish Nishad",      dept: "EE",           img: "/NewTeams/Ashish.jpg" },
  { role: "Social Media Head",          name: "Ayush Singh",        dept: "CSE",          img: "/NewTeams/Ayush Singh (CSE).png" },
  { role: "Social Media Head",          name: "Sanchita Shukla",    dept: "CSE (AI&ML)", img: "/NewTeams/Sanchita shukla cse (ai_ml).jpg" },
  { role: "Innovation & Research Head", name: "Harsh Gupta",        dept: "AI&ML",        img: "/NewTeams/Harsh Gupta(AI-ML).jpeg" },
  { role: "Innovation & Research Head", name: "Jhanvi Srivastava",  dept: "AI&ML",        img: "/NewTeams/Jhanvi Srivastava (AI_ML).jpg" },
  { role: "Innovation & Research Head", name: "Sakshi Srivastav",   dept: "ECE",          img: "/NewTeams/Sakshi Srivastav (ECE).png" },
  { role: "Designing Head",             name: "Anmol Verma",        dept: "CSE",          img: "/NewTeams/Anmol Verma.jpg" },
  { role: "Designing Head",             name: "Ayush Gaur",         dept: "CSE",          img: "/NewTeams/ayush gaur.jpeg" },
  { role: "Designing Head",             name: "Priyanshu Sonkar",   dept: "CSE",          img: "/NewTeams/Priyanshu Sonkar.png" },
];

/* =====================================================
   PREVIOUS BATCH 2024-2025
   Folder: /public/Teams/
   ===================================================== */
const previousTeam = [
  { role: "President",                  name: "Siddhansh Pandey",   dept: "CSE (AIML)", img: "/Teams/Siddhansh Pandey.jpeg" },
  { role: "Vice President",             name: "Jaya Shukla",        dept: "CSE (AIML)", img: "/Teams/Jaya Shukla.jpeg" },
  { role: "Secretary",                  name: "Aniket Jaiswal",     dept: "CSE (AIML)", img: "/Teams/Aniket Jaiswal.jpeg" },
  { role: "Deputy Secretary",           name: "Raunak Singh",       dept: "CSE (AIML)", img: "/Teams/Raunak Singh.jpeg" },
  { role: "Management Head",            name: "Akash Sharma",       dept: "CSE (AIML)", img: "/Teams/Akash Singh.jpeg" },
  { role: "Management Head",            name: "Rashmi Singh",       dept: "CSE (B2)",   img: "/Teams/Rashmi Singh.jpeg" },
  { role: "Technical Head",             name: "Uday",               dept: "CSE (AIML)", img: "/Teams/Uday.jpeg" },
  { role: "Technical Head",             name: "Ankit Pratap Singh", dept: "CSE (B1)",   img: "/Teams/Ankit Pratap Singh.jpeg" },
  { role: "Social Media Head",          name: "Anurag Singh",       dept: "CE",         img: "/Teams/Anurak Singh.jpeg" },
  { role: "Social Media Head",          name: "Sneha Pandey",       dept: "EE",         img: "/Teams/Sneha Pandey.jpeg" },
  { role: "Innovation & Research Head", name: "Vivek Maurya",       dept: "CSE (AIML)", img: "/Teams/Vivek Kumar Maurya.jpeg" },
  { role: "Innovation & Research Head", name: "Shahnaz Parveen",    dept: "CSE (AIML)", img: "/Teams/Shahnaz Parveen.jpeg" },
  { role: "Project Head",               name: "Omkar Gupta",        dept: "ECE",        img: "/Teams/Omkar Gupta.jpeg" },
  { role: "Project Head",               name: "Priyanshi Singh",    dept: "CSE (AIML)", img: "/Teams/Priyanshi Singh.jpeg" },
];

/* =====================================================
   FOUNDERS
   Folder: /public/Teams/
   ===================================================== */
const founders = [
  { role: "President",        name: "Shivam Rai",       dept: "", img: "/Teams/Shivam Rai.jpeg" },
  { role: "Vice President",   name: "Najiya",           dept: "", img: "/Teams/najiya.jpeg" },
  { role: "Secretary",        name: "Mohammad Mughees", dept: "", img: "/Teams/Mohammad Mughees.jpeg" },
  { role: "Deputy Secretary", name: "Badal Singh",      dept: "", img: "/Teams/Badal Singh.jpeg" },
  { role: "Technical Head",   name: "Shubham Singh",    dept: "", img: "/Teams/Shubham Singh.jpeg" },
  { role: "Management Head",  name: "Halim Khan",       dept: "", img: "/Teams/Halim Khan.jpeg" },
  { role: "Project Head",     name: "Shivesh Tiwari",   dept: "", img: "/Teams/Shivesh Tiwari.jpeg" },
];

/* =====================================================
   ACTIVE CARD
   ===================================================== */
const ActiveCard = ({ member, index }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.04, ease: "easeOut" }}
      className="group relative"
    >
      <div className="absolute -inset-px bg-orange-500 rounded-2xl opacity-0 group-hover:opacity-25
                      blur-sm transition-all duration-500 pointer-events-none" />

      <div className="relative bg-zinc-950 border border-white/8 rounded-2xl overflow-hidden
                      group-hover:border-orange-500/50 transition-colors duration-300">

        <div className="relative overflow-hidden bg-zinc-900" style={{ aspectRatio: "3/4" }}>
          <img
            src={member.img}
            alt={member.name}
            onError={(e) => { e.currentTarget.src = "/Teams/placeholder.jpg"; }}
            className="w-full h-full object-cover object-top transition-transform duration-700"
            style={{ transform: "scale(1)" }}
            onMouseEnter={e => e.currentTarget.style.transform = "scale(1.08)"}
            onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
          />
          <div className="absolute inset-x-0 bottom-0 h-20 pointer-events-none"
            style={{ background: "linear-gradient(to top, #09090b, transparent)" }} />
          <div className="absolute top-3 left-3 right-3">
            <span className="inline-block bg-orange-500 text-black text-[8px]
                             font-black uppercase tracking-wider px-2 py-1 rounded-full
                             leading-tight max-w-full truncate">
              {member.role}
            </span>
          </div>
        </div>

        <div className="px-3 pt-2 pb-4">
          <h3 className="text-white font-black text-[13px] leading-snug
                         group-hover:text-orange-400 transition-colors duration-300">
            {member.name}
          </h3>
          {member.dept && (
            <p className="text-zinc-600 text-[10px] mt-0.5">{member.dept}</p>
          )}
        </div>

        <div className="absolute bottom-0 left-0 h-0.5 bg-orange-500 w-0
                        group-hover:w-full transition-all duration-500" />
      </div>
    </motion.div>
  );
};

/* =====================================================
   PAST CARD
   ===================================================== */
const PastCard = ({ member, index }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: index * 0.03, ease: "easeOut" }}
      className="group"
    >
      <div className="relative bg-zinc-950/50 border border-white/5 rounded-xl overflow-hidden
                      hover:border-white/15 transition-colors duration-300">
        <div className="relative overflow-hidden bg-zinc-900" style={{ aspectRatio: "3/4" }}>
          <img
            src={member.img}
            alt={member.name}
            onError={(e) => { e.currentTarget.src = "/Teams/placeholder.jpg"; }}
            className="w-full h-full object-cover object-top opacity-50 grayscale
                       transition-all duration-500 group-hover:opacity-75 group-hover:grayscale-0"
          />
          <div className="absolute inset-x-0 bottom-0 h-16 pointer-events-none"
            style={{ background: "linear-gradient(to top, #09090b, transparent)" }} />
          <div className="absolute top-2 left-2 right-2">
            <span className="inline-block bg-white/8 text-white/40 text-[8px]
                             font-bold uppercase tracking-wider px-2 py-0.5 rounded-full truncate max-w-full">
              {member.role}
            </span>
          </div>
        </div>
        <div className="px-3 pt-1.5 pb-3">
          <h3 className="text-zinc-500 font-bold text-xs leading-snug
                         group-hover:text-zinc-200 transition-colors duration-300">
            {member.name}
          </h3>
          {member.dept && (
            <p className="text-zinc-700 text-[9px] mt-0.5">{member.dept}</p>
          )}
        </div>
      </div>
    </motion.div>
  );
};

/* =====================================================
   MARQUEE
   ===================================================== */
const Marquee = ({ members }) => {
  const tripled = [...members, ...members, ...members];
  return (
    <div className="overflow-hidden py-5 border-y border-white/5 my-20 select-none">
      <motion.div
        className="flex gap-12 whitespace-nowrap w-max"
        animate={{ x: ["0px", "-33.33%"] }}
        transition={{ duration: 40, ease: "linear", repeat: Infinity }}
      >
        {tripled.map((m, i) => (
          <span key={i} className="text-white/8 font-black uppercase text-xl tracking-widest flex-shrink-0">
            {m.name}
            <span className="text-orange-500/20 mx-5">✦</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
};

/* =====================================================
   SECTION HERO
   ===================================================== */
const SectionHero = ({ batch, line1, line2, sub, dim = false }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, ease: "easeOut" }}
      className="mb-14 md:mb-20"
    >
      <div className="flex items-center gap-3 mb-5">
        <span className={`h-px w-8 ${dim ? "bg-white/10" : "bg-orange-500"}`} />
        <span className={`text-[10px] tracking-[0.5em] font-bold uppercase
          ${dim ? "text-zinc-700" : "text-orange-500"}`}>
          {batch}
        </span>
      </div>
      <h2 className={`font-black uppercase leading-none tracking-tighter
        text-5xl md:text-7xl lg:text-[5.5rem] ${dim ? "text-white/15" : "text-white"}`}>
        {line1}<br />
        <span className={dim ? "text-white/8" : "text-orange-500"}>{line2}</span>
      </h2>
      {sub && (
        <p className={`mt-5 text-sm max-w-sm leading-relaxed ${dim ? "text-zinc-700" : "text-zinc-500"}`}>
          {sub}
        </p>
      )}
    </motion.div>
  );
};

/* =====================================================
   STATS ROW
   ===================================================== */
const StatsRow = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const stats = [
    { value: newTeam.length,      label: "Active members" },
    { value: previousTeam.length, label: "Alumni" },
    { value: founders.length,     label: "Founders" },
    { value: 3,                   label: "Generations" },
  ];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/5
                 rounded-2xl overflow-hidden mb-28 mt-16"
    >
      {stats.map((s, i) => (
        <div key={i} className="bg-black py-8 md:py-10 flex flex-col items-center justify-center">
          <span className="text-4xl md:text-5xl font-black text-orange-500 leading-none">
            {s.value}
          </span>
          <span className="text-zinc-600 text-[10px] uppercase tracking-widest mt-2 text-center">
            {s.label}
          </span>
        </div>
      ))}
    </motion.div>
  );
};

/* =====================================================
   MAIN PAGE
   ===================================================== */
const EvolveraTeam = () => (
  <div className="bg-black text-white min-h-screen">

    {/* PAGE OPENER */}
    <section className="pt-32 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-orange-500 text-[10px] font-bold uppercase tracking-[0.6em] mb-8">
            Evolvera Club
          </p>
          <h1 className="font-black uppercase leading-none tracking-tighter
                         text-[clamp(3.5rem,12vw,8.5rem)]">
            The People<br />
            <span className="text-orange-500">Behind</span>
            <span className="text-white"> It.</span>
          </h1>
          <p className="mt-8 text-zinc-500 text-base max-w-sm leading-relaxed">
            Three generations. One mission.
            Meet every mind that has shaped Evolvera Club.
          </p>
        </motion.div>
        <StatsRow />
      </div>
    </section>

    {/* CURRENT TEAM */}
    <section className="px-6">
      <div className="max-w-7xl mx-auto">
        <SectionHero
          batch="2025 – 2026"
          line1="Current"
          line2="Team."
          sub="The new guard. Ambitious, relentless, building what comes next."
        />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {newTeam.map((m, i) => (
            <ActiveCard key={i} member={m} index={i} />
          ))}
        </div>
      </div>
    </section>

    {/* MARQUEE */}
    <Marquee members={[...newTeam, ...previousTeam]} />

    {/* PREVIOUS BATCH */}
    <section className="px-6 pb-28">
      <div className="max-w-7xl mx-auto">
        <SectionHero
          batch="2024 – 2025"
          line1="Previous"
          line2="Batch."
          sub="They set the bar. Every milestone we celebrate today started with them."
          dim
        />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-3">
          {previousTeam.map((m, i) => (
            <PastCard key={i} member={m} index={i} />
          ))}
        </div>
      </div>
    </section>

    {/* FOUNDERS */}
    <div className="border-t border-white/5">
      <section className="px-6 py-28">
        <div className="max-w-7xl mx-auto">
          <SectionHero
            batch="Founding Batch"
            line1="Where It"
            line2="Began."
            sub="Without their vision, none of this exists."
            dim
          />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 max-w-2xl">
            {founders.map((m, i) => (
              <PastCard key={i} member={m} index={i} />
            ))}
          </div>
        </div>
      </section>
    </div>

    {/* FOOTER CTA */}
    <div className="border-t border-white/5 text-center py-20 px-6">
      <p className="text-zinc-700 text-[10px] uppercase tracking-[0.5em] mb-3">Join the Club</p>
      <h3 className="text-2xl md:text-3xl font-black text-white">
        Want to be part of the next chapter?
      </h3>
      <a
        href="/contact"
        className="inline-block mt-7 px-8 py-3.5 bg-orange-500 text-black
                   font-black rounded-xl text-sm uppercase tracking-wider
                   hover:bg-white transition-colors duration-300"
      >
        Get in Touch →
      </a>
    </div>

  </div>
);

export default EvolveraTeam;