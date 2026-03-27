import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Mail, Phone, Zap, Star, Shield, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

export default function Advertise() {
  return (
    <div className="flex min-h-screen flex-col bg-[#050505]">
      <Header />
      
      <main className="flex-1">
        {/* B2B Hero */}
        <section className="relative overflow-hidden py-24 sm:py-32 px-6 sm:px-10">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent/10 blur-[150px] rounded-full" />
          <div className="container relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl"
            >
              <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-accent/10 px-4 py-2 border border-accent/20">
                <TrendingUp className="h-4 w-4 text-accent" />
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-accent">Strategic Partnerships</span>
              </div>
              <h1 className="font-display text-4xl font-black leading-[0.85] tracking-tighter text-white uppercase sm:text-9xl mb-8 sm:mb-12">
                Elevate Your <span className="text-accent italic">Brand.</span>
              </h1>
              <p className="text-base sm:text-xl font-medium text-white/50 leading-relaxed max-w-2xl mb-12 sm:mb-16">
                Join the platform where elite productions meet world-class ticketing. Advertise your next gig on IOMBookings and reach the premium audience you deserve.
              </p>
              <div className="flex flex-wrap gap-6 sm:gap-8">
                 <Button size="lg" className="h-20 sm:h-24 rounded-2xl bg-white px-12 sm:px-16 text-[10px] sm:text-xs font-black uppercase tracking-[0.4em] text-black hover:bg-accent transition-all" asChild>
                    <a href="mailto:iombookings@gmail.com">Contact Agency</a>
                 </Button>
                 <div className="flex items-center gap-4 text-white/30 font-black uppercase tracking-[0.2em] text-[10px]">
                    Official: +254 700 399 641
                 </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Why Advertise Section */}
        <section className="py-24 sm:py-40 px-6 sm:px-10 border-t border-white/5">
          <div className="container">
            <div className="grid gap-10 sm:gap-20 lg:grid-cols-3">
              {[
                { icon: Zap, title: "High Velocity", desc: "Our localized marketing engine ensures your tickets sell out faster than any other platform in the region." },
                { icon: Star, title: "Premium Showcase", desc: "Your event deserves 5-star visual representation. We don't just list events; we showcase them." },
                { icon: Shield, title: "Elite Security", desc: "Advanced QR-verification and data encryption to protect your revenue and your participants." }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="p-6 sm:p-10 rounded-[2rem] sm:rounded-[3rem] border border-white/5 bg-white/[0.02] backdrop-blur-3xl hover:border-accent/30 transition-all group"
                >
                  <div className="mb-8 h-16 w-16 rounded-2xl bg-white/5 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-black transition-all">
                    <item.icon className="h-8 w-8" />
                  </div>
                  <h3 className="mb-4 font-display text-2xl font-black text-white uppercase tracking-tight">{item.title}</h3>
                  <p className="text-white/40 font-medium leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 sm:py-40 px-6 sm:px-10">
          <div className="container text-center">
            <h2 className="font-display text-4xl font-black tracking-tighter text-white uppercase sm:text-8xl mb-12">
              Ready to <span className="text-accent">Sell Out?</span>
            </h2>
            <div className="flex justify-center gap-8 sm:gap-12 flex-wrap">
               <div className="flex flex-col items-center gap-4">
                 <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/30">Email Us</p>
                 <a href="mailto:iombookings@gmail.com" className="text-xl sm:text-2xl font-black text-white hover:text-accent transition-colors">iombookings@gmail.com</a>
               </div>
               <div className="flex flex-col items-center gap-4 sm:border-l border-white/5 sm:pl-12">
                 <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/30">Call Direct</p>
                 <a href="tel:+254700399641" className="text-2xl font-black text-white hover:text-purple-400 transition-colors">+254 700 399 641</a>
               </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
