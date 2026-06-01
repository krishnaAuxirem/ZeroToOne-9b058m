import { Link } from 'react-router-dom';
import { Twitter, Linkedin, Instagram, Youtube, Mail, Phone, MapPin, Zap } from 'lucide-react';
import logoImg from '@/assets/logo.png';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#060d1f] border-t border-white/5 text-white/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg overflow-hidden">
                <img src={logoImg} alt="ZeroToOne" className="w-full h-full object-cover" />
              </div>
              <span className="text-xl font-bold text-white font-['Space_Grotesk']">
                Zero<span className="bg-gradient-to-r from-blue-400 to-orange-400 bg-clip-text text-transparent">To</span>One
              </span>
            </Link>
            <p className="text-sm leading-relaxed mb-6 text-white/50">
              India's premier AI-powered startup building platform. From idea to IPO — we're your co-founder, mentor, and growth partner.
            </p>
            <div className="flex gap-3">
              {[
                { icon: Twitter, href: '#' },
                { icon: Linkedin, href: '#' },
                { icon: Instagram, href: '#' },
                { icon: Youtube, href: '#' },
              ].map(({ icon: Icon, href }, i) => (
                <a key={i} href={href} className="w-9 h-9 rounded-lg bg-white/5 hover:bg-blue-600/30 flex items-center justify-center transition-all hover:text-blue-400">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Platform */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Platform</h4>
            <ul className="space-y-2.5 text-sm">
              {[
                ['Startup Academy', '/startup-academy'],
                ['Idea Validation', '/idea-validation'],
                ['AI Copilot', '/ai-copilot'],
                ['Startup Showcase', '/startup-showcase'],
                ['Mentor Marketplace', '/mentors'],
                ['Investor Connect', '/investors'],
              ].map(([label, href]) => (
                <li key={href}>
                  <Link to={href} className="hover:text-white hover:translate-x-1 transition-all inline-block">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Company</h4>
            <ul className="space-y-2.5 text-sm">
              {[
                ['About Us', '/about'],
                ['Our Mission', '/about#mission'],
                ['Careers', '/careers'],
                ['Partners', '/partners'],
                ['Success Stories', '/success-stories'],
                ['Blog', '/blog'],
                ['Community', '/community'],
                ['Pricing', '/pricing'],
              ].map(([label, href]) => (
                <li key={href}>
                  <Link to={href} className="hover:text-white hover:translate-x-1 transition-all inline-block">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support & Contact */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Support</h4>
            <ul className="space-y-2.5 text-sm mb-6">
              {[
                ['Help Center', '/help'],
                ['FAQ', '/faq'],
                ['Contact Us', '/contact'],
                ['Privacy Policy', '/privacy'],
                ['Terms & Conditions', '/terms'],
                ['Cookie Policy', '/cookies'],
                ['Refund Policy', '/refund'],
                ['Community Guidelines', '/guidelines'],
              ].map(([label, href]) => (
                <li key={href}>
                  <Link to={href} className="hover:text-white hover:translate-x-1 transition-all inline-block">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="space-y-2 text-xs text-white/40">
              <div className="flex items-center gap-2"><Mail className="w-3.5 h-3.5" /> hello@zerotoone.in</div>
              <div className="flex items-center gap-2"><Phone className="w-3.5 h-3.5" /> +91 90000 00000</div>
              <div className="flex items-center gap-2"><MapPin className="w-3.5 h-3.5" /> Bangalore, India</div>
            </div>
          </div>
        </div>

        {/* Newsletter */}
        <div className="border border-white/10 rounded-2xl p-6 mb-10 bg-gradient-to-r from-blue-900/20 to-orange-900/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="text-white font-semibold mb-1">Stay ahead of the startup curve</h4>
              <p className="text-sm text-white/50">Weekly insights, founder stories & funding news — straight to your inbox.</p>
            </div>
            <div className="flex gap-2 w-full md:w-auto">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 md:w-56 px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white text-sm placeholder-white/30 focus:outline-none focus:border-blue-500"
              />
              <button className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 text-white text-sm font-semibold hover:from-blue-500 hover:to-blue-400 transition-all flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5" /> Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-6 border-t border-white/5 text-xs text-white/30">
          <p>© {year} ZeroToOne Technologies Pvt. Ltd. All rights reserved.</p>
          <p>Made with care for Indian Founders</p>
          <div className="flex gap-4">
            <Link to="/privacy" className="hover:text-white/60">Privacy</Link>
            <Link to="/terms" className="hover:text-white/60">Terms</Link>
            <Link to="/cookies" className="hover:text-white/60">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
