import React, { useRef } from "react";
import { motion, useScroll } from "framer-motion";
import { ArrowRight, Plus, Rocket, Cpu, Globe, Zap, Settings, Laptop } from "lucide-react";
// Note: Ensure EvolveraValues component also follows the theme
import EvolveraValues from "../components/utility/evlo";
import OurBoardMembers from "../components/Ourboardmember";

const EvolveraLanding = () => {
  const objectivesRef = useRef(null);
  
  // Updated Content Data
  const objectives = [
    {
      id: "01",
      title: "AI Implementation",
      desc: "Spread AI knowledge and promote real-world implementation across all engineering branches.",
    },
    {
      id: "02",
      title: "Collaborative Learning",
      desc: "Develop project-based and collaborative learning through cross-department teams.",
    },
    {
      id: "03",
      title: "Industry Insight",
      desc: "Conduct seminars and invite guest speakers from academia and industry leaders.",
    },
    {
      id: "04",
      title: "Empowerment",
      desc: "Empower students with leadership, soft skills, and networking opportunities.",
    },
    {
      id: "05",
      title: "Innovation",
      desc: "Build a generation of innovators, creators, and future tech leaders.",
    },
  ];

  const branches = [
    { name: "CSE", icon: <Laptop size={20}/>, text: "Explore AI, ML, and cross-domain projects enhancing problem-solving." },
    { name: "Mechanical", icon: <Settings size={20}/>, text: "Learn AI-driven robotics, design, and predictive maintenance." },
    { name: "Civil", icon: <Globe size={20}/>, text: "Use AI for structural analysis and smart city planning." },
    { name: "Electrical", icon: <Zap size={20}/>, text: "Work on smart grids, IoT, and energy optimization systems." },
    { name: "ECE", icon: <Cpu size={20}/>, text: "AI-based signal processing and hardware design skills." },
    { name: "AI/ML", icon: <Rocket size={20}/>, text: "Early exposure to futuristic tech and innovation foundation." },
  ];

  return (
    <div className="bg-[#000000] text-white min-h-screen font-['Poppins'] selection:bg-orange-500 selection:text-black">
       <section className="py-28 px-6 min-h-screen flex flex-col justify-center">
      {/* TOP BAR - Black & Orange Theme */}


      {/* HERO SECTION */}
      <section className="pt-25 pb-20 px-6 text-center bg-black">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 mb-8 border border-orange-500/30 px-4 py-1 rounded-full"
        >
          <span className="text-orange-500 font-bold text-xs">(01)</span>
          <span className="text-[10px] uppercase tracking-widest text-orange-200">
            Our Vision
          </span>
        </motion.div>

        <h1 className="text-6xl md:text-[8rem] font-bold tracking-tighter leading-[0.85] mb-12 uppercase">
          EVOLVERA <br />
          <span className="text-orange-500 italic font-light">Club</span>
        </h1>

        <p className="max-w-3xl mx-auto text-lg md:text-xl font-medium text-gray-400">
          "Evolvera aims to bridge the gap between theoretical learning and practical skills by fostering collaboration across all departments."
        </p>
      </section>

      {/* MODERN COLLABORATION */}
      <section className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-16 py-32 border-t border-orange-500/10">
        <div className="md:col-span-5 relative h-[450px]">
          <div className="absolute top-0 left-0 w-4/5 h-4/5 overflow-hidden rounded-2xl border border-orange-500/20">
            <img
              src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1000"
              className="w-full h-full object-cover opacity-80"
              alt="Collab"
            />
          </div>
          <div className="absolute bottom-0 right-0 w-3/5 h-3/5 border-4 border-black bg-orange-500 overflow-hidden rounded-2xl shadow-2xl flex items-center justify-center p-8">
             <p className="text-black font-bold text-xl leading-tight">WE NURTURE INNOVATORS.</p>
          </div>
        </div>

        <div className="md:col-span-7 flex flex-col justify-center">
          <h2 className="text-orange-500 text-sm font-bold uppercase tracking-[0.4em] mb-8 flex items-center gap-4">
            <span className="w-10 h-[1px] bg-orange-500"></span> Modern Collaboration
          </h2>
          <div className="space-y-6 text-gray-300 text-base leading-relaxed">
            <p>
              We blend creativity and technology to unite students from all engineering branches. 
              Through seminars, hackathons, and interdisciplinary projects, we build an ecosystem 
              where innovation thrives and boundaries fade.
            </p>
            <p className="text-orange-100/80">
              Evolvera empowers students to go beyond textbooks — to experiment, build, and showcase 
              talents on a collaborative platform where ideas are nurtured into reality.
            </p>
            <p className="text-red-500">Founded in 2025, Evolvera is driven by a vision to shape the next generation of innovators, creators, and tech leaders.</p>
          </div>
        </div>
      </section>

      <section>
        <OurBoardMembers/>
      </section>

      {/* BRANCH-WISE CONTRIBUTION (New Section) */}
      {/* BRANCH-WISE CONTRIBUTION - PREMIUM LOOK */}
<section className="relative py-36 px-6 bg-black overflow-hidden font-['Poppins']">

  {/* Ambient Background Lights */}
  <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-orange-500/10 rounded-full blur-[180px]" />
  <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-orange-500/5 rounded-full blur-[140px]" />

  <div className="max-w-7xl mx-auto relative z-10">

    {/* HEADER */}
    <div className="text-center mb-28">
      <motion.span
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="inline-block text-orange-500 text-[10px] font-semibold uppercase tracking-[0.6em] mb-6"
      >
        Interdisciplinary Impact
      </motion.span>

      <h3 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight">
        Branch-wise{" "}
        <span className="text-orange-500 relative">
          Contribution
          <span className="absolute -bottom-2 left-0 w-full h-[3px] bg-orange-500/30 blur-sm" />
        </span>
      </h3>
    </div>

    {/* CARDS */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-14">
      {branches.map((branch, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: i * 0.1 }}
          viewport={{ once: true }}
          whileHover={{ y: -14 }}
          className="relative group"
        >
          {/* Soft Outer Glow */}
          <div className="absolute inset-0 rounded-3xl bg-orange-500/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

          {/* Card */}
          <div className="relative h-full p-10 rounded-3xl bg-gradient-to-b from-[#0f0f0f] to-[#090909] border border-white/10 backdrop-blur-xl overflow-hidden transition-all duration-500 group-hover:border-orange-500/50">

            {/* Animated Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

            {/* Icon */}
            <div className="relative mb-10 inline-flex items-center justify-center">
              <div className="absolute w-16 h-16 rounded-full bg-orange-500/30 blur-xl scale-0 group-hover:scale-150 transition-transform duration-700" />
              <div className="relative text-orange-500 text-4xl transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                {branch.icon}
              </div>
            </div>

            {/* Title */}
            <h4 className="text-xl font-bold tracking-tight mb-4 transition-colors duration-500 group-hover:text-orange-500">
              {branch.name}
            </h4>

            {/* Description */}
            <p className="text-sm text-gray-500 leading-relaxed transition-colors duration-500 group-hover:text-gray-300">
              {branch.text}
            </p>

            {/* Bottom Progress Line */}
            <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-orange-500 to-orange-300 group-hover:w-full transition-all duration-700" />
          </div>
        </motion.div>
      ))}
    </div>
  </div>
</section>


      {/* OBJECTIVES - Black & Orange Inverse */}
   {/* OBJECTIVES - PREMIUM INDUSTRIAL LOOK */}
<section className="relative bg-black py-32 px-6 overflow-hidden font-['Poppins']">
  {/* Ambient Glow */}
  <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-orange-500/10 rounded-full blur-[180px]" />

  <div className="max-w-7xl mx-auto relative z-10">

    {/* Header */}
    <div className="grid md:grid-cols-2 gap-20 mb-24 items-start">
      <div>
        <span className="inline-block mb-6 px-4 py-1 rounded-full text-xs font-semibold tracking-wide bg-orange-500/10 text-orange-500">
          Evolvera
        </span>

        <h2 className="text-4xl md:text-6xl font-semibold tracking-tight text-white leading-tight">
          Beyond Classrooms,<br />
          <span className="text-orange-500">Toward Innovation</span>
        </h2>
      </div>

      <p className="text-gray-400 text-sm leading-relaxed max-w-md">
        Evolvera bridges theoretical learning and real-world innovation by
        empowering students across branches to collaborate, build, and lead
        with AI and modern technologies.
      </p>
    </div>

    {/* Cards */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

      {/* Card 1 */}
      <div className="group relative bg-[#0d0d0d] rounded-3xl p-6 border border-white/5 hover:border-orange-500/40 transition-all">
        <div className="h-44 rounded-2xl bg-gradient-to-br from-orange-500/30 to-orange-600/10 mb-6" />
        <h3 className="text-lg font-semibold text-white mb-2">
          AI & Innovation
        </h3>
        <p className="text-sm text-gray-400">
          Promote AI knowledge and hands-on implementation through workshops,
          projects, and research-driven learning.
        </p>
      </div>

      {/* Center CTA Card */}
      <div className="relative bg-[#0b0b0b] rounded-3xl p-10 border border-white/10 text-center flex flex-col justify-center">
        <h3 className="text-xl font-semibold text-white mb-4">
          Collaborative Ecosystem
        </h3>

        <p className="text-sm text-gray-400 mb-8">
          Build cross-department teams to solve real problems and create
          impactful solutions.
        </p>

        <button className="mx-auto px-6 py-3 rounded-full bg-orange-500 text-black font-semibold text-sm hover:scale-105 transition">
          Get Started ↗
        </button>
      </div>

      {/* Card 3 */}
      <div className="group relative bg-[#0d0d0d] rounded-3xl p-6 border border-white/5 hover:border-orange-500/40 transition-all">
        <div className="h-44 rounded-2xl bg-gradient-to-br from-orange-500/30 to-orange-600/10 mb-6" />
        <h3 className="text-lg font-semibold text-white mb-2">
          Leadership & Growth
        </h3>
        <p className="text-sm text-gray-400">
          Develop leadership, communication, and professional skills through
          events, seminars, and industry exposure.
        </p>
      </div>

    </div>
  </div>
</section>


      {/* PLANNED ACTIVITIES (New Section) */}
      <section className="py-32 px-6 bg-black">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-16 tracking-tight">PLANNED <span className="text-orange-500">ACTIVITIES</span></h2>
          <div className="flex flex-wrap justify-center gap-4">
            {["AI & ML Workshops", "Coding Battles", "Hackathons", "Product Challenges", "Leadership Sessions", "Industry Interaction", "Idea Showcases"].map((act, i) => (
              <span key={i} className="px-6 py-2 border border-orange-500/30 rounded-full text-xs font-semibold uppercase tracking-widest text-orange-500 hover:bg-orange-500 hover:text-black transition cursor-default">
                {act}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* DREAMS SECTION */}
      <section className="py-20 px-6 h-[91vh] border-t border-orange-500/20">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl md:text-7xl font-bold leading-[1.1] mb-12">
            WE'VE BUILT <span className="text-orange-500 italic">DREAMS</span>. <br />
            WE NURTURE <span className="text-orange-500 italic">INNOVATORS</span>.
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto mb-16">
            Everything you need to kickstart innovation — empowering students to collaborate, experiment, and create impactful tech solutions.
          </p>
          <div className="flex justify-center gap-8">
            <div className="w-64 h-80 bg-orange-500/10 rounded-2xl overflow-hidden border border-orange-500/20 grayscale hover:grayscale-0 transition-all duration-500">
               <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1000" className="w-full h-full object-cover" alt="team"/>
            </div>
            <div className="w-64 h-80 bg-orange-500/10 rounded-2xl overflow-hidden border border-orange-500/20 grayscale hover:grayscale-0 transition-all duration-500 mt-12">
               <img src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1000" className="w-full h-full object-cover" alt="team"/>
            </div>
          </div>
        </div>
      </section>
      </section>
      
    </div>
  );
};

export default EvolveraLanding;