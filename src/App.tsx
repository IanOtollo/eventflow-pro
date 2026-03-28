import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { AnimatePresence, motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import { lazy, Suspense } from "react";
import { CinematicLoading } from "@/components/CinematicLoading";
import Index from "./pages/Index";

// Lazy-loaded pages for code splitting
const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));
const EventDetail = lazy(() => import("./pages/EventDetail"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const TicketView = lazy(() => import("./pages/TicketView"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const Advertise = lazy(() => import("./pages/Advertise"));
const Travel = lazy(() => import("./pages/Travel"));
const Staycations = lazy(() => import("./pages/Staycations"));
const Pricing = lazy(() => import("./pages/Pricing"));
const Legal = lazy(() => import("./pages/Legal"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const TermsAndConditions = lazy(() => import("./pages/TermsAndConditions"));
const CookiePolicy = lazy(() => import("./pages/CookiePolicy"));
const RefundPolicy = lazy(() => import("./pages/RefundPolicy"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

const AppRoutes = () => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -5 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="min-h-screen flex flex-col"
      >
        <Suspense fallback={<CinematicLoading />}>
          <Routes location={location}>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/events/:id" element={<EventDetail />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/legal" element={<Legal />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
            <Route path="/cookie-policy" element={<CookiePolicy />} />
            <Route path="/refund-policy" element={<RefundPolicy />} />
            <Route path="/advertise" element={<Advertise />} />
            <Route path="/travel" element={<Travel />} />
            <Route path="/staycations" element={<Staycations />} />
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/ticket/:bookingId" element={<ProtectedRoute><TicketView /></ProtectedRoute>} />
            <Route path="/admin" element={<ProtectedRoute adminOnly><AdminDashboard /></ProtectedRoute>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </motion.div>
    </AnimatePresence>
  );
};

export default App;
