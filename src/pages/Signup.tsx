import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Ticket, ArrowLeft, Star, Zap } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";

export default function Signup() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim() || !password.trim()) {
      toast.error("Please fill in all fields");
      return;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email: email.trim(),
      password,
      options: {
        data: { full_name: fullName.trim() },
        emailRedirectTo: window.location.origin,
      },
    });
    setLoading(false);
    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Account created! Check your email to confirm.");
      navigate("/login");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#050505] px-4 overflow-hidden relative">
      {/* Background Cinematic Glows */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-purple-500/10 blur-[150px] rounded-full" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-accent/10 blur-[150px] rounded-full" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-lg relative z-10"
      >
        <Link to="/" className="mb-12 inline-flex items-center gap-3 text-white/40 hover:text-white transition-colors uppercase font-black tracking-widest text-xs group">
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" /> Back to Marketplace
        </Link>

        <div className="rounded-[3.5rem] border border-white/10 bg-[#0A0A0A]/40 p-12 backdrop-blur-3xl shadow-[0_40px_100px_rgba(0,0,0,0.5)]">
          <div className="mb-12 text-center">
            <Link to="/" className="mb-6 inline-flex items-center gap-4 font-display text-4xl font-black text-white uppercase tracking-tighter">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-black shadow-2xl">
                <Ticket className="h-7 w-7" />
              </div>
              IOM<span className="text-accent underline decoration-accent/20 underline-offset-8">Bookings</span>
            </Link>
            <p className="mt-4 text-xs font-black uppercase tracking-[0.5em] text-white/30">Join the Elite Circle</p>
          </div>

          <form onSubmit={handleSignup} className="space-y-8">
            <div className="space-y-3">
              <Label htmlFor="fullName" className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40">Full Identity</Label>
              <Input 
                id="fullName" 
                value={fullName} 
                onChange={(e) => setFullName(e.target.value)} 
                placeholder="Elite Member Name" 
                className="h-16 rounded-2xl border-white/5 bg-white/5 text-sm font-bold text-white focus-visible:ring-accent"
              />
            </div>
            <div className="space-y-3">
              <Label htmlFor="email" className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40">Strategic Email</Label>
              <Input 
                id="email" 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                placeholder="you@premier.com" 
                className="h-16 rounded-2xl border-white/5 bg-white/5 text-sm font-bold text-white focus-visible:ring-accent"
              />
            </div>
            <div className="space-y-3">
              <Label htmlFor="password" className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40">Security Password</Label>
              <Input 
                id="password" 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                placeholder="••••••••" 
                className="h-16 rounded-2xl border-white/5 bg-white/5 text-sm font-bold text-white focus-visible:ring-accent"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
               <div className="flex items-center gap-2 text-[8px] font-black uppercase tracking-widest text-white/20">
                 <Star className="h-3 w-3 text-accent" /> VIP Access
               </div>
               <div className="flex items-center gap-2 text-[8px] font-black uppercase tracking-widest text-white/20">
                 <Zap className="h-3 w-3 text-purple-500" /> Instant Pass
               </div>
            </div>

            <Button type="submit" disabled={loading} className="h-20 w-full rounded-2xl bg-accent text-accent-foreground font-black uppercase tracking-[0.4em] text-xs hover:scale-[1.02] transition-all shadow-[0_20px_50px_rgba(16,185,129,0.2)]">
              {loading ? "Initializing..." : "Register My Identity"}
            </Button>
          </form>

          <p className="mt-12 text-center text-[10px] font-black uppercase tracking-[0.4em] text-white/20">
            Already a member?{" "}
            <Link to="/login" className="text-white hover:text-accent transition-colors underline underline-offset-4">Sign In</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
