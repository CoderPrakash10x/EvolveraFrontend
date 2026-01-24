import React from 'react';
import { motion } from 'framer-motion';

const FocusingOn = () => {
  const points = [
    {
      id: "01",
      title: "Future-proofing",
      desc: "Looking towards the future - industry & student body",
    },
    {
      id: "02",
      title: "Communication",
      desc: "Establishing strong & positive communication - team & students",
    },
    {
      id: "03",
      title: "Opportunities",
      desc: "Generating revenue streams through innovative means",
    },
    {
      id: "04",
      title: "Collaboration",
      desc: "Working with BCU/BICA colleagues and industry partners",
    },
    {
      id: "05",
      title: "Experience",
      desc: "Success stories & creating meaningful experiences",
    },
    {
      id: "06",
      title: "Insights",
      desc: "Industry professionals tell us what skills our future students will need",
    },
  ];

  return (
    <div className="bg-black text-white min-h-screen p-12 font-sans selection:bg-lime-400 selection:text-black">
      {/* Header Info Bar */}
      <div className="flex justify-between text-[10px] uppercase tracking-widest text-gray-500 border-b border-gray-800 pb-2 mb-20">
        <span>Jane Anderson</span>
        <span>C.L. Interview</span>
        <span>11.04.22</span>
      </div>

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-10">
        {/* Left Side Label */}
        <div className="pt-4">
          <h2 className="text-2xl text-gray-300 font-light">Focusing on:</h2>
        </div>

        {/* Right Side Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-16 gap-y-24 flex-1">
          {points.map((point, index) => (
            <div key={point.id} className="relative group">
              {/* Animated Connecting Line (Hidden for ends of rows) */}
              {index !== 2 && index !== 5 && (
                <div className="hidden md:block absolute top-8 -right-[4.5rem] w-12 h-[1px] bg-gray-700 overflow-hidden">
                  <motion.div 
                    initial={{ x: "-100%" }}
                    whileInView={{ x: "0%" }}
                    transition={{ duration: 0.8, delay: index * 0.2 }}
                    className="w-full h-full bg-gray-400"
                  />
                  {/* Arrowhead */}
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-1 border-t border-r border-gray-400 rotate-45" />
                </div>
              )}

              <div className="flex items-start gap-4">
                {/* Number */}
                <span className="text-7xl font-bold text-lime-400 leading-none">
                  {point.id}
                </span>

                {/* Content */}
                <div className="pt-2">
                  <h3 className="font-bold text-lg leading-tight mb-1 italic">
                    {point.title}
                  </h3>
                  <p className="text-sm text-gray-400 leading-snug max-w-[180px]">
                    {point.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Page Number */}
      <div className="absolute bottom-8 right-12 text-[10px] text-gray-600">
        | 02
      </div>
    </div>
  );
};

export default FocusingOn;