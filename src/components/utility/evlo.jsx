import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Sprout } from 'lucide-react';

const EvolveraValues = () => {
  const stats = [
    { value: "200+", label: "Projects Completed" },
    { value: "150+", label: "Satisfied Clients" },
    { value: "50+", label: "Industry Awards" },
  ];

  return (
    <div className="bg-[#0a0a0a] text-white min-h-screen font-sans p-6 md:p-12 selection:bg-orange-500">
      <div className="max-w-7xl mx-auto">
        
        {/* --- Header Section --- */}
        <header className="flex flex-col md:flex-row justify-between items-start mb-12 gap-6">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter leading-tight max-w-md">
            Our Story, Vision, and Values
          </h1>
          <p className="text-gray-400 text-xs uppercase tracking-[0.2em] max-w-[280px] leading-relaxed pt-4">
            Learn about our commitment to excellence, innovation, and the principles that guide our work every day.
          </p>
        </header>

        {/* --- Hero Image with Scroll Button --- */}
        <div className="relative w-full h-[400px] md:h-[500px] rounded-[3rem] overflow-hidden mb-20 group">
          <img 
            src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1528&auto=format&fit=crop" 
            alt="Abstract Vision" 
            className="w-full h-full object-cover grayscale transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute bottom-8 right-8">
            <button className="w-16 h-16 md:w-20 md:h-20 bg-orange-500 rounded-3xl flex items-center justify-center hover:bg-orange-600 transition-colors shadow-2xl">
              <ArrowDown className="text-black" size={32} />
            </button>
          </div>
        </div>

        {/* --- Content Grid --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start mb-24">
          
          {/* Left Column: Quote & Image */}
          <div className="space-y-12">
            <div className="relative">
              <span className="text-8xl font-serif text-orange-500/20 absolute -top-10 -left-4">“</span>
              <p className="text-xl md:text-2xl text-gray-300 leading-relaxed relative z-10">
                Our team of experts works tirelessly to bring your vision to life, ensuring every project we undertake not only meets but exceeds expectations. We are dedicated to transforming your ideas into impactful digital experiences that resonate with your audience and drive success.
              </p>
            </div>
            
            <div className="w-full h-40 rounded-[2rem] overflow-hidden">
               <img 
                src="https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=1000" 
                className="w-full h-full object-cover grayscale opacity-50"
                alt="Detail"
               />
            </div>
          </div>

          {/* Right Column*/}
          <div className="bg-orange-500 p-10 md:p-14 rounded-[3rem] text-black h-full flex flex-col justify-center">
            <div className="flex justify-between items-center mb-8">
              <span className="text-xs font-black uppercase tracking-widest border-b-2 border-black pb-1">ABOUT US</span>
              <Sprout size={24} />
            </div>
            
            <div className="space-y-6">
              <p className="text-lg font-bold leading-snug">
                We believe in the power of collaboration and creativity. By partnering closely with our clients, we gain a deep understanding of their unique needs and goals.
              </p>
              <p className="text-sm font-medium leading-relaxed opacity-80">
                By staying ahead of the curve and embracing the latest trends and technologies, we ensure that we provide cutting-edge solutions that not only address current challenges but also anticipate future opportunities. Let us help you navigate the digital landscape with flair.
              </p>
            </div>
          </div>
        </div>

        {/* --- Stats Bar--- */}
        <div className="border border-white/20 rounded-full py-8 px-10 md:px-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4 divide-y md:divide-y-0 md:divide-x divide-white/10">
            {stats.map((stat, index) => (
              <div key={index} className="flex flex-col md:flex-row items-center justify-center gap-4 text-center md:text-left px-4">
                <span className="text-4xl md:text-5xl font-bold text-orange-500 tracking-tighter">
                  {stat.value}
                </span>
                <span className="text-[10px] md:text-xs uppercase tracking-widest text-gray-500 font-bold max-w-[80px] leading-tight">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
      
      {/* Page Footer */}
      <div className="mt-20 text-center text-[10px] uppercase tracking-widest text-gray-700">
        Evolvera Studio • Vision 2026
      </div>
    </div>
  );
};

export default EvolveraValues;