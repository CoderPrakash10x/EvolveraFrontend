import React from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Phone, Send, Globe, Instagram, Linkedin, Twitter } from 'lucide-react';

const Contact = () => {
  return (
    <div className="bg-black text-white min-h-screen py-24 px-6 relative overflow-hidden font-['Poppins']">
      
      {/* Background Glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-500/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-orange-600/5 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header Section */}
        <div className="mb-20 text-center md:text-left">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none"
          >
            Get In <span className="text-orange-500 italic font-serif font-light">Touch</span>
          </motion.h2>
          <p className="text-gray-500 mt-6 uppercase tracking-[0.4em] text-xs font-bold">
            Let's build the future of innovation together
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Left Side: Contact Info */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="space-y-12"
          >
            <div className="space-y-8">
              {/* Contact Cards */}
              <ContactCard 
                icon={<Mail className="text-orange-500" />} 
                title="Email Us" 
                detail="contact@evolveraclub.in" 
              />
              <ContactCard 
                icon={<Phone className="text-orange-500" />} 
                title="Call Us" 
                detail="+91 98765 43210" 
              />
              <ContactCard 
                icon={<MapPin className="text-orange-500" />} 
                title="Location" 
                detail="KIPM Campus, GIDA, Gorakhpur" 
              />
            </div>

            {/* Social Links */}
            <div className="pt-8 border-t border-white/10">
              <p className="text-xs uppercase tracking-widest text-gray-500 mb-6 font-bold">Follow Our Journey</p>
              <div className="flex gap-6">
                <SocialIcon icon={<Linkedin />} link="#" />
                <SocialIcon icon={<Instagram />} link="#" />
                <SocialIcon icon={<Twitter />} link="#" />
                <SocialIcon icon={<Globe />} link="#" />
              </div>
            </div>
          </motion.div>

          {/* Right Side: Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="relative"
          >
            <div className="bg-zinc-900/50 backdrop-blur-xl border border-white/5 p-8 md:p-12 rounded-[2.5rem] shadow-2xl">
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InputField label="Full Name" placeholder="John Doe" />
                  <InputField label="Email Address" placeholder="john@example.com" />
                </div>
                <InputField label="Subject" placeholder="How can we help?" />
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] uppercase tracking-widest text-orange-500 font-black pl-2">Message</label>
                  <textarea 
                    rows="4" 
                    placeholder="Your message here..."
                    className="bg-black/50 border border-white/10 rounded-2xl p-4 focus:border-orange-500 outline-none transition-all text-sm resize-none"
                  ></textarea>
                </div>
                
                <button className="w-full py-5 bg-orange-500 text-black font-black uppercase tracking-[0.2em] text-xs rounded-2xl hover:bg-white hover:scale-[1.02] transition-all flex items-center justify-center gap-3">
                  Send Message <Send size={16} />
                </button>
              </form>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

// Helper Components
const ContactCard = ({ icon, title, detail }) => (
  <div className="flex items-center gap-6 group">
    <div className="w-14 h-14 rounded-2xl bg-zinc-900 border border-white/5 flex items-center justify-center group-hover:border-orange-500/50 transition-colors">
      {icon}
    </div>
    <div>
      <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">{title}</p>
      <p className="text-xl font-bold tracking-tight">{detail}</p>
    </div>
  </div>
);

const InputField = ({ label, placeholder }) => (
  <div className="flex flex-col gap-2">
    <label className="text-[10px] uppercase tracking-widest text-orange-500 font-black pl-2">{label}</label>
    <input 
      type="text" 
      placeholder={placeholder}
      className="bg-black/50 border border-white/10 rounded-2xl p-4 focus:border-orange-500 outline-none transition-all text-sm"
    />
  </div>
);

const SocialIcon = ({ icon, link }) => (
  <a 
    href={link} 
    className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-orange-500 hover:text-black hover:border-orange-500 transition-all duration-300"
  >
    {React.cloneElement(icon, { size: 20 })}
  </a>
);

export default Contact;