import { motion } from "framer-motion";
import { Calendar, MapPin, ArrowUpRight, Clock, FileText } from "lucide-react";
import { Link } from "react-router-dom"; // Link import kiya

export default function Events() {
  // Aapke charo past events ka data
  const pastEvents = [
    {
      id: "gen-ai", // ID added for routing
      title: "Gen AI Workshop",
      date: "3rd May 2025",
      mode: "Online",
      organiser: "10X Club KIPM",
      img: "/genai.png", 
      report: "/public/gallery/GenAI.pdf",
      category: "Workshop",
      highlights: ["ML & Transformers", "Text & Image Demos", "Ethics", "Certificates"],
    },
    {
      id: "code-crafter", // ID added for routing
      title: "Code Crafter Grand Challenge",
      date: "2nd Feb 2025",
      mode: "Online (Coding Ninjas)",
      organiser: "10X Club KIPM",
      img: "/codecraft.png",
      report: "/public/gallery/Evolvera.pdf",
      category: "Hackathon",
      highlights: ["900+ Participants", "Real-time Scoreboard", "National Level", "Prizes"],
    },
    {
      id: "tech-minds", // ID added for routing
      title: "Tech Minds Summit",
      date: "15th Aug 2025",
      mode: "Offline",
      organiser: "Evolvera Club",
      img: "/tech.png",
      report: "/public/gallery/Ideathon.pdf",
      category: "Summit",
      highlights: ["Industry Experts", "Startup Showcase", "Networking", "Ideathon"],
    },
    {
      id: "innovate-x", // ID added for routing
      title: "Innovation Carnival 2025",
      date: "10th Sept 2025",
      mode: "Offline",
      organiser: "Evolvera Club",
      img: "/innovation.png",
      report: "/public/gallery/InnovateX.pdf",
      category: "Expo",
      highlights: ["Inter-college Meet", "Project Expo", "Innovation Awards", "Alumni Talk"],
    },
  ];

  const upcomingEvents = [
    {
      id: "tech-minds", // ID added for dynamic route
      title: "Tech Minds Summit 2025",
      date: "15th Aug 2025",
      mode: "Offline",
      tag: "Flagship",
    },
    {
      id: "innovation-carnival", // ID added for dynamic route
      title: "Innovation Carnival",
      date: "10th Sept 2025",
      mode: "Offline",
      tag: "Inter-College",
    }
  ];

  return (
    <section className="bg-black text-white min-h-screen py-24 font-['Poppins'] relative overflow-hidden">
      
      {/* Premium Glow Effects */}
      <div className="absolute top-0 -left-20 w-[600px] h-[600px] bg-orange-500/5 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 -right-20 w-[600px] h-[600px] bg-orange-500/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* UPCOMING SECTION - NOW DYNAMIC */}
        <div className="mb-32">
          <div className="flex items-center gap-4 mb-10">
            <span className="w-12 h-[2px] bg-orange-500"></span>
            <h3 className="text-orange-500 font-bold uppercase tracking-[0.4em] text-xs">Live & Upcoming</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {upcomingEvents.map((event, i) => (
              <Link to={`/events/${event.id}`} key={i} className="block"> {/* Dynamic Link Added */}
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="p-8 bg-zinc-900/30 border border-white/5 rounded-3xl backdrop-blur-md flex justify-between items-center group cursor-pointer hover:border-orange-500/50 transition-all h-full"
                >
                  <div>
                    <span className="text-[10px] bg-orange-500 text-black px-3 py-1 rounded-full font-bold uppercase mb-3 inline-block">
                      {event.tag}
                    </span>
                    <h4 className="text-2xl font-bold tracking-tight group-hover:text-orange-500 transition-colors uppercase">
                      {event.title}
                    </h4>
                    <div className="flex gap-4 mt-2 text-gray-500 text-sm">
                      <span className="flex items-center gap-1"><Calendar size={14}/> {event.date}</span>
                      <span className="flex items-center gap-1"><MapPin size={14}/> {event.mode}</span>
                    </div>
                  </div>
                  <div className="bg-orange-500 p-4 rounded-2xl text-black group-hover:rotate-45 transition-transform shadow-lg shadow-orange-500/20">
                    <ArrowUpRight size={24} strokeWidth={3} />
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>

        {/* PAST EVENTS HEADER */}
        <div className="relative mb-24">
          <h1 className="text-7xl md:text-[10rem] font-black uppercase opacity-[0.03] absolute -top-20 left-0 leading-none select-none tracking-tighter">
            Archive
          </h1>
          <h2 className="text-5xl md:text-7xl font-bold tracking-tighter uppercase">
            PAST <span className="text-orange-500 italic">EXPERIENCES</span>
          </h2>
          <p className="text-gray-500 mt-4 max-w-xl border-l-2 border-orange-500 pl-6 leading-relaxed">
            A legacy of excellence. Explore the reports and highlights of the 
            impactful events organized by Evolvera.
          </p>
        </div>

        {/* PAST EVENTS CARDS */}
        <div className="space-y-12">
          {pastEvents.map((event, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="group relative grid grid-cols-1 lg:grid-cols-12 gap-0 border border-white/5 rounded-[2.5rem] overflow-hidden bg-[#0d0d0d] hover:border-orange-500/40 transition-all shadow-2xl"
            >
              {/* Image Section - Made Clickable for Details */}
              <Link to={`/events/${event.id}`} className="lg:col-span-4 h-72 lg:h-full relative overflow-hidden block">
                <img
                  src={event.img}
                  alt={event.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 grayscale group-hover:grayscale-0 opacity-80 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent lg:hidden" />
              </Link>

              {/* Content Section */}
              <div className="lg:col-span-8 p-10 lg:p-14 flex flex-col justify-center">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <span className="text-orange-500 font-bold tracking-[0.3em] text-[10px] uppercase block mb-3">
                      {event.category} // {event.organiser}
                    </span>
                    <Link to={`/events/${event.id}`}> {/* Title made clickable */}
                      <h3 className="text-3xl md:text-5xl font-black tracking-tighter uppercase leading-tight group-hover:text-orange-500 transition-colors">
                        {event.title}
                      </h3>
                    </Link>
                  </div>
                </div>

                <div className="flex flex-wrap gap-x-8 gap-y-4 mb-8 text-gray-400 text-sm font-semibold tracking-wide">
                  <p className="flex items-center gap-2">
                    <Calendar size={16} className="text-orange-500"/> {event.date}
                  </p>
                  <p className="flex items-center gap-2">
                    <MapPin size={16} className="text-orange-500"/> {event.mode}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 mb-10">
                  {event.highlights.map((h, idx) => (
                    <span key={idx} className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-[10px] font-bold text-gray-300 uppercase tracking-wider">
                      • {h}
                    </span>
                  ))}
                </div>

                {/* Report Link - Opens PDF from public folder */}
                <a
                  href={event.report}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-fit flex items-center gap-4 bg-orange-500 text-black px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-white transition-all shadow-xl shadow-orange-500/20 group/btn"
                >
                  <FileText size={18} className="group-hover/btn:scale-110 transition-transform"/>
                  Read Full Report
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer Text */}
        <div className="mt-40 text-center border-t border-orange-500/10 pt-12">
          <p className="text-[10px] text-gray-700 tracking-[1.5em] uppercase font-bold">
            Evolvera Digital Archive / 2025
          </p>
        </div>

      </div>
    </section>
  );
}