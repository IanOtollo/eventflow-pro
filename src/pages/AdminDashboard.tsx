import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { AdminLayout } from "@/components/AdminLayout";
import { CinematicLoading } from "@/components/CinematicLoading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Calendar, Users, Ticket, Plus, Trash2, Edit, CheckCircle2, XCircle, Search, TrendingUp, Activity, BarChart3, Fingerprint } from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";
import { motion } from "framer-motion";

export default function AdminDashboard() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [eventDialogOpen, setEventDialogOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<any>(null);
  const [verifyCode, setVerifyCode] = useState("");

  // Form state
  const [form, setForm] = useState({
    title: "", description: "", date: "", location: "", venue: "", price: "0", capacity: "100", category: "", image_url: "",
  });

  const resetForm = () => {
    setForm({ title: "", description: "", date: "", location: "", venue: "", price: "0", capacity: "100", category: "", image_url: "" });
    setEditingEvent(null);
  };

  // Queries
  const { data: events } = useQuery({
    queryKey: ["admin-events"],
    queryFn: async () => {
      const { data, error } = await supabase.from("events").select("*").order("date", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const { data: bookings } = useQuery({
    queryKey: ["admin-bookings"],
    queryFn: async () => {
      const { data, error } = await supabase.from("bookings").select("*, events(title)").order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const { data: profiles } = useQuery({
    queryKey: ["admin-profiles"],
    queryFn: async () => {
      const { data, error } = await supabase.from("profiles").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  // Mutations
  const createEvent = useMutation({
    mutationFn: async () => {
      if (!form.title.trim() || !form.date || !form.location.trim()) throw new Error("Title, date, and location required");
      const payload = {
        title: form.title.trim(),
        description: form.description.trim() || null,
        date: new Date(form.date).toISOString(),
        location: form.location.trim(),
        venue: form.venue.trim() || null,
        price: parseFloat(form.price) || 0,
        capacity: parseInt(form.capacity) || 100,
        category: form.category.trim() || null,
        image_url: form.image_url.trim() || null,
        created_by: user!.id,
      };
      if (editingEvent) {
        const { error } = await supabase.from("events").update(payload).eq("id", editingEvent.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("events").insert(payload);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      toast.success(editingEvent ? "Event updated!" : "Event created!");
      queryClient.invalidateQueries({ queryKey: ["admin-events"] });
      queryClient.invalidateQueries({ queryKey: ["events"] });
      setEventDialogOpen(false);
      resetForm();
    },
    onError: (err: Error) => toast.error(err.message),
  });

  const deleteEvent = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("events").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Event deleted");
      queryClient.invalidateQueries({ queryKey: ["admin-events"] });
      queryClient.invalidateQueries({ queryKey: ["events"] });
    },
    onError: (err: Error) => toast.error(err.message),
  });

  const verifyTicket = useMutation({
    mutationFn: async () => {
      if (!verifyCode.trim()) throw new Error("Enter a ticket code");
      const { data, error } = await supabase
        .from("bookings")
        .select("*, events(title)")
        .eq("ticket_code", verifyCode.trim().toUpperCase())
        .maybeSingle();
      if (error) throw error;
      if (!data) throw new Error("Ticket not found");
      if (data.is_used) throw new Error("Ticket already used!");
      // Mark as used
      const { error: updateError } = await supabase
        .from("bookings")
        .update({ is_used: true, used_at: new Date().toISOString() })
        .eq("id", data.id);
      if (updateError) throw updateError;
      return data;
    },
    onSuccess: (data: any) => {
      toast.success(`Ticket verified! Event: ${data.events?.title}`);
      setVerifyCode("");
      queryClient.invalidateQueries({ queryKey: ["admin-bookings"] });
    },
    onError: (err: Error) => toast.error(err.message),
  });

  const openEdit = (event: any) => {
    setEditingEvent(event);
    setForm({
      title: event.title,
      description: event.description || "",
      date: event.date ? new Date(event.date).toISOString().slice(0, 16) : "",
      location: event.location,
      venue: event.venue || "",
      price: String(event.price),
      capacity: String(event.capacity),
      category: event.category || "",
      image_url: event.image_url || "",
    });
    setEventDialogOpen(true);
  };

  const totalRevenue = bookings?.reduce((sum, b) => sum + Number(b.total_price), 0) ?? 0;

  if (!events || !bookings) return <CinematicLoading />;

  return (
    <AdminLayout>
      <div className="space-y-12 pb-20">
        <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
             <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-4 py-1.5 backdrop-blur-md">
                <Fingerprint className="h-4 w-4 text-accent" />
                <span className="text-[9px] font-black uppercase tracking-[0.4em] text-accent">Internal Engine Alpha</span>
             </div>
             <h1 className="font-display text-5xl font-black tracking-tighter uppercase sm:text-6xl text-white">Quantum <span className="text-white/20 italic">Command</span></h1>
             <p className="mt-2 text-sm font-black uppercase tracking-[0.2em] text-white/30">Global Operational Control Center</p>
          </div>
          <div className="flex gap-4">
            <Dialog open={eventDialogOpen} onOpenChange={(o) => { setEventDialogOpen(o); if (!o) resetForm(); }}>
              <DialogTrigger asChild>
                <Button size="lg" className="h-14 rounded-2xl bg-accent px-8 text-[10px] font-black uppercase tracking-[0.3em] text-accent-foreground hover:scale-105 transition-transform shadow-lg shadow-accent/20">
                  <Plus className="mr-2 h-4 w-4" /> New Showcase
                </Button>
              </DialogTrigger>
              <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl bg-[#0A0A0A] border-white/10 text-white rounded-[3rem]">
                <DialogHeader>
                  <DialogTitle className="font-display text-3xl font-black uppercase tracking-tight">Create Elite Showcase</DialogTitle>
                </DialogHeader>
                <div className="space-y-8 pt-8">
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-white/40">Event Identity *</Label>
                    <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="h-14 rounded-xl border-white/5 bg-white/5 font-bold" placeholder="Neon Echo Stadium Tour" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-white/40">Showcase Brief</Label>
                    <Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="rounded-xl border-white/5 bg-white/5 font-medium" rows={4} placeholder="Detailed experience description..." />
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label className="text-[10px] font-black uppercase tracking-widest text-white/40">Premiere Date *</Label>
                      <Input type="datetime-local" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} className="h-14 rounded-xl border-white/5 bg-white/5" />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[10px] font-black uppercase tracking-widest text-white/40">Visual Category</Label>
                      <Input value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="h-14 rounded-xl border-white/5 bg-white/5" placeholder="e.g. World Tour" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-white/40">Strategic Location *</Label>
                    <Input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} className="h-14 rounded-xl border-white/5 bg-white/5" placeholder="City, Country" />
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label className="text-[10px] font-black uppercase tracking-widest text-white/40">Base Pass Price (KSH)</Label>
                      <Input type="number" step="1" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} className="h-14 rounded-xl border-white/5 bg-white/5" />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[10px] font-black uppercase tracking-widest text-white/40">Audience Capacity</Label>
                      <Input type="number" value={form.capacity} onChange={(e) => setForm({ ...form, capacity: e.target.value })} className="h-14 rounded-xl border-white/5 bg-white/5" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-white/40">High-Res Asset URL</Label>
                    <Input value={form.image_url} onChange={(e) => setForm({ ...form, image_url: e.target.value })} className="h-14 rounded-xl border-white/5 bg-white/5" placeholder="https://unsplash.com/..." />
                  </div>
                  <Button size="lg" className="h-20 w-full rounded-2xl bg-white text-black font-black uppercase tracking-[0.4em] text-xs hover:bg-accent transition-all shadow-2xl" onClick={() => createEvent.mutate()} disabled={createEvent.isPending}>
                    {createEvent.isPending ? "Syncing..." : editingEvent ? "Update Asset" : "Deploy Showcase"}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
           {[
             { label: "Active Revenue", value: `KSH ${totalRevenue.toLocaleString()}`, icon: TrendingUp, color: "text-accent", trend: "+12.5%" },
             { label: "Live Showcases", value: events.length, icon: Activity, color: "text-purple-500", trend: "+2 new" },
             { label: "Total Bookings", value: bookings.length, icon: Ticket, color: "text-rose-500", trend: "High Velocity" },
             { label: "Global Profiles", value: profiles.length, icon: Users, color: "text-cyan-500", trend: "Elite Group" }
           ].map((stat, i) => (
             <motion.div 
               key={i}
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: i * 0.1 }}
               className="rounded-3xl border border-white/5 bg-white/[0.02] p-8 backdrop-blur-3xl group hover:border-white/10 transition-all"
             >
               <div className="flex items-center justify-between mb-6">
                 <div className={`h-12 w-12 flex items-center justify-center rounded-2xl bg-white/5 ${stat.color} group-hover:scale-110 transition-transform`}>
                   <stat.icon className="h-6 w-6" />
                 </div>
                 <span className="text-[9px] font-black uppercase tracking-widest text-white/20">{stat.trend}</span>
               </div>
               <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 mb-1">{stat.label}</p>
               <h3 className="font-display text-3xl font-black text-white">{stat.value}</h3>
             </motion.div>
           ))}
        </div>

        <Tabs defaultValue="events" className="w-full">
          <TabsList className="h-16 w-full max-w-2xl bg-white/5 rounded-2xl p-2 gap-2">
            <TabsTrigger value="events" className="flex-1 rounded-xl text-[10px] font-black uppercase tracking-widest data-[state=active]:bg-white data-[state=active]:text-black">Showcases</TabsTrigger>
            <TabsTrigger value="bookings" className="flex-1 rounded-xl text-[10px] font-black uppercase tracking-widest data-[state=active]:bg-white data-[state=active]:text-black">Velocity</TabsTrigger>
            <TabsTrigger value="users" className="flex-1 rounded-xl text-[10px] font-black uppercase tracking-widest data-[state=active]:bg-white data-[state=active]:text-black">Clients</TabsTrigger>
            <TabsTrigger value="verify" className="flex-1 rounded-xl text-[10px] font-black uppercase tracking-widest data-[state=active]:bg-rose-500 data-[state=active]:text-white">Verify</TabsTrigger>
          </TabsList>

          <TabsContent value="events" className="mt-10 overflow-hidden">
            <div className="grid gap-6">
              {events?.map((event, i) => (
                <motion.div 
                  key={event.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-center justify-between rounded-3xl border border-white/5 bg-black/40 p-6 hover:border-accent/30 transition-all group"
                >
                  <div className="flex items-center gap-6">
                    <div className="h-16 w-16 overflow-hidden rounded-2xl bg-white/5 ring-1 ring-white/10 group-hover:ring-accent transition-all">
                      {event.image_url ? <img src={event.image_url} alt="" className="h-full w-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" /> : <Calendar className="h-full w-full p-4 text-white/10" />}
                    </div>
                    <div>
                      <h4 className="font-display text-xl font-black text-white uppercase tracking-tight">{event.title}</h4>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-white/30">{format(new Date(event.date), "MMM dd, yyyy")} · {event.location}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right mr-8 hidden sm:block">
                      <p className="text-[9px] font-black uppercase tracking-widest text-white/20 mb-1">Pass Revenue</p>
                      <p className="font-display text-lg font-black text-accent">KSH {(event.price * 5).toLocaleString()}</p>
                    </div>
                    <Button variant="ghost" size="icon" className="h-12 w-12 rounded-xl hover:bg-white/5 text-white/20 hover:text-white" onClick={() => openEdit(event)}><Edit className="h-5 w-5" /></Button>
                    <Button variant="ghost" size="icon" className="h-12 w-12 rounded-xl hover:bg-destructive/10 text-destructive/20 hover:text-destructive" onClick={() => { if (confirm("Terminate this showcase asset?")) deleteEvent.mutate(event.id); }}><Trash2 className="h-5 w-5" /></Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="bookings" className="mt-10">
            <div className="rounded-[2.5rem] border border-white/5 bg-white/[0.02] overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-white/5 border-b border-white/5">
                    <tr>
                      <th className="p-8 text-[10px] font-black uppercase tracking-[0.3em] text-white/40">Identifier</th>
                      <th className="p-8 text-[10px] font-black uppercase tracking-[0.3em] text-white/40">Client</th>
                      <th className="p-8 text-[10px] font-black uppercase tracking-[0.3em] text-white/40">Showcase</th>
                      <th className="p-8 text-[10px] font-black uppercase tracking-[0.3em] text-white/40">Status</th>
                      <th className="p-8 text-[10px] font-black uppercase tracking-[0.3em] text-white/40 text-right">Revenue</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {bookings?.map((b) => (
                      <tr key={b.id} className="hover:bg-white/[0.02] transition-colors">
                        <td className="p-8 font-mono text-xs font-black tracking-widest text-accent">{b.ticket_code}</td>
                        <td className="p-8">
                          <div className="flex flex-col">
                            <span className="font-bold text-white uppercase tracking-tight">{(b as any).guest_name || "Guest Client"}</span>
                            <span className="text-[10px] font-medium text-white/20">{(b as any).guest_email || "no-contact@iom.com"}</span>
                          </div>
                        </td>
                        <td className="p-8 font-bold text-white uppercase tracking-tight">{(b.events as any)?.title ?? "—"}</td>
                        <td className="p-8">
                          {b.is_used ? (
                            <span className="inline-flex h-8 items-center rounded-lg px-3 bg-white/5 text-[9px] font-black uppercase tracking-widest text-white/20">Finalized</span>
                          ) : (
                            <span className="inline-flex h-8 items-center rounded-lg px-3 bg-accent/20 text-[9px] font-black uppercase tracking-widest text-accent">Active Vault</span>
                          )}
                        </td>
                        <td className="p-8 text-right font-display text-lg font-black text-white">KSH {Number(b.total_price).toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="verify" className="mt-10">
            <div className="mx-auto max-w-xl rounded-[4rem] border border-white/10 bg-gradient-to-br from-white/5 to-transparent p-16 backdrop-blur-3xl text-center shadow-2xl">
               <div className="mb-10 inline-flex h-24 w-24 items-center justify-center rounded-[2rem] bg-rose-500 text-white shadow-[0_20px_60px_rgba(244,63,94,0.3)]">
                  <Fingerprint className="h-10 w-10" />
               </div>
               <h2 className="font-display text-4xl font-black uppercase tracking-tight text-white mb-4">Gatekeeper Auth</h2>
               <p className="text-xs font-black uppercase tracking-[0.3em] text-white/30 mb-12">Submit ticket ID for instant blockchain verification</p>
               
               <div className="space-y-6">
                 <Input 
                   value={verifyCode} 
                   onChange={(e) => setVerifyCode(e.target.value.toUpperCase())} 
                   className="h-20 rounded-2xl border-white/5 bg-white/10 text-center font-mono text-2xl font-black text-accent tracking-[0.4em] placeholder:opacity-10" 
                   placeholder="IOM-XXXXXXXX"
                 />
                 <Button size="lg" className="h-20 w-full rounded-2xl bg-white text-black font-black uppercase tracking-[0.4em] text-xs hover:bg-accent transition-all" onClick={() => verifyTicket.mutate()} disabled={verifyTicket.isPending}>
                   {verifyTicket.isPending ? "Auth Sync In Progress..." : "Verify Identity"}
                 </Button>
               </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
}
