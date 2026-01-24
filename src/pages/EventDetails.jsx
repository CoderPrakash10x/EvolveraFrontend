import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, MapPin, ArrowLeft, CheckCircle, Clock, Trophy } from "lucide-react";

const eventContent = {
  "tech-minds": {
    title: "Tech Minds Summit 2025",
    desc: "A flagship summit bringing together industry experts and tech enthusiasts to discuss future innovations and startups.",
    date: "15th August 2025",
    venue: "KIPM Campus (Offline)",
    perks: ["Industry Networking", "Startup Showcase", "Certificates", "Hands-on Workshop"],
    image: "/about.jpg" 
  },
  "innovation-carnival": {
    title: "Innovation Carnival",
    desc: "An inter-college competition showcasing project expos and awarding best innovations among students.",
    date: "10th September 2025",
    venue: "KIPM Campus (Offline)",
    perks: ["Project Expo", "Alumni Networking", "Innovation Awards", "Collaboration"],
    image: "/about.jpg"
  },
  "ai-bootcamp": {
    title: "AI Bootcamp",
    desc: "Deep dive into Artificial Intelligence and Machine Learning fundamentals with practical implementations.",
    date: "Coming Soon",
    venue: "Hybrid (Online/Offline)",
    perks: ["ML Fundamentals", "Hands-on Coding", "Expert Mentorship"],
    image: "/about.jpg"
  }
};

export default function EventDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const event = eventContent[id] || eventContent["tech-minds"];

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="min-h-screen bg-black text-white pt-32 pb-20 px-6"
    >
      <div className="max-w-6xl mx-auto">
        {/* Back Link */}
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-orange-500 mb-8 font-bold uppercase text-xs tracking-widest">
          <ArrowLeft size={16} /> Back to Home
        </button>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left: Content */}
          <motion.div initial={{ x: -30 }} animate={{ x: 0 }}>
            <span className="text-orange-500 font-black uppercase tracking-widest text-sm italic">Upcoming Event</span>
            <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9] my-6">
              {event.title}
            </h1>
            <p className="text-gray-400 text-lg leading-relaxed mb-8">{event.desc}</p>
            
            <div className="space-y-4 mb-10">
              <div className="flex items-center gap-4 text-gray-300">
                <Calendar className="text-orange-500" /> <span>{event.date}</span>
              </div>
              <div className="flex items-center gap-4 text-gray-300">
                <MapPin className="text-orange-500" /> <span>{event.venue}</span>
              </div>
            </div>

            <h3 className="text-xl font-bold uppercase mb-4 tracking-tight">Event Perks</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {event.perks.map((p, i) => (
                <div key={i} className="flex items-center gap-2 bg-zinc-900/50 p-4 rounded-xl border border-white/5">
                  <CheckCircle className="text-orange-500" size={18} />
                  <span className="text-sm font-medium">{p}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: Action Card */}
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="sticky top-32">
            <div className="bg-zinc-900 border border-orange-500/20 p-8 rounded-3xl relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 blur-3xl rounded-full" />
               <h4 className="text-2xl font-bold mb-4">Ready to Join?</h4>
               <p className="text-gray-400 text-sm mb-8">Don't miss the chance to be part of Evolvera's most awaited tech event.</p>
               
               <button className="w-full bg-orange-500 text-black py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-white transition-all shadow-xl shadow-orange-500/20">
                  Register for this Event
               </button>
               
               <div className="mt-8 pt-8 border-t border-white/10 flex items-center gap-4">
                  <Trophy className="text-orange-500" size={32} />
                  <div>
                    <p className="text-xs font-bold uppercase text-gray-500">Recognition</p>
                    <p className="text-sm font-bold">Certificates for all attendees</p>
                  </div>
               </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}