import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Calendar, Users, Ticket, Plus, Trash2, Edit, CheckCircle2, XCircle, Search } from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";

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

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="flex-1 py-8">
        <div className="container">
          <h1 className="mb-2 font-display text-3xl font-bold">Admin Dashboard</h1>
          <p className="mb-8 text-muted-foreground">Manage events, bookings, and users</p>

          {/* Stats */}
          <div className="mb-8 grid gap-4 sm:grid-cols-4">
            {[
              { label: "Events", value: events?.length ?? 0, icon: Calendar },
              { label: "Bookings", value: bookings?.length ?? 0, icon: Ticket },
              { label: "Users", value: profiles?.length ?? 0, icon: Users },
              { label: "Revenue", value: `$${totalRevenue.toFixed(2)}`, icon: Ticket },
            ].map((s) => (
              <div key={s.label} className="rounded-xl border bg-card p-5 shadow-card">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
                    <s.icon className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{s.label}</p>
                    <p className="font-display text-2xl font-bold">{s.value}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <Tabs defaultValue="events">
            <TabsList className="mb-6">
              <TabsTrigger value="events">Events</TabsTrigger>
              <TabsTrigger value="bookings">Bookings</TabsTrigger>
              <TabsTrigger value="users">Users</TabsTrigger>
              <TabsTrigger value="verify">Verify Ticket</TabsTrigger>
            </TabsList>

            {/* Events tab */}
            <TabsContent value="events">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="font-display text-xl font-semibold">All Events</h2>
                <Dialog open={eventDialogOpen} onOpenChange={(o) => { setEventDialogOpen(o); if (!o) resetForm(); }}>
                  <DialogTrigger asChild>
                    <Button size="sm" className="bg-accent text-accent-foreground hover:bg-accent/90">
                      <Plus className="mr-1.5 h-4 w-4" /> Add Event
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
                    <DialogHeader>
                      <DialogTitle>{editingEvent ? "Edit Event" : "Create Event"}</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 pt-4">
                      <div><Label>Title *</Label><Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="mt-1" /></div>
                      <div><Label>Description</Label><Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="mt-1" rows={3} /></div>
                      <div className="grid grid-cols-2 gap-4">
                        <div><Label>Date *</Label><Input type="datetime-local" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} className="mt-1" /></div>
                        <div><Label>Category</Label><Input value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="mt-1" placeholder="e.g. Music" /></div>
                      </div>
                      <div><Label>Location *</Label><Input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} className="mt-1" /></div>
                      <div><Label>Venue</Label><Input value={form.venue} onChange={(e) => setForm({ ...form, venue: e.target.value })} className="mt-1" /></div>
                      <div className="grid grid-cols-2 gap-4">
                        <div><Label>Price ($)</Label><Input type="number" step="0.01" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} className="mt-1" /></div>
                        <div><Label>Capacity</Label><Input type="number" value={form.capacity} onChange={(e) => setForm({ ...form, capacity: e.target.value })} className="mt-1" /></div>
                      </div>
                      <div><Label>Image URL</Label><Input value={form.image_url} onChange={(e) => setForm({ ...form, image_url: e.target.value })} className="mt-1" placeholder="https://..." /></div>
                      <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90" onClick={() => createEvent.mutate()} disabled={createEvent.isPending}>
                        {createEvent.isPending ? "Saving..." : editingEvent ? "Update Event" : "Create Event"}
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              <div className="space-y-3">
                {events?.map((event) => (
                  <div key={event.id} className="flex items-center justify-between rounded-xl border bg-card p-4 shadow-card">
                    <div>
                      <h3 className="font-semibold">{event.title}</h3>
                      <p className="text-sm text-muted-foreground">{format(new Date(event.date), "MMM dd, yyyy")} · {event.location}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => openEdit(event)}><Edit className="h-4 w-4" /></Button>
                      <Button variant="outline" size="sm" onClick={() => { if (confirm("Delete this event?")) deleteEvent.mutate(event.id); }}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                    </div>
                  </div>
                ))}
                {(!events || events.length === 0) && <p className="py-8 text-center text-muted-foreground">No events yet</p>}
              </div>
            </TabsContent>

            {/* Bookings tab */}
            <TabsContent value="bookings">
              <h2 className="mb-4 font-display text-xl font-semibold">All Bookings</h2>
              <div className="overflow-x-auto rounded-xl border">
                <table className="w-full text-sm">
                  <thead className="bg-muted">
                    <tr>
                      <th className="p-3 text-left font-medium">Ticket Code</th>
                      <th className="p-3 text-left font-medium">Event</th>
                      <th className="p-3 text-left font-medium">Qty</th>
                      <th className="p-3 text-left font-medium">Total</th>
                      <th className="p-3 text-left font-medium">Status</th>
                      <th className="p-3 text-left font-medium">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings?.map((b) => (
                      <tr key={b.id} className="border-t">
                        <td className="p-3 font-mono text-xs">{b.ticket_code}</td>
                        <td className="p-3">{(b.events as any)?.title ?? "—"}</td>
                        <td className="p-3">{b.quantity}</td>
                        <td className="p-3">${Number(b.total_price).toFixed(2)}</td>
                        <td className="p-3">
                          {b.is_used ? (
                            <span className="inline-flex items-center gap-1 text-muted-foreground"><XCircle className="h-3.5 w-3.5" /> Used</span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-accent"><CheckCircle2 className="h-3.5 w-3.5" /> Valid</span>
                          )}
                        </td>
                        <td className="p-3 text-muted-foreground">{format(new Date(b.created_at), "MMM dd")}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {(!bookings || bookings.length === 0) && <p className="py-8 text-center text-muted-foreground">No bookings yet</p>}
              </div>
            </TabsContent>

            {/* Users tab */}
            <TabsContent value="users">
              <h2 className="mb-4 font-display text-xl font-semibold">Registered Users</h2>
              <div className="overflow-x-auto rounded-xl border">
                <table className="w-full text-sm">
                  <thead className="bg-muted">
                    <tr>
                      <th className="p-3 text-left font-medium">Name</th>
                      <th className="p-3 text-left font-medium">Email</th>
                      <th className="p-3 text-left font-medium">Joined</th>
                    </tr>
                  </thead>
                  <tbody>
                    {profiles?.map((p) => (
                      <tr key={p.id} className="border-t">
                        <td className="p-3">{p.full_name || "—"}</td>
                        <td className="p-3">{p.email || "—"}</td>
                        <td className="p-3 text-muted-foreground">{format(new Date(p.created_at), "MMM dd, yyyy")}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {(!profiles || profiles.length === 0) && <p className="py-8 text-center text-muted-foreground">No users yet</p>}
              </div>
            </TabsContent>

            {/* Verify tab */}
            <TabsContent value="verify">
              <div className="mx-auto max-w-md rounded-xl border bg-card p-8 shadow-card">
                <h2 className="mb-2 text-center font-display text-xl font-semibold">Verify Ticket</h2>
                <p className="mb-6 text-center text-sm text-muted-foreground">Enter a ticket code or scan a QR code to validate</p>
                <div className="space-y-4">
                  <div>
                    <Label>Ticket Code</Label>
                    <Input
                      value={verifyCode}
                      onChange={(e) => setVerifyCode(e.target.value.toUpperCase())}
                      placeholder="IOM-XXXXXXXX"
                      className="mt-1 font-mono"
                    />
                  </div>
                  <Button
                    className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
                    onClick={() => verifyTicket.mutate()}
                    disabled={verifyTicket.isPending}
                  >
                    <Search className="mr-1.5 h-4 w-4" />
                    {verifyTicket.isPending ? "Verifying..." : "Verify Ticket"}
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      <Footer />
    </div>
  );
}
