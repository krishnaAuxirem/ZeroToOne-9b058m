import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, User, Lightbulb, BarChart3, TrendingUp,
  FileText, DollarSign, Users, BookOpen, Calendar, Settings, LogOut,
  Bell, Search, Menu, X, ChevronRight, Briefcase, Target, MessageSquare,
  Globe, Zap, Star, Rocket, UserPlus, CheckSquare,
  FolderOpen, Activity, CreditCard, Home, ChevronDown, Shield, PanelLeftClose, PanelLeft
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { Sun, Moon } from 'lucide-react';
import logoImg from '@/assets/logo.png';

const FOUNDER_NAV = [
  { label: 'Overview', href: '/dashboard/founder', icon: LayoutDashboard },
  { label: 'Startup Validation', href: '/dashboard/founder/startup-validation', icon: Lightbulb },
  { label: 'Business Plan', href: '/dashboard/founder/business-plan', icon: FileText },
  { label: 'AI Copilot', href: '/dashboard/founder/ai-copilot', icon: Zap },
  { label: 'Team Building', href: '/dashboard/founder/team-building', icon: Users },
  { label: 'Startup Academy', href: '/dashboard/founder/academy', icon: BookOpen },
  { label: 'Mentor Booking', href: '/dashboard/founder/mentor-booking', icon: Star },
  { label: 'Fundraising', href: '/dashboard/founder/fundraising', icon: CreditCard },
  { label: 'Execution Workspace', href: '/dashboard/founder/execution-workspace', icon: CheckSquare },
  { label: 'Community', href: '/dashboard/founder/community', icon: MessageSquare },
  { label: 'Analytics', href: '/dashboard/founder/analytics', icon: BarChart3 },
  { label: 'Profile', href: '/dashboard/founder/profile', icon: User },
  { label: 'Settings', href: '/dashboard/founder/settings', icon: Settings },
];

const MENTOR_NAV = [
  { label: 'Overview', href: '/dashboard/mentor', icon: LayoutDashboard },
  { label: 'My Profile', href: '/dashboard/mentor/profile', icon: User },
  { label: 'Consultation Requests', href: '/dashboard/mentor/consultation-requests', icon: Bell },
  { label: 'Bookings', href: '/dashboard/mentor/bookings', icon: Calendar },
  { label: '1:1 Sessions', href: '/dashboard/mentor/one-to-one-sessions', icon: Users },
  { label: 'Group Sessions', href: '/dashboard/mentor/group-sessions', icon: Globe },
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
  { label: 'Startup Discovery', href: '/dashboard/investor/startup-discovery', icon: Globe },
  { label: 'Startup Showcase', href: '/dashboard/investor/startup-showcase', icon: Rocket },
  { label: 'Pitch Deck Review', href: '/dashboard/investor/pitch-review', icon: FileText },
  { label: 'Investment Opportunities', href: '/dashboard/investor/opportunities', icon: TrendingUp },
  { label: 'Funding Analytics', href: '/dashboard/investor/analytics', icon: BarChart3 },
  { label: 'Messages', href: '/dashboard/investor/messages', icon: MessageSquare },
  { label: 'Settings', href: '/dashboard/investor/settings', icon: Settings },
];

const TEAM_NAV = [
  { label: 'Overview', href: '/dashboard/team', icon: LayoutDashboard },
  { label: 'Assigned Projects', href: '/dashboard/team/projects', icon: Briefcase },
  { label: 'Tasks', href: '/dashboard/team/tasks', icon: CheckSquare },
  { label: 'Milestones', href: '/dashboard/team/milestones', icon: Target },
  { label: 'Collaboration', href: '/dashboard/team/collaboration', icon: MessageSquare },
  { label: 'Documents', href: '/dashboard/team/documents', icon: FolderOpen },
  { label: 'Progress Tracking', href: '/dashboard/team/progress', icon: Activity },
  { label: 'Messages', href: '/dashboard/team/messages', icon: MessageSquare },
  { label: 'Settings', href: '/dashboard/team/settings', icon: Settings },
];

const ADMIN_NAV = [
  { label: 'Overview', href: '/dashboard/admin', icon: LayoutDashboard },
  { label: 'User Management', href: '/dashboard/admin/users', icon: Users },
  { label: 'Founder Management', href: '/dashboard/admin/founders', icon: Rocket },
  { label: 'Mentor Management', href: '/dashboard/admin/mentors', icon: Star },
  { label: 'Investor Management', href: '/dashboard/admin/investors', icon: Briefcase },
  { label: 'Team Members', href: '/dashboard/admin/team-members', icon: UserPlus },
  { label: 'Blog Management', href: '/dashboard/admin/blogs', icon: Globe },
  { label: 'Content Management', href: '/dashboard/admin/content', icon: FileText },
  { label: 'Community Moderation', href: '/dashboard/admin/community', icon: MessageSquare },
  { label: 'Revenue Monitoring', href: '/dashboard/admin/revenue', icon: DollarSign },
  { label: 'Platform Analytics', href: '/dashboard/admin/analytics', icon: BarChart3 },
  { label: 'Settings', href: '/dashboard/admin/settings', icon: Settings },
];

type NavItem = {
  label: string;
  href?: string;
  icon: React.ComponentType<{ className?: string }>;
  children?: NavItem[];
};

const roleConfig: Record<string, { color: string; bg: string; label: string; accent: string }> = {
  founder: { color: 'text-blue-400', bg: 'bg-blue-500/15 border-blue-500/25', label: 'Founder', accent: '#3B82F6' },
  mentor: { color: 'text-purple-400', bg: 'bg-purple-500/15 border-purple-500/25', label: 'Mentor', accent: '#8B5CF6' },
  investor: { color: 'text-emerald-400', bg: 'bg-emerald-500/15 border-emerald-500/25', label: 'Investor', accent: '#10B981' },
  team: { color: 'text-orange-400', bg: 'bg-orange-500/15 border-orange-500/25', label: 'Team', accent: '#F97316' },
  admin: { color: 'text-red-400', bg: 'bg-red-500/15 border-red-500/25', label: 'Admin', accent: '#EF4444' },
};

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
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all duration-200 ${
            open
              ? 'text-white bg-white/8'
              : 'text-white/50 hover:text-white/85 hover:bg-white/5'
          }`}
        >
          <Icon className="w-4 h-4 flex-shrink-0" />
          {!collapsed && (
            <>
              <span className="flex-1 text-left font-medium">{item.label}</span>
              <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
                <ChevronDown className="w-3.5 h-3.5" />
              </motion.div>
            </>
          )}
        </button>
        <AnimatePresence>
          {open && !collapsed && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="ml-4 mt-1 space-y-0.5 border-l border-white/8 pl-3"
            >
              {item.children.map((child) => (
                <Link
                  key={child.href}
                  to={child.href!}
                  className={`flex items-center gap-2.5 px-2 py-2 rounded-lg text-sm transition-all duration-200 ${
                    location.pathname === child.href
                      ? 'text-white bg-blue-500/15 font-medium'
                      : 'text-white/45 hover:text-white/80 hover:bg-white/5'
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
      className={`relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all duration-200 group/item ${
        isActive
          ? 'sidebar-item-active text-white font-semibold'
          : 'text-white/50 hover:text-white/85 hover:bg-white/5'
      }`}
    >
      <Icon className={`w-4 h-4 flex-shrink-0 transition-transform duration-200 group-hover/item:scale-110 ${isActive ? 'text-blue-400' : ''}`} />
      {!collapsed && (
        <>
          <span className="flex-1 truncate">{item.label}</span>
          {isActive && (
            <motion.div
              initial={{ opacity: 0, x: -4 }}
              animate={{ opacity: 1, x: 0 }}
              className="w-1.5 h-1.5 rounded-full bg-blue-400"
            />
          )}
        </>
      )}
      {/* Tooltip for collapsed */}
      {collapsed && (
        <div className="absolute left-full ml-2 px-2.5 py-1.5 rounded-lg bg-slate-800 border border-white/10 text-white text-xs font-medium whitespace-nowrap opacity-0 pointer-events-none group-hover/item:opacity-100 transition-opacity z-50 shadow-xl">
          {item.label}
        </div>
      )}
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
  const [notifOpen, setNotifOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const { user, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const role = user?.role || 'founder';
  const rc = roleConfig[role] || roleConfig.founder;

  useEffect(() => {
    setMobileSidebarOpen(false);
  }, [location.pathname]);

  const navItems = role === 'founder' ? FOUNDER_NAV
    : role === 'mentor' ? MENTOR_NAV
    : role === 'investor' ? INVESTOR_NAV
    : role === 'team' ? TEAM_NAV
    : ADMIN_NAV;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const NOTIFICATIONS = [
    { id: 1, text: 'New consultation request from Karan Mehta', time: '2m ago', unread: true, dot: 'bg-blue-400' },
    { id: 2, text: 'Your session with Neha Agarwal is confirmed', time: '1h ago', unread: true, dot: 'bg-green-400' },
    { id: 3, text: 'Revenue milestone: ₹1L reached this month!', time: '3h ago', unread: false, dot: 'bg-yellow-400' },
  ];

  const SidebarContent = ({ collapsed }: { collapsed: boolean }) => (
    <div
      className="flex flex-col h-full"
      style={{
        background: 'linear-gradient(180deg, rgba(10,14,28,0.98) 0%, rgba(8,12,24,1) 100%)',
        borderRight: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      {/* Logo + Toggle */}
      <div className={`flex items-center h-16 px-4 border-b border-white/5 ${collapsed ? 'justify-center' : 'gap-3'}`}>
        <motion.div whileHover={{ scale: 1.08 }} className="flex-shrink-0">
          <div className="w-8 h-8 rounded-xl overflow-hidden ring-1 ring-blue-500/30 shadow-lg shadow-blue-500/20">
            <img src={logoImg} alt="ZeroToOne" className="w-full h-full object-cover" />
          </div>
        </motion.div>
        {!collapsed && (
          <motion.span
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-base font-bold text-white font-['Space_Grotesk'] flex-1"
          >
            Zero<span className="text-gradient">To</span>One
          </motion.span>
        )}
      </div>

      {/* User card */}
      <div className={`px-3 py-3 border-b border-white/5 ${collapsed ? 'flex justify-center' : ''}`}>
        {!collapsed ? (
          <div className="flex items-center gap-3 px-2 py-2 rounded-xl hover:bg-white/5 transition-all cursor-default group">
            <div className="relative flex-shrink-0">
              <img
                src={user?.avatar}
                alt={user?.name}
                className="w-9 h-9 rounded-full ring-2 ring-offset-0"
                style={{ ringColor: rc.accent }}
              />
              <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-400 border-2 border-[#0a0e1c]" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-white truncate">{user?.name}</p>
              <span className={`inline-flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded-full font-semibold border ${rc.bg} ${rc.color}`}>
                {role === 'admin' && <Shield className="w-2.5 h-2.5" />}
                {rc.label}
              </span>
            </div>
          </div>
        ) : (
          <div className="relative">
            <img src={user?.avatar} alt={user?.name} className="w-8 h-8 rounded-full ring-1 ring-blue-500/30" />
            <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-[#0a0e1c]" />
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-2.5 space-y-0.5 overflow-y-auto scrollbar-hide">
        {!collapsed && (
          <p className="text-[10px] font-bold text-white/20 uppercase tracking-widest px-3 py-2">
            Navigation
          </p>
        )}
        {navItems.map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.03, duration: 0.3 }}
          >
            <NavItemComponent item={item as NavItem} collapsed={collapsed} />
          </motion.div>
        ))}
      </nav>

      {/* Bottom */}
      <div className="p-2.5 border-t border-white/5 space-y-0.5">
        <Link
          to="/"
          title={collapsed ? 'Back to Home' : undefined}
          className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-white/35 hover:text-white/70 hover:bg-white/5 transition-all group/home ${collapsed ? 'justify-center relative' : ''}`}
        >
          <Home className="w-4 h-4 flex-shrink-0 group-hover/home:scale-110 transition-transform" />
          {!collapsed && <span>Back to Home</span>}
          {collapsed && (
            <div className="absolute left-full ml-2 px-2.5 py-1.5 rounded-lg bg-slate-800 border border-white/10 text-white text-xs font-medium whitespace-nowrap opacity-0 pointer-events-none group-hover/home:opacity-100 transition-opacity z-50 shadow-xl">
              Back to Home
            </div>
          )}
        </Link>
        <button
          onClick={handleLogout}
          title={collapsed ? 'Logout' : undefined}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-red-400/60 hover:text-red-400 hover:bg-red-500/8 transition-all group/logout ${collapsed ? 'justify-center relative' : ''}`}
        >
          <LogOut className="w-4 h-4 flex-shrink-0 group-hover/logout:scale-110 transition-transform" />
          {!collapsed && <span>Logout</span>}
          {collapsed && (
            <div className="absolute left-full ml-2 px-2.5 py-1.5 rounded-lg bg-slate-800 border border-white/10 text-white text-xs font-medium whitespace-nowrap opacity-0 pointer-events-none group-hover/logout:opacity-100 transition-opacity z-50 shadow-xl">
              Logout
            </div>
          )}
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Desktop Sidebar */}
      <motion.div
        animate={{ width: sidebarOpen ? 252 : 60 }}
        transition={{ duration: 0.3, type: 'spring', stiffness: 200, damping: 30 }}
        className="hidden lg:flex flex-col overflow-hidden flex-shrink-0"
      >
        <SidebarContent collapsed={!sidebarOpen} />
      </motion.div>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {mobileSidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setMobileSidebarOpen(false)}
            />
            <motion.div
              initial={{ x: -260 }}
              animate={{ x: 0 }}
              exit={{ x: -260 }}
              transition={{ type: 'spring', stiffness: 260, damping: 30 }}
              className="fixed left-0 top-0 bottom-0 w-[252px] z-50 lg:hidden"
            >
              <SidebarContent collapsed={false} />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        {/* Top Bar */}
        <header
          className="flex items-center justify-between px-4 lg:px-5 h-16 flex-shrink-0 border-b"
          style={{
            background: 'hsl(var(--card)/0.8)',
            backdropFilter: 'blur(20px)',
            borderColor: 'hsl(var(--border))',
          }}
        >
          <div className="flex items-center gap-3">
            {/* Sidebar toggle */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setSidebarOpen(!sidebarOpen);
                setMobileSidebarOpen(!mobileSidebarOpen);
              }}
              className="p-2 rounded-xl hover:bg-muted transition-all text-muted-foreground hover:text-foreground"
            >
              {sidebarOpen ? <PanelLeftClose className="w-4 h-4" /> : <PanelLeft className="w-4 h-4" />}
            </motion.button>

            {/* Breadcrumb title */}
            {title && (
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground/50 text-sm hidden sm:block">Dashboard</span>
                <ChevronRight className="w-3.5 h-3.5 text-muted-foreground/30 hidden sm:block" />
                <span className="text-sm font-semibold text-foreground hidden sm:block">{title}</span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-1.5">
            {/* Search */}
            <motion.div
              animate={{ width: searchFocused ? 220 : 160 }}
              transition={{ duration: 0.2 }}
              className={`hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl border text-sm transition-all ${
                searchFocused
                  ? 'bg-muted border-primary/40 shadow-sm shadow-primary/10'
                  : 'bg-muted/60 border-border'
              }`}
            >
              <Search className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" />
              <input
                type="text"
                placeholder="Search..."
                className="bg-transparent outline-none text-foreground text-sm placeholder:text-muted-foreground w-full"
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
              />
            </motion.div>

            {/* Theme toggle */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleTheme}
              className="p-2 rounded-xl hover:bg-muted text-muted-foreground hover:text-foreground transition-all"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={isDark ? 'dark' : 'light'}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                </motion.div>
              </AnimatePresence>
            </motion.button>

            {/* Notifications */}
            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setNotifOpen(!notifOpen)}
                className="relative p-2 rounded-xl hover:bg-muted text-muted-foreground hover:text-foreground transition-all"
              >
                <Bell className="w-4 h-4" />
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-card"
                />
              </motion.button>

              <AnimatePresence>
                {notifOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.96 }}
                    transition={{ duration: 0.18 }}
                    className="absolute right-0 top-full mt-2 w-80 rounded-2xl border border-border bg-card shadow-2xl z-50 overflow-hidden"
                  >
                    <div className="px-4 py-3 border-b border-border flex items-center justify-between">
                      <p className="text-sm font-semibold text-foreground">Notifications</p>
                      <span className="px-2 py-0.5 rounded-full bg-red-500/10 text-red-500 text-xs font-bold">
                        {NOTIFICATIONS.filter(n => n.unread).length} new
                      </span>
                    </div>
                    <div>
                      {NOTIFICATIONS.map((n, i) => (
                        <motion.div
                          key={n.id}
                          initial={{ opacity: 0, x: 10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.05 }}
                          className={`flex items-start gap-3 px-4 py-3 hover:bg-muted/50 transition-all cursor-pointer border-b border-border/50 last:border-0 ${n.unread ? 'bg-primary/3' : ''}`}
                        >
                          <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${n.dot} ${n.unread ? 'animate-pulse' : 'opacity-30'}`} />
                          <div className="flex-1 min-w-0">
                            <p className={`text-xs leading-relaxed ${n.unread ? 'text-foreground font-medium' : 'text-muted-foreground'}`}>
                              {n.text}
                            </p>
                            <p className="text-[11px] text-muted-foreground/60 mt-1">{n.time}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                    <div className="px-4 py-2.5 border-t border-border">
                      <button className="text-xs text-primary font-medium hover:underline">View all notifications</button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Avatar */}
            <div className="relative flex-shrink-0">
              <motion.div whileHover={{ scale: 1.05 }} className="cursor-pointer">
                <img
                  src={user?.avatar}
                  alt={user?.name}
                  className="w-8 h-8 rounded-full ring-2 ring-primary/30 hover:ring-primary/60 transition-all"
                />
              </motion.div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
            className="p-4 lg:p-6 min-h-full"
          >
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
