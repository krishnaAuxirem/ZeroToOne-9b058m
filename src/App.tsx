import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import ScrollToTop from "@/components/layout/ScrollToTop";
import ProtectedRoute from "@/components/features/ProtectedRoute";

// Public Pages
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import About from "./pages/About";
import Pricing from "./pages/Pricing";
import Blog from "./pages/Blog";
import BlogDetail from "./pages/BlogDetail";
import Contact from "./pages/Contact";
import FAQ from "./pages/FAQ";
import Mentors from "./pages/Mentors";
import Investors from "./pages/Investors";
import Community from "./pages/Community";
import SuccessStories from "./pages/SuccessStories";
import StartupAcademy from "./pages/StartupAcademy";
import StartupShowcase from "./pages/StartupShowcase";
import { PrivacyPage, TermsPage, CookiesPage, RefundPage, CareersPage, PartnersPage, HelpPage, GuidelinesPage } from "./pages/StaticPages";

// Auth Pages
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import RoleSelection from "./pages/auth/RoleSelection";
import ForgotPassword from "./pages/auth/ForgotPassword";

// Dashboard Pages
import FounderDashboard from "./pages/founder/Dashboard";
import FounderAICopilot from "./pages/founder/AICopilot";
import MentorDashboard from "./pages/mentor/Dashboard";
import InvestorDashboard from "./pages/investor/Dashboard";
import TeamDashboard from "./pages/team/Dashboard";
import AdminDashboard from "./pages/admin/Dashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner position="top-right" />
          <BrowserRouter>
            <ScrollToTop />
            <Routes>
              {/* Public */}
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<About />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogDetail />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/mentors" element={<Mentors />} />
              <Route path="/investors" element={<Investors />} />
              <Route path="/community" element={<Community />} />
              <Route path="/success-stories" element={<SuccessStories />} />
              <Route path="/startup-academy" element={<StartupAcademy />} />
              <Route path="/startup-showcase" element={<StartupShowcase />} />
              <Route path="/idea-validation" element={<Index />} />
              <Route path="/ai-copilot" element={<Index />} />

              {/* Static */}
              <Route path="/privacy" element={<PrivacyPage />} />
              <Route path="/terms" element={<TermsPage />} />
              <Route path="/cookies" element={<CookiesPage />} />
              <Route path="/refund" element={<RefundPage />} />
              <Route path="/careers" element={<CareersPage />} />
              <Route path="/partners" element={<PartnersPage />} />
              <Route path="/help" element={<HelpPage />} />
              <Route path="/guidelines" element={<GuidelinesPage />} />

              {/* Auth */}
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/role-selection" element={
                <ProtectedRoute><RoleSelection /></ProtectedRoute>
              } />

              {/* Founder Dashboard */}
              <Route path="/dashboard/founder" element={
                <ProtectedRoute allowedRoles={['founder', 'admin']}><FounderDashboard /></ProtectedRoute>
              } />
              <Route path="/dashboard/founder/ai-copilot" element={
                <ProtectedRoute allowedRoles={['founder', 'admin']}><FounderAICopilot /></ProtectedRoute>
              } />
              {/* Founder sub-pages using same layout */}
              {[
                'profile', 'startup', 'idea-validation', 'market-analysis', 'competitor-analysis',
                'swot', 'business-plan', 'bmc', 'lean-canvas', 'revenue', 'financials', 'roadmap',
                'cofounder', 'team', 'mentors', 'investors', 'academy', 'pitch-deck', 'fundraising',
                'tasks', 'milestones', 'okrs', 'documents', 'community', 'analytics', 'settings',
              ].map(sub => (
                <Route key={sub} path={`/dashboard/founder/${sub}`} element={
                  <ProtectedRoute allowedRoles={['founder', 'admin']}><FounderDashboard /></ProtectedRoute>
                } />
              ))}

              {/* Mentor Dashboard */}
              <Route path="/dashboard/mentor" element={
                <ProtectedRoute allowedRoles={['mentor', 'admin']}><MentorDashboard /></ProtectedRoute>
              } />
              {['profile', 'requests', 'bookings', 'sessions', 'group-sessions', 'reviews', 'revenue', 'availability', 'messages', 'analytics', 'settings'].map(sub => (
                <Route key={sub} path={`/dashboard/mentor/${sub}`} element={
                  <ProtectedRoute allowedRoles={['mentor', 'admin']}><MentorDashboard /></ProtectedRoute>
                } />
              ))}

              {/* Investor Dashboard */}
              <Route path="/dashboard/investor" element={
                <ProtectedRoute allowedRoles={['investor', 'admin']}><InvestorDashboard /></ProtectedRoute>
              } />
              {['profile', 'discover', 'showcase', 'pitches', 'opportunities', 'portfolio', 'analytics', 'meetings', 'saved', 'messages', 'settings'].map(sub => (
                <Route key={sub} path={`/dashboard/investor/${sub}`} element={
                  <ProtectedRoute allowedRoles={['investor', 'admin']}><InvestorDashboard /></ProtectedRoute>
                } />
              ))}

              {/* Team Dashboard */}
              <Route path="/dashboard/team" element={
                <ProtectedRoute allowedRoles={['team', 'admin']}><TeamDashboard /></ProtectedRoute>
              } />
              {['profile', 'projects', 'tasks', 'milestones', 'roadmaps', 'documents', 'chat', 'progress', 'calendar', 'activity', 'settings'].map(sub => (
                <Route key={sub} path={`/dashboard/team/${sub}`} element={
                  <ProtectedRoute allowedRoles={['team', 'admin']}><TeamDashboard /></ProtectedRoute>
                } />
              ))}

              {/* Admin Dashboard */}
              <Route path="/dashboard/admin" element={
                <ProtectedRoute allowedRoles={['admin']}><AdminDashboard /></ProtectedRoute>
              } />
              {['users', 'founders', 'mentors', 'investors', 'content', 'blog', 'community', 'revenue', 'analytics', 'settings', 'security'].map(sub => (
                <Route key={sub} path={`/dashboard/admin/${sub}`} element={
                  <ProtectedRoute allowedRoles={['admin']}><AdminDashboard /></ProtectedRoute>
                } />
              ))}

              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
