import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Menu, X, Sun, Moon, ChevronDown, Zap, User, LogOut, LayoutDashboard, ArrowRight, Sparkles } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import logoImg from '@/assets/logo.png';

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  {
    label: 'Platform',
    href: '#',
    children: [
      { label: 'Startup Academy', href: '/startup-academy', desc: '100+ courses from founders' },
      { label: 'Startup Showcase', href: '/startup-showcase', desc: 'Discover funded startups' },
      { label: 'Community', href: '/community', desc: 'Connect with builders' },
    ],
  },
  { label: 'Mentors', href: '/mentors' },
  { label: 'Investors', href: '/investors' },
  { label: 'Success Stories', href: '/success-stories' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Blog', href: '/blog' },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const { user, isAuthenticated, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const { scrollY } = useScroll();
  const navBg = useTransform(scrollY, [0, 60], ['rgba(6,13,31,0)', 'rgba(6,13,31,0.85)']);
  const navBorder = useTransform(scrollY, [0, 60], ['rgba(255,255,255,0)', 'rgba(255,255,255,0.06)']);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setActiveDropdown(null);
  }, [location.pathname]);

  const getDashboardPath = () => {
    if (!user) return '/login';
    const paths: Record<string, string> = {
      founder: '/dashboard/founder',
      mentor: '/dashboard/mentor',
      investor: '/dashboard/investor',
      team: '/dashboard/team',
      admin: '/dashboard/admin',
    };
    return paths[user.role] || '/role-selection';
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isActive = (href: string) => {
    if (href === '/') return location.pathname === '/';
    return location.pathname.startsWith(href);
  };

  return (
    <motion.nav
      initial={{ y: -72, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      style={{
        background: navBg as any,
        borderBottomColor: navBorder as any,
        backdropFilter: isScrolled ? 'blur(20px)' : 'none',
      }}
      className="fixed top-0 left-0 right-0 z-50 border-b transition-all duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <motion.div
              whileHover={{ rotate: 5, scale: 1.08 }}
              transition={{ type: 'spring', stiffness: 400 }}
              className="w-8 h-8 rounded-xl overflow-hidden ring-1 ring-blue-500/30 shadow-md shadow-blue-500/20"
            >
              <img src={logoImg} alt="ZeroToOne" className="w-full h-full object-cover" />
            </motion.div>
            <span className="text-xl font-bold text-white font-['Space_Grotesk']">
              Zero<span className="text-gradient">To</span>One
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-0.5">
            {NAV_LINKS.map((link) => (
              <div key={link.label} className="relative">
                {link.children ? (
                  <div
                    onMouseEnter={() => setActiveDropdown(link.label)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <button className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                      isActive(link.href)
                        ? 'text-white bg-white/10'
                        : 'text-white/70 hover:text-white hover:bg-white/8'
                    }`}>
                      {link.label}
                      <motion.div animate={{ rotate: activeDropdown === link.label ? 180 : 0 }} transition={{ duration: 0.2 }}>
                        <ChevronDown className="w-3.5 h-3.5" />
                      </motion.div>
                    </button>
                    <AnimatePresence>
                      {activeDropdown === link.label && (
                        <motion.div
                          initial={{ opacity: 0, y: 8, scale: 0.97 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 8, scale: 0.97 }}
                          transition={{ duration: 0.15 }}
                          className="absolute top-full left-0 mt-2 w-64 rounded-2xl border border-white/8 overflow-hidden shadow-2xl shadow-black/50"
                          style={{ background: 'rgba(8,12,24,0.95)', backdropFilter: 'blur(20px)' }}
                        >
                          <div className="p-2">
                            {link.children.map((child) => (
                              <Link
                                key={child.href}
                                to={child.href}
                                className="flex items-start gap-3 px-3 py-2.5 rounded-xl hover:bg-white/6 transition-all group/dd"
                              >
                                <div className="flex-1">
                                  <p className="text-sm font-medium text-white/85 group-hover/dd:text-white transition-colors">{child.label}</p>
                                  {(child as any).desc && (
                                    <p className="text-xs text-white/35 mt-0.5">{(child as any).desc}</p>
                                  )}
                                </div>
                                <ArrowRight className="w-3.5 h-3.5 text-white/20 group-hover/dd:text-white/60 mt-0.5 group-hover/dd:translate-x-0.5 transition-all" />
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    to={link.href}
                    className={`relative px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                      isActive(link.href)
                        ? 'text-white bg-white/10 font-semibold'
                        : 'text-white/70 hover:text-white hover:bg-white/8'
                    }`}
                  >
                    {link.label}
                    {isActive(link.href) && link.href !== '#' && (
                      <motion.div
                        layoutId="nav-indicator"
                        className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-blue-400"
                      />
                    )}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Right Actions */}
          <div className="hidden lg:flex items-center gap-2">
            {/* Theme */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleTheme}
              className="p-2 rounded-xl text-white/60 hover:text-white hover:bg-white/8 transition-all"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={isDark ? 'd' : 'l'}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                </motion.div>
              </AnimatePresence>
            </motion.button>

            {isAuthenticated ? (
              <div className="flex items-center gap-2">
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Link
                    to={getDashboardPath()}
                    className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/8 border border-white/10 text-white text-sm font-medium hover:bg-white/14 hover:border-white/20 transition-all"
                  >
                    <LayoutDashboard className="w-3.5 h-3.5" />
                    Dashboard
                  </Link>
                </motion.div>

                {/* User dropdown */}
                <div className="relative group/user">
                  <motion.button
                    whileHover={{ scale: 1.04 }}
                    className="flex items-center gap-2 p-1 rounded-xl hover:bg-white/8 transition-all"
                  >
                    <img src={user?.avatar} alt={user?.name} className="w-7 h-7 rounded-full ring-1 ring-blue-500/40" />
                    <ChevronDown className="w-3.5 h-3.5 text-white/50" />
                  </motion.button>

                  <div
                    className="absolute right-0 top-full mt-2 w-52 rounded-2xl border border-white/8 overflow-hidden shadow-2xl shadow-black/50 opacity-0 pointer-events-none group-hover/user:opacity-100 group-hover/user:pointer-events-auto transition-all duration-200"
                    style={{ background: 'rgba(8,12,24,0.97)', backdropFilter: 'blur(20px)' }}
                  >
                    <div className="px-4 py-3 border-b border-white/6">
                      <p className="text-sm font-semibold text-white">{user?.name}</p>
                      <p className="text-xs text-white/40 capitalize mt-0.5">{user?.role} account</p>
                    </div>
                    <div className="p-1.5">
                      <Link to={getDashboardPath()} className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm text-white/70 hover:text-white hover:bg-white/6 transition-all">
                        <LayoutDashboard className="w-3.5 h-3.5" /> Dashboard
                      </Link>
                      <Link to="/profile" className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm text-white/70 hover:text-white hover:bg-white/6 transition-all">
                        <User className="w-3.5 h-3.5" /> Profile
                      </Link>
                      <button onClick={handleLogout} className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm text-red-400/80 hover:text-red-400 hover:bg-red-500/8 transition-all">
                        <LogOut className="w-3.5 h-3.5" /> Sign out
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="px-4 py-2 rounded-xl text-sm font-medium text-white/70 hover:text-white hover:bg-white/8 transition-all"
                >
                  Sign in
                </Link>
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <Link
                    to="/register"
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold bg-gradient-to-r from-blue-600 to-blue-500 text-white hover:from-blue-500 hover:to-blue-400 transition-all glow-blue-sm"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    Get Started
                  </Link>
                </motion.div>
              </div>
            )}
          </div>

          {/* Mobile Toggle */}
          <div className="lg:hidden flex items-center gap-1.5">
            <button onClick={toggleTheme} className="p-2 text-white/60 hover:text-white">
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 rounded-xl text-white/80 hover:text-white hover:bg-white/8 transition-all"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={mobileOpen ? 'x' : 'm'}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </motion.div>
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden border-t border-white/6 overflow-hidden"
            style={{ background: 'rgba(6,13,31,0.97)', backdropFilter: 'blur(20px)' }}
          >
            <div className="px-4 py-4 space-y-0.5 max-h-[75vh] overflow-y-auto">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                >
                  {link.children ? (
                    <>
                      <div className="px-3 py-1.5 text-[10px] font-bold text-white/25 uppercase tracking-widest mt-2">{link.label}</div>
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          to={child.href}
                          className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm text-white/60 hover:text-white hover:bg-white/6 ml-2"
                        >
                          <div className="w-1 h-1 rounded-full bg-white/20" />
                          {child.label}
                        </Link>
                      ))}
                    </>
                  ) : (
                    <Link
                      to={link.href}
                      className={`block px-3 py-2.5 rounded-xl text-sm font-medium ${
                        isActive(link.href) ? 'text-white bg-white/10' : 'text-white/60 hover:text-white hover:bg-white/6'
                      }`}
                    >
                      {link.label}
                    </Link>
                  )}
                </motion.div>
              ))}

              <div className="pt-3 border-t border-white/8 space-y-2 mt-2">
                {isAuthenticated ? (
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-3 px-3 py-2">
                      <img src={user?.avatar} alt={user?.name} className="w-8 h-8 rounded-full ring-1 ring-blue-500/30" />
                      <div>
                        <p className="text-sm font-semibold text-white">{user?.name}</p>
                        <p className="text-xs text-white/40 capitalize">{user?.role}</p>
                      </div>
                    </div>
                    <Link to={getDashboardPath()} className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-blue-600/15 text-blue-300 text-sm font-medium">
                      <LayoutDashboard className="w-4 h-4" /> Go to Dashboard
                    </Link>
                    <button onClick={handleLogout} className="w-full flex items-center gap-2 px-3 py-2.5 rounded-xl text-red-400 text-sm font-medium hover:bg-red-500/8">
                      <LogOut className="w-4 h-4" /> Sign out
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Link to="/login" className="block px-3 py-2.5 rounded-xl text-sm font-medium text-white/60 hover:text-white hover:bg-white/6 text-center">
                      Sign in
                    </Link>
                    <Link to="/register" className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-sm font-semibold bg-blue-600 text-white">
                      <Zap className="w-3.5 h-3.5" /> Get Started Free
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
