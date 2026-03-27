import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Ticket, ArrowLeft, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [resetting, setResetting] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      toast.error("Please fill in all fields");
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
    setLoading(false);
    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Welcome back to the Showcase.");
      navigate("/dashboard");
    }
  };

  const handleResetPassword = async () => {
    if (!email.trim()) {
      toast.error("Enter your email above first to reset.");
      return;
    }
    setResetting(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
      redirectTo: window.location.origin,
    });
    setResetting(false);
    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Reset link sent. Check your email.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#050505] px-4 overflow-hidden relative">
      {/* Background Cinematic Glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/10 blur-[150px] rounded-full" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/10 blur-[150px] rounded-full" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative z-10"
      >
        <Link to="/" className="mb-12 inline-flex items-center gap-3 text-white/40 hover:text-white transition-colors uppercase font-black tracking-widest text-xs group">
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" /> Back to Marketplace
        </Link>

        <div className="rounded-[2rem] sm:rounded-[3rem] border border-white/10 bg-[#0A0A0A]/40 p-6 sm:p-12 backdrop-blur-3xl shadow-[0_40px_100px_rgba(0,0,0,0.5)]">
          <div className="mb-10 text-center">
            <Link to="/" className="mb-6 inline-flex items-center gap-4 font-display text-3xl font-black text-white uppercase tracking-tighter">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent text-accent-foreground shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                <Ticket className="h-6 w-6" />
              </div>
              IOM<span className="text-accent underline decoration-accent/20 underline-offset-8">Bookings</span>
            </Link>
            <p className="mt-4 text-xs font-black uppercase tracking-[0.4em] text-white/30">Secure Showcase Access</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-8">
            <div className="space-y-3">
              <Label htmlFor="email" className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40">Email Address</Label>
              <Input 
                id="email" 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                placeholder="organizer@iombookings.com" 
                className="h-16 rounded-2xl border-white/5 bg-white/5 text-sm font-bold text-white focus-visible:ring-accent"
              />
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <Label htmlFor="password" className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40">Security Password</Label>
                <button
                  type="button"
                  onClick={handleResetPassword}
                  className="text-[9px] font-black uppercase tracking-[0.2em] text-accent/40 hover:text-accent"
                  disabled={resetting}
                >
                  {resetting ? "Sending..." : "Reset Pin?"}
                </button>
              </div>
              <Input 
                id="password" 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                placeholder="••••••••" 
                className="h-16 rounded-2xl border-white/5 bg-white/5 text-sm font-bold text-white focus-visible:ring-accent"
              />
            </div>
            <Button type="submit" disabled={loading} className="h-20 w-full rounded-2xl bg-white text-black font-black uppercase tracking-[0.4em] text-xs hover:bg-accent hover:scale-[1.02] transition-all shadow-2xl">
              {loading ? "Authenticating..." : "Sign In to Pass"}
            </Button>
          </form>

          <p className="mt-10 text-center text-[10px] font-black uppercase tracking-[0.3em] text-white/20">
            Internal Access Only?{" "}
            <Link to="/signup" className="text-accent hover:underline underline-offset-4">Apply for Pass</Link>
          </p>
          
          <div className="mt-10 flex items-center justify-center gap-2 text-[8px] font-black uppercase tracking-[0.4em] text-white/10">
             <ShieldCheck className="h-4 w-4" /> 256-bit AES Encryption Active
          </div>
        </div>
      </motion.div>
    </div>
  );
}
