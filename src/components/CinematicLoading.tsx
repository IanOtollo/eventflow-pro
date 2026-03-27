import { motion } from "framer-motion";

export const CinematicLoading = () => (
  <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#050505] overflow-hidden">
    {/* Animated background glows */}
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/10 blur-[150px] rounded-full" />
    
    <div className="relative flex flex-col items-center">
      <div className="relative h-24 w-24">
        {/* Outer rotating ring */}
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 rounded-full border-t-2 border-r-2 border-accent/40 border-l-2 border-b-2 border-transparent shadow-[0_0_20px_rgba(16,185,129,0.2)]"
        />
        {/* Inner reverse rotating ring */}
        <motion.div 
          animate={{ rotate: -360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          className="absolute inset-2 rounded-full border-b-2 border-l-2 border-accent/60 border-t-2 border-r-2 border-transparent"
        />
        {/* Center pulsing dot */}
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-8 rounded-full bg-accent shadow-[0_0_30px_rgba(16,185,129,0.6)]"
        />
      </div>
      
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-8 text-center"
      >
        <p className="font-display text-sm font-black uppercase tracking-[0.4em] text-foreground/80">IOMBookings</p>
        <div className="mt-2 h-0.5 w-12 bg-accent/40 mx-auto overflow-hidden relative">
          <motion.div 
            animate={{ x: ["-100%", "100%"] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 bg-accent"
          />
        </div>
      </motion.div>
    </div>
  </div>
);
