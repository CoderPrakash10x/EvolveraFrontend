import { motion } from "framer-motion";

export default function PageLoader() {
  return (
    <div className="fixed inset-0 z-[9999] bg-black flex items-center justify-center">
      
     
      <div className="absolute w-72 h-72 bg-orange-500/20 blur-[120px] rounded-full" />

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="relative flex flex-col items-center"
      >
        
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
          className="w-24 h-24 rounded-full border-4 border-orange-500/30 border-t-orange-500"
        />

        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-8 text-sm tracking-widest text-gray-400 uppercase"
        >
          Evolvera Club
        </motion.p>
      </motion.div>
    </div>
  );
}
