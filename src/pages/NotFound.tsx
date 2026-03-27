import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#050505] p-6 text-center overflow-hidden relative">
      {/* Background glow effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/10 blur-[150px] rounded-full pointer-events-none" />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10"
      >
        <motion.h1 
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          className="font-display text-[12rem] font-black leading-none tracking-tighter text-white/5 select-none"
        >
          404
        </motion.h1>
        
        <div className="absolute inset-0 flex flex-col items-center justify-center space-y-4">
          <h2 className="font-display text-4xl font-black uppercase tracking-tight text-foreground">Lost in the Vibe?</h2>
          <p className="max-w-md text-muted-foreground font-medium text-lg">
            The page you're looking for has moved or doesn't exist. Let's get you back to the main stage.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 pt-8">
            <Button size="lg" className="h-14 px-8 rounded-full bg-accent text-accent-foreground font-black uppercase tracking-widest text-xs shadow-lg shadow-accent/20 hover:scale-105 transition-transform" asChild>
              <Link to="/">
                <Home className="mr-2 h-4 w-4" />
                Back to Home
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="h-14 px-8 rounded-full border-white/10 text-white font-black uppercase tracking-widest text-xs hover:bg-white/5 transition-all" onClick={() => window.history.back()}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Go Back
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Floating decorative elements */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          animate={{ 
            y: [0, -100, 0],
            opacity: [0.3, 0.6, 0.3],
            x: [0, Math.random() * 50 - 25, 0]
          }}
          transition={{ 
            duration: 10 + Math.random() * 5, 
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 2 
          }}
          className="absolute h-1 w-1 rounded-full bg-accent"
          style={{ 
            left: `${Math.random() * 100}%`, 
            top: `${Math.random() * 100}%` 
          }}
        />
      ))}
    </div>
  );
};

export default NotFound;
