import React from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  Calendar, 
  Users, 
  Ticket, 
  Settings, 
  LogOut, 
  Bell,
  Search,
  Menu,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const { signOut, user } = useAuth();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems = [
    { icon: LayoutDashboard, label: "Overview", path: "/admin" },
    { icon: Calendar, label: "Events", path: "/admin/events" },
    { icon: Ticket, label: "Bookings", path: "/admin/bookings" },
    { icon: Users, label: "Users", path: "/admin/users" },
    { icon: Settings, label: "CMS Settings", path: "/admin/settings" },
  ];

  return (
    <div className="flex min-h-screen bg-[#080808] text-foreground">
      {/* Sidebar - Desktop */}
      <aside className="hidden w-72 border-r border-white/5 bg-[#0a0a0a] md:block overflow-y-auto">
        <div className="flex h-20 items-center px-8 border-b border-white/5">
          <Link to="/" className="flex items-center gap-3">
            <div className="flex h-8 w-16 items-center justify-center rounded border border-dashed border-accent/40 bg-accent/5 text-[8px] font-black uppercase tracking-widest text-accent">
              CMS
            </div>
            <span className="font-display text-lg font-black tracking-tighter">IOMBookings</span>
          </Link>
        </div>
        
        <nav className="p-6 space-y-2">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.label}
                to={item.path}
                className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-all ${
                  isActive 
                    ? "bg-accent text-accent-foreground shadow-lg shadow-accent/20" 
                    : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
                }`}
              >
                <item.icon className="h-5 w-5" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-0 w-72 border-t border-white/5 p-6 bg-[#0a0a0a]">
          <div className="mb-6 flex items-center gap-3 px-2">
            <div className="h-10 w-10 rounded-full bg-accent/10 flex items-center justify-center text-accent font-black text-xs border border-accent/20">
              {user?.email?.[0].toUpperCase()}
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="truncate text-xs font-bold text-foreground">{user?.email}</p>
              <p className="text-[10px] font-bold text-accent uppercase tracking-widest">Administrator</p>
            </div>
          </div>
          <Button 
            variant="ghost" 
            className="w-full justify-start gap-3 rounded-xl text-muted-foreground hover:text-destructive hover:bg-destructive/10"
            onClick={signOut}
          >
            <LogOut className="h-5 w-5" />
            Sign Out
          </Button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="h-20 border-b border-white/5 bg-[#0a0a0a]/50 backdrop-blur-xl sticky top-0 z-30 px-6 sm:px-10 flex items-center justify-between">
          <div className="md:hidden flex items-center gap-4">
             <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(true)}>
                <Menu className="h-6 w-6" />
             </Button>
             <span className="font-display font-black tracking-tighter">IOM CMS</span>
          </div>

          <div className="hidden md:flex flex-1 max-w-md items-center relative group">
            <Search className="absolute left-4 h-4 w-4 text-muted-foreground transition-colors group-hover:text-accent" />
            <input 
              type="text" 
              placeholder="Search data, events, or users..." 
              className="w-full h-11 bg-white/5 border border-white/5 rounded-xl pl-12 text-sm focus:outline-none focus:border-accent/40 focus:bg-white/10 transition-all font-medium"
            />
          </div>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="relative rounded-xl border border-white/5 hover:bg-white/5">
              <Bell className="h-5 w-5 text-muted-foreground" />
              <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-accent" />
            </Button>
            <div className="h-8 w-px bg-white/5 mx-2 hidden sm:block" />
            <Button size="sm" className="hidden sm:flex rounded-xl bg-accent text-accent-foreground font-bold hover:shadow-lg hover:shadow-accent/20 transition-all">
              Launch Live Site
            </Button>
          </div>
        </header>

        {/* Content Container */}
        <div className="flex-1 p-4 sm:p-10">
          <div className="max-w-[1400px] mx-auto">
            {children}
          </div>
        </div>
      </main>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 md:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.aside 
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed inset-y-0 left-0 w-72 bg-[#0a0a0a] z-50 p-6 md:hidden border-r border-white/5 shadow-2xl"
            >
              <div className="flex items-center justify-between mb-10">
                <span className="font-display text-2xl font-black">CMS</span>
                <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(false)}>
                  <X className="h-6 w-6" />
                </Button>
              </div>
              <nav className="space-y-4">
                {menuItems.map((item) => (
                  <Link
                    key={item.label}
                    to={item.path}
                    className="flex items-center gap-3 text-lg font-bold text-muted-foreground hover:text-accent transition-colors py-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <item.icon className="h-6 w-6" />
                    {item.label}
                  </Link>
                ))}
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
