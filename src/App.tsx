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
import AccessDenied from "./pages/AccessDenied";
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

// ── MENTOR PAGES ──
import MentorDashboard from "./pages/mentor/Dashboard";
import MentorProfile from "./pages/mentor/Profile";
import MentorConsultationRequests from "./pages/mentor/ConsultationRequests";
import MentorBookings from "./pages/mentor/Bookings";
import MentorOneToOneSessions from "./pages/mentor/OneToOneSessions";
import MentorGroupSessions from "./pages/mentor/GroupSessions";
import MentorReviews from "./pages/mentor/Reviews";
import MentorRevenue from "./pages/mentor/Revenue";
import MentorAvailability from "./pages/mentor/Availability";
import MentorMessages from "./pages/mentor/Messages";
import MentorAnalytics from "./pages/mentor/Analytics";
import MentorSettings from "./pages/mentor/Settings";

// ── FOUNDER PAGES ──
import FounderDashboard from "./pages/founder/Dashboard";
import FounderStartupValidation from "./pages/founder/StartupValidation";
import FounderBusinessPlan from "./pages/founder/BusinessPlan";
import FounderAICopilot from "./pages/founder/AICopilot";
import FounderTeamBuilding from "./pages/founder/TeamBuilding";
import FounderAcademy from "./pages/founder/Academy";
import FounderMentorBooking from "./pages/founder/MentorBooking";
import FounderFundraising from "./pages/founder/Fundraising";
import FounderExecutionWorkspace from "./pages/founder/ExecutionWorkspace";
import FounderCommunity from "./pages/founder/Community";
import FounderAnalytics from "./pages/founder/Analytics";
import FounderProfile from "./pages/founder/Profile";
import FounderSettings from "./pages/founder/Settings";

// ── INVESTOR PAGES ──
import InvestorDashboard from "./pages/investor/Dashboard";
import InvestorProfile from "./pages/investor/Profile";
import InvestorStartupDiscovery from "./pages/investor/StartupDiscovery";
import InvestorStartupShowcase from "./pages/investor/StartupShowcase";
import InvestorPitchReview from "./pages/investor/PitchReview";
import InvestorMessages from "./pages/investor/Messages";
import InvestorOpportunities from "./pages/investor/Opportunities";
import InvestorAnalytics from "./pages/investor/Analytics";
import InvestorSettings from "./pages/investor/Settings";

// ── TEAM PAGES ──
import TeamDashboard from "./pages/team/Dashboard";
import TeamProjects from "./pages/team/Projects";
import TeamTasks from "./pages/team/Tasks";
import TeamMilestones from "./pages/team/Milestones";
import TeamCollaboration from "./pages/team/Collaboration";
import TeamDocuments from "./pages/team/Documents";
import TeamProgress from "./pages/team/Progress";
import TeamMessages from "./pages/team/Messages";
import TeamSettings from "./pages/team/Settings";

// ── ADMIN PAGES ──
import AdminDashboard from "./pages/admin/Dashboard";
import AdminUsers from "./pages/admin/Users";
import AdminFounders from "./pages/admin/Founders";
import AdminMentors from "./pages/admin/Mentors";
import AdminInvestors from "./pages/admin/Investors";
import AdminTeamMembers from "./pages/admin/TeamMembers";
import AdminBlogs from "./pages/admin/Blogs";
import AdminContent from "./pages/admin/Content";
import AdminCommunity from "./pages/admin/Community";
import AdminRevenue from "./pages/admin/Revenue";
import AdminAnalytics from "./pages/admin/Analytics";
import AdminSettings from "./pages/admin/Settings";

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
              {/* ── PUBLIC ── */}
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

              {/* ── STATIC ── */}
              <Route path="/privacy" element={<PrivacyPage />} />
              <Route path="/terms" element={<TermsPage />} />
              <Route path="/cookies" element={<CookiesPage />} />
              <Route path="/refund" element={<RefundPage />} />
              <Route path="/careers" element={<CareersPage />} />
              <Route path="/partners" element={<PartnersPage />} />
              <Route path="/help" element={<HelpPage />} />
              <Route path="/guidelines" element={<GuidelinesPage />} />

              {/* ── AUTH ── */}
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/role-selection" element={<ProtectedRoute><RoleSelection /></ProtectedRoute>} />

              {/* ══════════════════════════════════════
                  MENTOR DASHBOARD — 12 UNIQUE ROUTES
              ══════════════════════════════════════ */}
              <Route path="/dashboard/mentor" element={<ProtectedRoute allowedRoles={['mentor','admin']}><MentorDashboard /></ProtectedRoute>} />
              <Route path="/dashboard/mentor/profile" element={<ProtectedRoute allowedRoles={['mentor','admin']}><MentorProfile /></ProtectedRoute>} />
              <Route path="/dashboard/mentor/consultation-requests" element={<ProtectedRoute allowedRoles={['mentor','admin']}><MentorConsultationRequests /></ProtectedRoute>} />
              <Route path="/dashboard/mentor/bookings" element={<ProtectedRoute allowedRoles={['mentor','admin']}><MentorBookings /></ProtectedRoute>} />
              <Route path="/dashboard/mentor/one-to-one-sessions" element={<ProtectedRoute allowedRoles={['mentor','admin']}><MentorOneToOneSessions /></ProtectedRoute>} />
              <Route path="/dashboard/mentor/group-sessions" element={<ProtectedRoute allowedRoles={['mentor','admin']}><MentorGroupSessions /></ProtectedRoute>} />
              <Route path="/dashboard/mentor/reviews" element={<ProtectedRoute allowedRoles={['mentor','admin']}><MentorReviews /></ProtectedRoute>} />
              <Route path="/dashboard/mentor/revenue" element={<ProtectedRoute allowedRoles={['mentor','admin']}><MentorRevenue /></ProtectedRoute>} />
              <Route path="/dashboard/mentor/availability" element={<ProtectedRoute allowedRoles={['mentor','admin']}><MentorAvailability /></ProtectedRoute>} />
              <Route path="/dashboard/mentor/messages" element={<ProtectedRoute allowedRoles={['mentor','admin']}><MentorMessages /></ProtectedRoute>} />
              <Route path="/dashboard/mentor/analytics" element={<ProtectedRoute allowedRoles={['mentor','admin']}><MentorAnalytics /></ProtectedRoute>} />
              <Route path="/dashboard/mentor/settings" element={<ProtectedRoute allowedRoles={['mentor','admin']}><MentorSettings /></ProtectedRoute>} />

              {/* ══════════════════════════════════════
                  FOUNDER DASHBOARD — 13 UNIQUE ROUTES
              ══════════════════════════════════════ */}
              <Route path="/dashboard/founder" element={<ProtectedRoute allowedRoles={['founder','admin']}><FounderDashboard /></ProtectedRoute>} />
              <Route path="/dashboard/founder/startup-validation" element={<ProtectedRoute allowedRoles={['founder','admin']}><FounderStartupValidation /></ProtectedRoute>} />
              <Route path="/dashboard/founder/business-plan" element={<ProtectedRoute allowedRoles={['founder','admin']}><FounderBusinessPlan /></ProtectedRoute>} />
              <Route path="/dashboard/founder/ai-copilot" element={<ProtectedRoute allowedRoles={['founder','admin']}><FounderAICopilot /></ProtectedRoute>} />
              <Route path="/dashboard/founder/team-building" element={<ProtectedRoute allowedRoles={['founder','admin']}><FounderTeamBuilding /></ProtectedRoute>} />
              <Route path="/dashboard/founder/academy" element={<ProtectedRoute allowedRoles={['founder','admin']}><FounderAcademy /></ProtectedRoute>} />
              <Route path="/dashboard/founder/mentor-booking" element={<ProtectedRoute allowedRoles={['founder','admin']}><FounderMentorBooking /></ProtectedRoute>} />
              <Route path="/dashboard/founder/fundraising" element={<ProtectedRoute allowedRoles={['founder','admin']}><FounderFundraising /></ProtectedRoute>} />
              <Route path="/dashboard/founder/execution-workspace" element={<ProtectedRoute allowedRoles={['founder','admin']}><FounderExecutionWorkspace /></ProtectedRoute>} />
              <Route path="/dashboard/founder/community" element={<ProtectedRoute allowedRoles={['founder','admin']}><FounderCommunity /></ProtectedRoute>} />
              <Route path="/dashboard/founder/analytics" element={<ProtectedRoute allowedRoles={['founder','admin']}><FounderAnalytics /></ProtectedRoute>} />
              <Route path="/dashboard/founder/profile" element={<ProtectedRoute allowedRoles={['founder','admin']}><FounderProfile /></ProtectedRoute>} />
              <Route path="/dashboard/founder/settings" element={<ProtectedRoute allowedRoles={['founder','admin']}><FounderSettings /></ProtectedRoute>} />

              {/* ══════════════════════════════════════
                  INVESTOR DASHBOARD — 9 UNIQUE ROUTES
              ══════════════════════════════════════ */}
              <Route path="/dashboard/investor" element={<ProtectedRoute allowedRoles={['investor','admin']}><InvestorDashboard /></ProtectedRoute>} />
              <Route path="/dashboard/investor/profile" element={<ProtectedRoute allowedRoles={['investor','admin']}><InvestorProfile /></ProtectedRoute>} />
              <Route path="/dashboard/investor/startup-discovery" element={<ProtectedRoute allowedRoles={['investor','admin']}><InvestorStartupDiscovery /></ProtectedRoute>} />
              <Route path="/dashboard/investor/startup-showcase" element={<ProtectedRoute allowedRoles={['investor','admin']}><InvestorStartupShowcase /></ProtectedRoute>} />
              <Route path="/dashboard/investor/pitch-review" element={<ProtectedRoute allowedRoles={['investor','admin']}><InvestorPitchReview /></ProtectedRoute>} />
              <Route path="/dashboard/investor/messages" element={<ProtectedRoute allowedRoles={['investor','admin']}><InvestorMessages /></ProtectedRoute>} />
              <Route path="/dashboard/investor/opportunities" element={<ProtectedRoute allowedRoles={['investor','admin']}><InvestorOpportunities /></ProtectedRoute>} />
              <Route path="/dashboard/investor/analytics" element={<ProtectedRoute allowedRoles={['investor','admin']}><InvestorAnalytics /></ProtectedRoute>} />
              <Route path="/dashboard/investor/settings" element={<ProtectedRoute allowedRoles={['investor','admin']}><InvestorSettings /></ProtectedRoute>} />

              {/* ══════════════════════════════════════
                  TEAM DASHBOARD — 9 UNIQUE ROUTES
              ══════════════════════════════════════ */}
              <Route path="/dashboard/team" element={<ProtectedRoute allowedRoles={['team','admin']}><TeamDashboard /></ProtectedRoute>} />
              <Route path="/dashboard/team/projects" element={<ProtectedRoute allowedRoles={['team','admin']}><TeamProjects /></ProtectedRoute>} />
              <Route path="/dashboard/team/tasks" element={<ProtectedRoute allowedRoles={['team','admin']}><TeamTasks /></ProtectedRoute>} />
              <Route path="/dashboard/team/milestones" element={<ProtectedRoute allowedRoles={['team','admin']}><TeamMilestones /></ProtectedRoute>} />
              <Route path="/dashboard/team/collaboration" element={<ProtectedRoute allowedRoles={['team','admin']}><TeamCollaboration /></ProtectedRoute>} />
              <Route path="/dashboard/team/documents" element={<ProtectedRoute allowedRoles={['team','admin']}><TeamDocuments /></ProtectedRoute>} />
              <Route path="/dashboard/team/progress" element={<ProtectedRoute allowedRoles={['team','admin']}><TeamProgress /></ProtectedRoute>} />
              <Route path="/dashboard/team/messages" element={<ProtectedRoute allowedRoles={['team','admin']}><TeamMessages /></ProtectedRoute>} />
              <Route path="/dashboard/team/settings" element={<ProtectedRoute allowedRoles={['team','admin']}><TeamSettings /></ProtectedRoute>} />

              {/* ══════════════════════════════════════
                  ADMIN DASHBOARD — 12 UNIQUE ROUTES
              ══════════════════════════════════════ */}
              <Route path="/dashboard/admin" element={<ProtectedRoute allowedRoles={['admin']}><AdminDashboard /></ProtectedRoute>} />
              <Route path="/dashboard/admin/users" element={<ProtectedRoute allowedRoles={['admin']}><AdminUsers /></ProtectedRoute>} />
              <Route path="/dashboard/admin/founders" element={<ProtectedRoute allowedRoles={['admin']}><AdminFounders /></ProtectedRoute>} />
              <Route path="/dashboard/admin/mentors" element={<ProtectedRoute allowedRoles={['admin']}><AdminMentors /></ProtectedRoute>} />
              <Route path="/dashboard/admin/investors" element={<ProtectedRoute allowedRoles={['admin']}><AdminInvestors /></ProtectedRoute>} />
              <Route path="/dashboard/admin/team-members" element={<ProtectedRoute allowedRoles={['admin']}><AdminTeamMembers /></ProtectedRoute>} />
              <Route path="/dashboard/admin/blogs" element={<ProtectedRoute allowedRoles={['admin']}><AdminBlogs /></ProtectedRoute>} />
              <Route path="/dashboard/admin/content" element={<ProtectedRoute allowedRoles={['admin']}><AdminContent /></ProtectedRoute>} />
              <Route path="/dashboard/admin/community" element={<ProtectedRoute allowedRoles={['admin']}><AdminCommunity /></ProtectedRoute>} />
              <Route path="/dashboard/admin/revenue" element={<ProtectedRoute allowedRoles={['admin']}><AdminRevenue /></ProtectedRoute>} />
              <Route path="/dashboard/admin/analytics" element={<ProtectedRoute allowedRoles={['admin']}><AdminAnalytics /></ProtectedRoute>} />
              <Route path="/dashboard/admin/settings" element={<ProtectedRoute allowedRoles={['admin']}><AdminSettings /></ProtectedRoute>} />

              <Route path="/access-denied" element={<AccessDenied />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
