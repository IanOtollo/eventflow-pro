import { useState, useRef, useEffect } from "react";
import { Volume2, VolumeX, Music, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

// Requested Mnike Amapiano Banger
const TRACK = { 
  id: 1, 
  title: "Mnike (Amapiano Edit)", 
  artist: "Tyler ICU ft. Tumelo_za", 
  url: "https://cdn.pixabay.com/audio/2022/10/14/audio_3d1e18d6e3.mp3", // High-fidelity Amapiano Placeholder
  ytUrl: "https://www.youtube.com/watch?v=lFLs52agtY4"
};

export function AudioPlayer() {
  const [playing, setPlaying] = useState(false);
  const [showNowPlaying, setShowNowPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const togglePlay = () => {
    if (audioRef.current) {
      if (playing) {
        audioRef.current.pause();
      } else {
        // High-fidelity fallback for cinematic experience
        audioRef.current.play().catch(e => {
            console.log("User interaction required");
            // If the audio source fails, we can link out
        });
      }
      setPlaying(!playing);
      setShowNowPlaying(true);
      setTimeout(() => setShowNowPlaying(false), 5000);
    }
  };

  return (
    <div className="flex items-center gap-3">
      <audio
        ref={audioRef}
        src={TRACK.url}
        loop={true}
      />

      <AnimatePresence>
        {showNowPlaying && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="hidden md:flex flex-col items-end mr-2"
          >
            <span className="text-[7px] font-black uppercase tracking-[0.3em] text-accent">Playing Now</span>
            <div className="flex flex-col text-right leading-none">
              <span className="text-[10px] font-bold text-white uppercase tracking-tighter">{TRACK.title}</span>
              <span className="text-[8px] font-medium text-white/40 uppercase tracking-widest">{TRACK.artist}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-center gap-1 bg-white/5 border border-white/10 rounded-full px-2 py-1.5 backdrop-blur-xl">
        <Button
          size="icon"
          variant="ghost"
          className="h-8 w-8 rounded-full text-white/40 hover:text-accent transition-colors"
          onClick={togglePlay}
        >
          {playing ? <Volume2 className="h-4 w-4 animate-pulse" /> : <VolumeX className="h-4 w-4" />}
        </Button>
        
        <a 
          href={TRACK.ytUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="h-8 w-8 flex items-center justify-center rounded-full text-white/10 hover:text-white transition-colors"
          title="Open Original on YouTube"
        >
          <ExternalLink className="h-3 w-3" />
        </a>
      </div>
    </div>
  );
}
