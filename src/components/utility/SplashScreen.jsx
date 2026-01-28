import { motion } from "framer-motion";

export default function SplashScreen() {
  return (
    <div className="fixed inset-0 z-[9999] bg-black flex items-center justify-center">
      
      
      <div className="absolute w-80 h-80 bg-orange-500/20 blur-[140px] rounded-full" />

      
      <motion.img
        src="/evolvera.png"   
        alt="Evolvera Club"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className="relative z-10 w-44 sm:w-52 md:w-60 lg:w-64"
      />

      {/* text */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="absolute bottom-16 text-xs tracking-[0.3em] text-gray-400 uppercase"
      >
        Evolvera Club
      </motion.p>
    </div>
  );
}
