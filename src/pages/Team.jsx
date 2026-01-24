import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Instagram, Linkedin, Github } from 'lucide-react';

const EvolveraTeam = () => {
  // 1. Team Data Array (Ensure all fields are present)
  const teamData = [
    {
      name: "Shivam Rai",
      role: "President",
      subRole: "Founder & Visionary Lead",
      bio: "Our mission is to bridge the gap between academic learning and industry-level innovation through a collaborative ecosystem.",
      img: "/president.jpeg", // Isse apne folder ke hisaab se check karein
      links: { linkedin: "https://linkedin.com/in/shivam", instagram: "#", github: "#" }
    },
    {
      name: "Phoenix Baker",
      role: "Engineering Lead",
      subRole: "Head of Technology",
      bio: "Focused on building scalable solutions and mentoring students to master modern tech stacks and competitive programming.",
      img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400",
      links: { linkedin: "https://linkedin.com", instagram: "https://instagram.com", github: "https://github.com" }
    },
    {
      name: "Lana Steiner",
      role: "COO",
      subRole: "Operations Manager",
      bio: "Streamlining event execution and ensuring every initiative by Evolvera reaches its maximum potential and impact.",
      img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400",
      links: { linkedin: "https://linkedin.com", instagram: "#", github: "#" }
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextMember = () => {
    setCurrentIndex((prev) => (prev + 1) % teamData.length);
  };

  const current = teamData[currentIndex];

  return (
    <div className="bg-black text-white font-sans overflow-hidden">
      
      {/* SECTION 1: DYNAMIC CORE LEADERSHIP */}
      <section className="py-32 px-6 min-h-screen flex flex-col justify-center relative">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-orange-600/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto w-full relative z-10">
          <header className="mb-24">
            <span className="text-[10px] uppercase tracking-[0.5em] text-orange-500 mb-4 block font-black">// Core Leadership</span>
            <h2 className="text-4xl md:text-8xl leading-[0.9] tracking-tighter max-w-5xl font-black uppercase">
              The <span className="italic font-serif font-light text-white/50">minds</span> behind <br/>
              <span className="text-orange-500 italic font-serif">cutting-edge</span> innovation.
            </h2>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-16 items-center">
            
            {/* Name & Role */}
            <div className="md:col-span-3 order-2 md:order-1">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.4 }}
                >
                   <h3 className="text-6xl font-serif italic text-orange-500 leading-none mb-2">{current.role}</h3>
                   <h4 className="text-4xl font-black tracking-tighter uppercase leading-none">{current.name}</h4>
                </motion.div>
              </AnimatePresence>
              
              <p className="text-xs uppercase tracking-[0.3em] text-gray-500 font-bold mt-4 mb-10">{current.subRole}</p>
              
              {/* Dynamic Socials */}
              <div className="flex gap-4">
                <a href={current.links.linkedin} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-orange-500 hover:text-black transition-all"><Linkedin size={18} /></a>
                <a href={current.links.instagram} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-orange-500 hover:text-black transition-all"><Instagram size={18} /></a>
                <a href={current.links.github} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-orange-500 hover:text-black transition-all"><Github size={18} /></a>
              </div>
            </div>

            {/* Profile Image */}
            <div className="md:col-span-5 relative order-1 md:order-2">
              <AnimatePresence mode="wait">
                <motion.div 
                  key={current.name}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  className="aspect-[4/5] rounded-[3rem] overflow-hidden bg-zinc-900 border border-white/5 relative group"
                >
                    <img src={current.img} alt={current.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                    <div className="absolute inset-0 border-[20px] border-black/20 pointer-events-none rounded-[3rem]" />
                </motion.div>
              </AnimatePresence>
              <div className="absolute -bottom-6 -right-6 bg-orange-500 text-black p-8 rounded-full font-black text-[10px] uppercase tracking-widest hidden md:block rotate-12">Evolvera <br/> Lead '25</div>
            </div>

            {/* Bio & Button */}
            <div className="md:col-span-4 flex flex-col justify-between h-full py-10 order-3">
              <AnimatePresence mode="wait">
                <motion.div 
                  key={current.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <p className="text-lg text-gray-400 leading-relaxed italic font-serif mb-12">"{current.bio}"</p>
                  <div className="w-20 h-[1px] bg-orange-500 mb-12" />
                </motion.div>
              </AnimatePresence>
              
              <div className="flex items-center gap-8">
                <span className="text-2xl font-black italic text-white/20 uppercase">0{currentIndex + 1} / 0{teamData.length}</span>
                <button onClick={nextMember} className="flex-grow h-16 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all group gap-4 active:scale-95">
                  <span className="text-xs font-black uppercase tracking-widest">Next Member</span>
                  <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: GRID VIEW (Corrected teamData map) */}
      <section className="py-40 px-6 bg-[#050505] relative border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <header className="max-w-4xl mb-32">
            <h2 className="text-6xl md:text-8xl font-black tracking-tighter mb-10 leading-[0.85] uppercase">Meet the <br/><span className="text-orange-500 italic font-serif font-light">Engineers</span> of Change.</h2>
            <p className="text-xl text-gray-500 leading-relaxed max-w-2xl border-l-2 border-orange-500 pl-8">An eclectic group of passionate students at <span className="text-white font-bold">Evolvera Club</span>.</p>
          </header>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-16">
            {teamData.map((member, i) => ( // Fixed: used teamData instead of teamMembers
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="group">
                <div className="aspect-[4/5] rounded-[2rem] overflow-hidden mb-8 bg-zinc-900 border border-white/5 relative">
                  <img src={member.img} alt={member.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                  <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black to-transparent opacity-80" />
                </div>
                <div className="relative pl-2">
                    <div className="absolute left-0 top-0 w-[2px] h-full bg-orange-500 scale-y-0 group-hover:scale-y-100 transition-transform origin-top duration-500" />
                    <h4 className="text-2xl font-black uppercase tracking-tighter mb-1 group-hover:text-orange-500">{member.name}</h4>
                    <p className="text-xs text-gray-500 uppercase tracking-[0.2em] font-bold italic font-serif">{member.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default EvolveraTeam;