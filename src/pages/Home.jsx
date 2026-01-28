import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

import Hero from "../components/Hero";
import AboutSection from "../components/utility/About";
import UpcomingEvents from "../components/utility/UpcomingEvents";
import HomeEventPopup from "../components/EventPopup";

import { getEvents } from "../services/event.service";
import EvolveraAbout from "../components/EvolveraAbout";

const Home = () => {
  const [events, setEvents] = useState([]);

 
  useEffect(() => {
    getEvents().then(setEvents);
  }, []);


  const popupEvent = events
  .filter((e) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const eventDate = new Date(e.eventDate);
    eventDate.setHours(0, 0, 0, 0);

    const diff =
      (eventDate - today) / (1000 * 60 * 60 * 24);

    return diff > 0 && diff <= 15;
  })
  .sort(
    (a, b) =>
      new Date(a.eventDate) - new Date(b.eventDate)
  )
  .slice(0, 5); // max 5 events



  return (
    <>
      {/* POPUP  */}
      <HomeEventPopup events={popupEvent} />

      <Hero />
      <AboutSection />
      <UpcomingEvents />

      <section className="bg-black text-white py-32 px-6 overflow-hidden font-['Poppins']">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* LEFT */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-2"
          >
            <h2 className="text-3xl md:text-5xl font-black leading-[0.9] tracking-tighter uppercase">
              WE'VE BUILT <span className="text-gray-500">DREAMS.</span>
            </h2>
            <h2 className="text-3xl md:text-5xl font-black leading-[0.9] tracking-tighter uppercase">
              WE NURTURE <span className="text-orange-500">INNOVATORS.</span>
            </h2>
            <h2 className="text-3xl md:text-5xl font-black leading-[0.9] tracking-tighter uppercase">
              WE KNOW WHAT <br /> IT TAKES.
            </h2>
          </motion.div>

          {/* RIGHT */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="absolute -top-10 -left-10 w-32 h-32 bg-orange-500/10 blur-[80px]" />

            <div className="text-sm md:text-lg leading-relaxed text-gray-400 font-medium">
              <p className="mb-6">
                At{" "}
                <span className="text-orange-500 font-bold">
                  Evolvera
                </span>
                , we're not just building projects — we're shaping
                the future.
              </p>

              <div className="inline-block">
                We've helped visionary creators and bold teams turn
                ideas into reality — from{" "}
                <span className="inline-block px-3 py-1 mx-1 bg-orange-500 text-black font-bold rounded-md transform -rotate-1 skew-x-2 shadow-[0_0_20px_rgba(255,102,0,0.3)]">
                  ground-breaking startups
                </span>{" "}
                to{" "}
                <span className="inline-block px-3 py-1 mx-1 bg-[#a855f7] text-white font-bold rounded-md transform rotate-1 -skew-x-2 shadow-[0_0_20px_rgba(168,85,247,0.3)]">
                  impactful community projects
                </span>{" "}
                — giving us a deep understanding of what it takes to
                spark innovation and build thriving teams.
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-10 pt-8 border-t border-white/10"
            >
              <h3 className="text-orange-500 font-bold text-sm uppercase tracking-[0.3em]">
                Ready to share our expertise & experience
              </h3>
            </motion.div>
          </motion.div>
        </div>

        <div className="max-w-7xl mx-auto mt-32 h-[1px] bg-gradient-to-r from-transparent via-orange-500/50 to-transparent" />
      </section>
      <EvolveraAbout/>
    </>
  );
};

export default Home;
