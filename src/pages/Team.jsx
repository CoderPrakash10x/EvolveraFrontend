import React from "react";
import { Linkedin, Instagram, Github } from "lucide-react";

/* =======================
   CURRENT TEAM
======================= */
const currentTeam = [
  { role: "President", name: "Siddhansh Pandey", dept: "CSE (AIML)", img: "/Teams/Siddhansh Pandey.jpeg" },
  { role: "Vice President", name: "Jaya Shukla", dept: "CSE (AIML)", img: "/Teams/Jaya Shukla.jpeg" },
  { role: "Secretary", name: "Aniket Jaiswal", dept: "CSE (AIML)", img: "/Teams/Aniket Jaiswal.jpeg" },
  { role: "Deputy Secretary", name: "Raunak Singh", dept: "CSE (AIML)", img: "/Teams/Raunak Singh.jpeg" },
  { role: "Management Head", name: "Akash Sharma", dept: "CSE (AIML)", img: "/Teams/Akash Singh.jpeg" },
  { role: "Management Head", name: "Rashmi Singh", dept: "CSE (B2)", img: "/Teams/Rashmi Singh.jpeg" },
  { role: "Technical Head", name: "Uday", dept: "CSE (AIML)", img: "/Teams/Uday.jpeg" },
  { role: "Technical Head", name: "Ankit Pratap Singh", dept: "CSE (B1)", img: "/Teams/Ankit Pratap Singh.jpeg" },
  { role: "Social Media Head", name: "Anurag Singh", dept: "CE", img: "/Teams/Anurak Singh.jpeg" },
  { role: "Social Media Head", name: "Sneha Pandey", dept: "EE", img: "/Teams/Sneha Pandey.jpeg" },
  { role: "Innovation & Research Head", name: "Vivek Maurya", dept: "CSE (AIML)", img: "/Teams/Vivek Kumar Maurya.jpeg" },
  { role: "Innovation & Research Head", name: "Shahnaz Parveen", dept: "CSE (AIML)", img: "/Teams/Shahnaz Parveen.jpeg" },
  { role: "Project Head", name: "Omkar Gupta", dept: "ECE", img: "/Teams/Omkar Gupta.jpeg" },
  { role: "Project Head", name: "Priyanshi Singh", dept: "CSE (AIML)", img: "/Teams/Priyanshi Singh.jpeg" }
];

/* =======================
   PAST MEMBERS 
======================= */
const pastMembers = [
  { role: "President", name: "Shivam Rai", img: "/Teams/Shivam Rai.jpeg" },
  { role: "Vice President", name: "Najiya", img: "/Teams/najiya.jpeg" },// yaha inka image lagana hai aur public ke teams folder me photo rahega
  { role: "Secretary", name: "Mohammad Mughees", img: "/Teams/Mohammad Mughees.jpeg" },
  { role: "Deputy Secretary", name: "Badal Singh", img: "/Teams/Badal Singh.jpeg" },
  { role: "Technical Head", name: "Shubham Singh", img: "/Teams/Shubham Singh.jpeg" },
  { role: "Management Head", name: "Halim Khan", img: "/Teams/Halim Khan.jpeg" },
  { role: "Project Head", name: "Shivesh Tiwari", img: "/Teams/Shivesh Tiwari.jpeg" }
];

const Card = ({ img, role, name, dept }) => (
  <div className="bg-zinc-900/80 rounded-2xl p-6 text-center border border-white/10
                  hover:border-orange-500/40 transition">

    <div className="w-32 h-36 mx-auto rounded-xl overflow-hidden mb-6 bg-zinc-800">
      <img
        src={img}
        alt={name}
        onError={(e) => {
          e.currentTarget.src = "/Teams/placeholder.jpg";
        }}
        className="w-full h-full object-cover object-top"
      />
    </div>

    <p className="text-[11px] uppercase tracking-widest text-gray-400">{role}</p>
    <h3 className="text-xl font-black text-orange-500 mt-1">{name}</h3>
  </div>
);



const EvolveraTeam = () => {
  return (
    <div className="bg-black text-white">

     
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto text-center">

          <h2 className="text-5xl font-black mb-4">
            Our <span className="text-orange-500">Team</span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto mb-20">
            The current leadership driving Evolvera Club forward.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-12">
            {currentTeam.map((m, i) => (
              <Card key={i} {...m} />
            ))}
          </div>
        </div>
      </section>

     
      <section className="py-32 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto text-center">

          <h2 className="text-4xl font-black mb-16">
            Founder & <span className="text-orange-500"> Initiator</span>
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-12">
            {pastMembers.map((m, i) => (
              <Card key={i} {...m} />
            ))}
          </div>

        </div>
      </section>

    </div>
  );
};

export default EvolveraTeam;
