import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Filter, Star, MapPin, Clock, Award, CheckCircle, GraduationCap } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { MENTORS } from '@/lib/mockData';
import { toast } from 'sonner';

const EXPERTISE_FILTERS = ['All', 'B2B SaaS', 'Growth Marketing', 'FinTech', 'Tech Architecture', 'Operations', 'Fundraising'];

const MentorsPage = () => {
  const [search, setSearch] = useState('');
  const [expertise, setExpertise] = useState('All');
  const [availableOnly, setAvailableOnly] = useState(false);

  const filtered = MENTORS.filter(m => {
    const matchSearch = m.name.toLowerCase().includes(search.toLowerCase()) || m.title.toLowerCase().includes(search.toLowerCase());
    const matchExp = expertise === 'All' || m.expertise.some(e => e.toLowerCase().includes(expertise.toLowerCase()));
    const matchAvail = !availableOnly || m.available;
    return matchSearch && matchExp && matchAvail;
  });

  return (
    <div className="bg-background min-h-screen">
      <Navbar />
      <section className="pt-28 pb-16 bg-gradient-hero relative overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-yellow-500/20 text-yellow-300 text-sm font-semibold mb-4"><GraduationCap className="w-3.5 h-3.5" /> Mentor Marketplace</span>
            <h1 className="text-5xl font-bold text-white mb-4">Learn from the best in the game</h1>
            <p className="text-white/60 text-xl max-w-2xl mx-auto">500+ vetted mentors — founders, investors, and industry experts ready to guide your startup.</p>
          </motion.div>
        </div>
      </section>

      <section className="py-8 border-b border-border bg-card/30 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search mentors by name or expertise..." className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm placeholder-muted-foreground focus:outline-none focus:border-primary" />
            </div>
            <label className="flex items-center gap-2 cursor-pointer text-sm text-muted-foreground whitespace-nowrap">
              <input type="checkbox" checked={availableOnly} onChange={e => setAvailableOnly(e.target.checked)} className="accent-primary" />
              Available Now
            </label>
          </div>
          <div className="flex gap-2 flex-wrap mt-3">
            {EXPERTISE_FILTERS.map(e => (
              <button key={e} onClick={() => setExpertise(e)} className={`px-3 py-1.5 rounded-full text-xs transition-all ${expertise === e ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-muted/80'}`}>{e}</button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-muted-foreground text-sm mb-6">{filtered.length} mentors available</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((mentor, i) => (
              <motion.div key={mentor.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="p-6 rounded-2xl border border-border bg-card hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 transition-all group">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-3">
                    <div className="relative">
                      <img src={mentor.avatar} alt={mentor.name} className="w-16 h-16 rounded-2xl bg-muted" />
                      {mentor.available && <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-card" />}
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground">{mentor.name}</h3>
                      <p className="text-xs text-muted-foreground">{mentor.title}</p>
                      <p className="text-xs text-primary font-medium">{mentor.company}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 justify-end">
                      <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
                      <span className="text-sm font-bold text-foreground">{mentor.rating}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">{mentor.sessions} sessions</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{mentor.bio}</p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {mentor.expertise.map(e => <span key={e} className="px-2 py-0.5 rounded-full bg-muted text-muted-foreground text-xs">{e}</span>)}
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <div>
                    <p className="text-xs text-muted-foreground flex items-center gap-1"><MapPin className="w-3 h-3" /> {mentor.location}</p>
                    <p className="text-lg font-bold text-primary mt-0.5">₹{mentor.hourlyRate.toLocaleString('en-IN')}<span className="text-xs text-muted-foreground font-normal">/hr</span></p>
                  </div>
                  <button onClick={() => toast.success(`Session request sent to ${mentor.name}!`)} className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${mentor.available ? 'bg-primary text-primary-foreground hover:bg-primary/90' : 'bg-muted text-muted-foreground cursor-not-allowed'}`} disabled={!mentor.available}>
                    {mentor.available ? 'Book Session' : 'Unavailable'}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default MentorsPage;
