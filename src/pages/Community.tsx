import { motion } from 'framer-motion';
import { Users, MessageSquare, Calendar, Globe, ArrowRight, Zap, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { TESTIMONIALS } from '@/lib/mockData';
import networkImg from '@/assets/networking-event.jpg';
import { toast } from 'sonner';

const EVENTS = [
  { title: 'Founder Fireside: Scaling from 0 to ₹10Cr', date: 'Jun 15, 2025', type: 'Online', attendees: 340, tags: ['Growth', 'Revenue'] },
  { title: 'Bangalore Startup Meetup', date: 'Jun 22, 2025', type: 'In-Person', attendees: 120, tags: ['Networking', 'Bangalore'] },
  { title: 'Investor Pitch Day — Seed Round', date: 'Jul 5, 2025', type: 'Hybrid', attendees: 85, tags: ['Fundraising', 'Pitch'] },
  { title: 'AI in Startups Masterclass', date: 'Jul 12, 2025', type: 'Online', attendees: 510, tags: ['AI', 'Technology'] },
];

const THREADS = [
  { user: 'Karan M.', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=karan', post: 'Just closed our seed round! AMA for the next 30 minutes about the fundraising process...', likes: 84, replies: 32, time: '2h ago', tag: 'Fundraising' },
  { user: 'Ananya S.', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ananya2', post: 'Looking for a technical co-founder with experience in ML/AI for a HealthTech startup. 30% equity + salary. DM me!', likes: 47, replies: 18, time: '4h ago', tag: 'Co-Founder' },
  { user: 'Rohit P.', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=rohitp', post: 'Which CRM do you recommend for early-stage B2B sales? Currently between HubSpot and Zoho...', likes: 23, replies: 41, time: '6h ago', tag: 'Tools' },
  { user: 'Divya K.', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=divyak', post: 'Our D2C brand just hit ₹1Cr monthly revenue! Here is what worked and what did not...', likes: 156, replies: 67, time: '1d ago', tag: 'D2C' },
];

const CommunityPage = () => (
  <div className="bg-background min-h-screen">
    <Navbar />
    <section className="pt-28 pb-16 bg-gradient-hero relative overflow-hidden">
      <div className="absolute inset-0">
        <img src={networkImg} alt="" className="w-full h-full object-cover opacity-15" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0F172A]/70 to-[#0F172A]" />
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-purple-500/20 text-purple-300 text-sm font-semibold mb-4"><Globe className="w-3.5 h-3.5" /> Founder Community</span>
          <h1 className="text-5xl font-bold text-white mb-4">Where founders come to grow</h1>
          <p className="text-white/60 text-xl max-w-2xl mx-auto mb-8">50,000+ founders, mentors, and investors building together. Join the most vibrant startup community in India.</p>
          <button onClick={() => toast.success('Joined the community!')} className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-white font-semibold hover:bg-primary/90 transition-all">
            <Users className="w-4 h-4" /> Join Community Free
          </button>
        </motion.div>
      </div>
    </section>

    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Community Feed */}
          <div className="lg:col-span-2">
            <h2 className="text-xl font-bold text-foreground mb-6">Community Feed</h2>
            <div className="space-y-4">
              {THREADS.map((t, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="p-5 rounded-2xl border border-border bg-card hover:border-primary/30 transition-all">
                  <div className="flex items-start gap-3 mb-3">
                    <img src={t.avatar} alt={t.user} className="w-10 h-10 rounded-full bg-muted flex-shrink-0" />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-semibold text-foreground text-sm">{t.user}</p>
                        <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs">{t.tag}</span>
                        <span className="text-xs text-muted-foreground ml-auto">{t.time}</span>
                      </div>
                      <p className="text-muted-foreground text-sm leading-relaxed">{t.post}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 pt-3 border-t border-border">
                    <button onClick={() => toast.success('Liked!')} className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-red-500 transition-colors">
                      <Heart className="w-3.5 h-3.5" /> {t.likes}
                    </button>
                    <button onClick={() => toast.info('Opening thread...')} className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors">
                      <MessageSquare className="w-3.5 h-3.5" /> {t.replies} replies
                    </button>
                    <button onClick={() => toast.success('Shared!')} className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors ml-auto">
                      Share
                    </button>
                  </div>
                </motion.div>
              ))}
              <button onClick={() => toast.info('Loading more posts...')} className="w-full py-3 rounded-xl border border-border text-muted-foreground text-sm hover:bg-muted transition-all">
                Load More Posts
              </button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Upcoming Events */}
            <div className="rounded-2xl border border-border bg-card p-5">
              <h3 className="font-semibold text-foreground mb-4">Upcoming Events</h3>
              <div className="space-y-3">
                {EVENTS.map((e, i) => (
                  <div key={i} className="p-3 rounded-xl border border-border hover:border-primary/30 transition-all cursor-pointer" onClick={() => toast.success(`Registered for "${e.title}"!`)}>
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <p className="font-medium text-foreground text-xs line-clamp-2">{e.title}</p>
                      <span className={`px-2 py-0.5 rounded-full text-xs flex-shrink-0 ${e.type === 'Online' ? 'bg-blue-500/10 text-blue-500' : e.type === 'In-Person' ? 'bg-green-500/10 text-green-500' : 'bg-purple-500/10 text-purple-500'}`}>{e.type}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Calendar className="w-3 h-3" /> {e.date}
                      <Users className="w-3 h-3 ml-2" /> {e.attendees}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="rounded-2xl border border-border bg-card p-5">
              <h3 className="font-semibold text-foreground mb-4">Community Stats</h3>
              {[
                { label: 'Members', value: '50,000+' },
                { label: 'Daily Active', value: '8,200+' },
                { label: 'Posts Today', value: '340' },
                { label: 'Cities', value: '50+' },
              ].map(s => (
                <div key={s.label} className="flex justify-between py-2 border-b border-border last:border-0">
                  <span className="text-sm text-muted-foreground">{s.label}</span>
                  <span className="font-bold text-foreground text-sm">{s.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
    <Footer />
  </div>
);

export default CommunityPage;
