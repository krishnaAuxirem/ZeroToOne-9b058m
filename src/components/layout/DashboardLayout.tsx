import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, User, Building2, Lightbulb, BarChart3, TrendingUp,
  FileText, DollarSign, Users, BookOpen, Calendar, Settings, LogOut,
  Bell, Search, Menu, X, ChevronRight, Briefcase, Target, MessageSquare,
  Shield, Globe, PieChart, Zap, Star, Award, Rocket, UserPlus, CheckSquare,
  Map, FolderOpen, Activity, CreditCard, Home, ChevronDown
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { Sun, Moon } from 'lucide-react';
import logoImg from '@/assets/logo.png';

const FOUNDER_NAV = [
  { label: 'Overview', href: '/dashboard/founder', icon: LayoutDashboard },
  { label: 'Founder Profile', href: '/dashboard/founder/profile', icon: User },
  { label: 'Startup Profile', href: '/dashboard/founder/startup', icon: Building2 },
  {
    label: 'Validation & Analysis',
    icon: Lightbulb,
    children: [
      { label: 'Idea Validation', href: '/dashboard/founder/idea-validation', icon: Lightbulb },
      { label: 'Market Analysis', href: '/dashboard/founder/market-analysis', icon: BarChart3 },
      { label: 'Competitor Analysis', href: '/dashboard/founder/competitor-analysis', icon: TrendingUp },
      { label: 'SWOT Analysis', href: '/dashboard/founder/swot', icon: Target },
    ],
  },
  {
    label: 'Business Planning',
    icon: FileText,
    children: [
      { label: 'Business Plan', href: '/dashboard/founder/business-plan', icon: FileText },
      { label: 'Business Model Canvas', href: '/dashboard/founder/bmc', icon: Map },
      { label: 'Lean Canvas', href: '/dashboard/founder/lean-canvas', icon: CheckSquare },
      { label: 'Revenue Model', href: '/dashboard/founder/revenue', icon: DollarSign },
      { label: 'Financial Planning', href: '/dashboard/founder/financials', icon: PieChart },
      { label: 'Growth Roadmap', href: '/dashboard/founder/roadmap', icon: Rocket },
    ],
  },
  { label: 'AI Copilot', href: '/dashboard/founder/ai-copilot', icon: Zap },
  {
    label: 'Team & Network',
    icon: Users,
    children: [
      { label: 'Co-Founder Match', href: '/dashboard/founder/cofounder', icon: UserPlus },
      { label: 'Team Building', href: '/dashboard/founder/team', icon: Users },
      { label: 'Mentor Marketplace', href: '/dashboard/founder/mentors', icon: Star },
      { label: 'Investor Connect', href: '/dashboard/founder/investors', icon: Briefcase },
    ],
  },
  { label: 'Startup Academy', href: '/dashboard/founder/academy', icon: BookOpen },
  { label: 'Pitch Deck Builder', href: '/dashboard/founder/pitch-deck', icon: Award },
  { label: 'Fundraising CRM', href: '/dashboard/founder/fundraising', icon: CreditCard },
  {
    label: 'Execution',
    icon: CheckSquare,
    children: [
      { label: 'Tasks', href: '/dashboard/founder/tasks', icon: CheckSquare },
      { label: 'Milestones', href: '/dashboard/founder/milestones', icon: Target },
      { label: 'OKRs', href: '/dashboard/founder/okrs', icon: Activity },
      { label: 'Documents', href: '/dashboard/founder/documents', icon: FolderOpen },
    ],
  },
  { label: 'Community', href: '/dashboard/founder/community', icon: MessageSquare },
  { label: 'Analytics', href: '/dashboard/founder/analytics', icon: BarChart3 },
  { label: 'Settings', href: '/dashboard/founder/settings', icon: Settings },
];

const MENTOR_NAV = [
  { label: 'Overview', href: '/dashboard/mentor', icon: LayoutDashboard },
  { label: 'My Profile', href: '/dashboard/mentor/profile', icon: User },
  { label: 'Consultation Requests', href: '/dashboard/mentor/requests', icon: Bell },
  { label: 'Bookings', href: '/dashboard/mentor/bookings', icon: Calendar },
  { label: '1:1 Sessions', href: '/dashboard/mentor/sessions', icon: Users },
  { label: 'Group Sessions', href: '/dashboard/mentor/group-sessions', icon: Users },
  { label: 'Reviews & Ratings', href: '/dashboard/mentor/reviews', icon: Star },
  { label: 'Revenue Dashboard', href: '/dashboard/mentor/revenue', icon: DollarSign },
  { label: 'Availability', href: '/dashboard/mentor/availability', icon: Calendar },
  { label: 'Messages', href: '/dashboard/mentor/messages', icon: MessageSquare },
  { label: 'Analytics', href: '/dashboard/mentor/analytics', icon: BarChart3 },
  { label: 'Settings', href: '/dashboard/mentor/settings', icon: Settings },
];

const INVESTOR_NAV = [
  { label: 'Overview', href: '/dashboard/investor', icon: LayoutDashboard },
  { label: 'Investor Profile', href: '/dashboard/investor/profile', icon: User },
  { label: 'Startup Discovery', href: '/dashboard/investor/discover', icon: Globe },
  { label: 'Startup Showcase', href: '/dashboard/investor/showcase', icon: Rocket },
  { label: 'Pitch Reviews', href: '/dashboard/investor/pitches', icon: FileText },
  { label: 'Investment Opportunities', href: '/dashboard/investor/opportunities', icon: TrendingUp },
  { label: 'Portfolio Tracking', href: '/dashboard/investor/portfolio', icon: PieChart },
  { label: 'Funding Analytics', href: '/dashboard/investor/analytics', icon: BarChart3 },
  { label: 'Meeting Requests', href: '/dashboard/investor/meetings', icon: Calendar },
  { label: 'Saved Startups', href: '/dashboard/investor/saved', icon: Star },
  { label: 'Messages', href: '/dashboard/investor/messages', icon: MessageSquare },
  { label: 'Settings', href: '/dashboard/investor/settings', icon: Settings },
];

const TEAM_NAV = [
  { label: 'Overview', href: '/dashboard/team', icon: LayoutDashboard },
  { label: 'My Profile', href: '/dashboard/team/profile', icon: User },
  { label: 'Assigned Projects', href: '/dashboard/team/projects', icon: Briefcase },
  { label: 'Tasks', href: '/dashboard/team/tasks', icon: CheckSquare },
  { label: 'Milestones', href: '/dashboard/team/milestones', icon: Target },
  { label: 'Roadmaps', href: '/dashboard/team/roadmaps', icon: Map },
  { label: 'Documents', href: '/dashboard/team/documents', icon: FolderOpen },
  { label: 'Team Chat', href: '/dashboard/team/chat', icon: MessageSquare },
  { label: 'Progress Tracking', href: '/dashboard/team/progress', icon: Activity },
  { label: 'Calendar', href: '/dashboard/team/calendar', icon: Calendar },
  { label: 'Activity Feed', href: '/dashboard/team/activity', icon: Activity },
  { label: 'Settings', href: '/dashboard/team/settings', icon: Settings },
];

const ADMIN_NAV = [
  { label: 'Overview', href: '/dashboard/admin', icon: LayoutDashboard },
  { label: 'User Management', href: '/dashboard/admin/users', icon: Users },
  { label: 'Founder Management', href: '/dashboard/admin/founders', icon: Rocket },
  { label: 'Mentor Verification', href: '/dashboard/admin/mentors', icon: Star },
  { label: 'Investor Verification', href: '/dashboard/admin/investors', icon: Briefcase },
  { label: 'Content Management', href: '/dashboard/admin/content', icon: FileText },
  { label: 'Blog Management', href: '/dashboard/admin/blog', icon: Globe },
  { label: 'Community Moderation', href: '/dashboard/admin/community', icon: MessageSquare },
  { label: 'Revenue Monitoring', href: '/dashboard/admin/revenue', icon: DollarSign },
  { label: 'Analytics', href: '/dashboard/admin/analytics', icon: BarChart3 },
  { label: 'Platform Settings', href: '/dashboard/admin/settings', icon: Settings },
  { label: 'Security', href: '/dashboard/admin/security', icon: Shield },
];

interface NavItem {
  label: string;
  href?: string;
  icon: React.ComponentType<{ className?: string }>;
  children?: NavItem[];
}

const NavItemComponent = ({ item, collapsed }: { item: NavItem; collapsed: boolean }) => {
  const location = useLocation();
  const [open, setOpen] = useState(() => item.children?.some(c => location.pathname === c.href) ?? false);
  const isActive = item.href ? location.pathname === item.href : false;
  const Icon = item.icon;

  if (item.children) {
    return (
      <div>
        <button
          onClick={() => setOpen(!open)}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all ${
            open ? 'text-white bg-sidebar-accent' : 'text-sidebar-foreground hover:text-white hover:bg-sidebar-accent/50'
          }`}
        >
          <Icon className="w-4 h-4 flex-shrink-0" />
          {!collapsed && (
            <>
              <span className="flex-1 text-left font-medium">{item.label}</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${open ? 'rotate-180' : ''}`} />
            </>
          )}
        </button>
        <AnimatePresence>
          {open && !collapsed && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="ml-4 mt-1 space-y-0.5 border-l border-sidebar-border pl-3"
            >
              {item.children.map((child) => (
                <Link
                  key={child.href}
                  to={child.href!}
                  className={`flex items-center gap-2.5 px-2 py-2 rounded-lg text-sm transition-all ${
                    location.pathname === child.href
                      ? 'text-white bg-sidebar-primary/20 font-medium'
                      : 'text-sidebar-foreground hover:text-white hover:bg-sidebar-accent/50'
                  }`}
                >
                  <child.icon className="w-3.5 h-3.5 flex-shrink-0" />
                  {child.label}
                </Link>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <Link
      to={item.href!}
      title={collapsed ? item.label : undefined}
      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all ${
        isActive
          ? 'text-white bg-sidebar-primary/20 font-semibold border border-sidebar-primary/30'
          : 'text-sidebar-foreground hover:text-white hover:bg-sidebar-accent/50'
      }`}
    >
      <Icon className={`w-4 h-4 flex-shrink-0 ${isActive ? 'text-blue-400' : ''}`} />
      {!collapsed && <span>{item.label}</span>}
      {isActive && !collapsed && <ChevronRight className="w-3.5 h-3.5 ml-auto text-blue-400" />}
    </Link>
  );
};

interface DashboardLayoutProps {
  children: React.ReactNode;
  title?: string;
}

const DashboardLayout = ({ children, title }: DashboardLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const { user, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const navItems = user?.role === 'founder' ? FOUNDER_NAV
    : user?.role === 'mentor' ? MENTOR_NAV
    : user?.role === 'investor' ? INVESTOR_NAV
    : user?.role === 'team' ? TEAM_NAV
    : ADMIN_NAV;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const roleColors: Record<string, string> = {
    founder: 'bg-blue-500/20 text-blue-400',
    mentor: 'bg-purple-500/20 text-purple-400',
    investor: 'bg-green-500/20 text-green-400',
    team: 'bg-orange-500/20 text-orange-400',
    admin: 'bg-red-500/20 text-red-400',
  };

  const SidebarContent = ({ collapsed }: { collapsed: boolean }) => (
    <div className="flex flex-col h-full bg-sidebar-background border-r border-sidebar-border">
      {/* Logo */}
      <div className={`flex items-center gap-2.5 p-4 border-b border-sidebar-border ${collapsed ? 'justify-center' : ''}`}>
        <div className="w-8 h-8 rounded-lg overflow-hidden flex-shrink-0">
          <img src={logoImg} alt="ZeroToOne" className="w-full h-full object-cover" />
        </div>
        {!collapsed && (
          <span className="text-lg font-bold text-white font-['Space_Grotesk']">
            Zero<span className="bg-gradient-to-r from-blue-400 to-orange-400 bg-clip-text text-transparent">To</span>One
          </span>
        )}
      </div>

      {/* User info */}
      <div className={`p-4 border-b border-sidebar-border ${collapsed ? 'flex justify-center' : ''}`}>
        <div className={`flex items-center gap-3 ${collapsed ? 'justify-center' : ''}`}>
          <img src={user?.avatar} alt={user?.name} className="w-9 h-9 rounded-full ring-2 ring-blue-500/30" />
          {!collapsed && (
            <div className="min-w-0">
              <p className="text-sm font-semibold text-white truncate">{user?.name}</p>
              <span className={`text-xs px-2 py-0.5 rounded-full capitalize ${roleColors[user?.role || 'founder']}`}>
                {user?.role}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto scrollbar-hide">
        {navItems.map((item) => (
          <NavItemComponent key={item.label} item={item as NavItem} collapsed={collapsed} />
        ))}
      </nav>

      {/* Bottom actions */}
      <div className="p-3 border-t border-sidebar-border space-y-0.5">
        <Link to="/" className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-sidebar-foreground hover:text-white hover:bg-sidebar-accent/50 transition-all ${collapsed ? 'justify-center' : ''}`}>
          <Home className="w-4 h-4 flex-shrink-0" />
          {!collapsed && 'Back to Home'}
        </Link>
        <button
          onClick={handleLogout}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all ${collapsed ? 'justify-center' : ''}`}
        >
          <LogOut className="w-4 h-4 flex-shrink-0" />
          {!collapsed && 'Logout'}
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Desktop Sidebar */}
      <div className={`hidden lg:flex flex-col transition-all duration-300 ${sidebarOpen ? 'w-64' : 'w-16'}`}>
        <SidebarContent collapsed={!sidebarOpen} />
      </div>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {mobileSidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 z-40 lg:hidden"
              onClick={() => setMobileSidebarOpen(false)}
            />
            <motion.div
              initial={{ x: -256 }}
              animate={{ x: 0 }}
              exit={{ x: -256 }}
              className="fixed left-0 top-0 bottom-0 w-64 z-50 lg:hidden"
            >
              <SidebarContent collapsed={false} />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="flex items-center justify-between px-4 lg:px-6 h-16 border-b border-border bg-card/50 backdrop-blur-sm flex-shrink-0">
          <div className="flex items-center gap-3">
            <button
              onClick={() => { setSidebarOpen(!sidebarOpen); setMobileSidebarOpen(!mobileSidebarOpen); }}
              className="p-2 rounded-lg hover:bg-muted transition-all text-muted-foreground hover:text-foreground"
            >
              <Menu className="w-4 h-4" />
            </button>
            {title && <h1 className="text-base font-semibold hidden sm:block">{title}</h1>}
          </div>

          <div className="flex items-center gap-2">
            {/* Search */}
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-muted text-muted-foreground text-sm w-48">
              <Search className="w-3.5 h-3.5" />
              <span>Search...</span>
            </div>
            <button onClick={toggleTheme} className="p-2 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-all">
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <button className="relative p-2 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-all">
              <Bell className="w-4 h-4" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            </button>
            <img src={user?.avatar} alt={user?.name} className="w-8 h-8 rounded-full ring-2 ring-primary/30" />
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
