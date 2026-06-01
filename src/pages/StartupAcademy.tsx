import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Filter, Star, Clock, Users, BookOpen, Play, Award, ChevronRight, CheckCircle } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { COURSES } from '@/lib/mockData';
import { toast } from 'sonner';

const CATEGORIES = ['All', 'Foundation', 'Fundraising', 'Growth', 'Product', 'Finance', 'AI & Technology'];
const LEVELS = ['All', 'Beginner', 'Intermediate', 'Advanced'];

const StartupAcademy = () => {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [level, setLevel] = useState('All');

  const filtered = COURSES.filter(c => {
    const matchSearch = c.title.toLowerCase().includes(search.toLowerCase()) || c.description.toLowerCase().includes(search.toLowerCase());
    const matchCat = category === 'All' || c.category === category;
    const matchLevel = level === 'All' || c.level === level;
    return matchSearch && matchCat && matchLevel;
  });

  return (
    <div className="bg-background min-h-screen">
      <Navbar />
      {/* Hero */}
      <section className="pt-28 pb-16 bg-gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/30" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-purple-500/20 text-purple-300 text-sm font-semibold mb-4"><BookOpen className="w-3.5 h-3.5" /> Startup Academy</span>
            <h1 className="text-5xl font-bold text-white mb-4">Learn from startup practitioners</h1>
            <p className="text-white/60 text-xl max-w-2xl mx-auto mb-8">100+ courses, bootcamps, and case studies crafted by successful founders, investors, and industry experts.</p>
            <div className="flex flex-wrap gap-4 justify-center text-sm text-white/50">
              {['100+ courses', 'Certificates', 'Lifetime access', 'Updated monthly'].map(t => (
                <span key={t} className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-green-400" />{t}</span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 border-b border-border bg-card/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search courses..." className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm placeholder-muted-foreground focus:outline-none focus:border-primary" />
            </div>
            <div className="flex gap-2 flex-wrap">
              {LEVELS.map(l => (
                <button key={l} onClick={() => setLevel(l)} className={`px-4 py-2 rounded-xl text-sm transition-all ${level === l ? 'bg-primary text-primary-foreground' : 'border border-border text-muted-foreground hover:border-primary/50'}`}>{l}</button>
              ))}
            </div>
          </div>
          <div className="flex gap-2 flex-wrap mt-3">
            {CATEGORIES.map(c => (
              <button key={c} onClick={() => setCategory(c)} className={`px-3 py-1.5 rounded-full text-xs transition-all ${category === c ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-muted/80'}`}>{c}</button>
            ))}
          </div>
        </div>
      </section>

      {/* Courses */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-muted-foreground text-sm mb-6">{filtered.length} courses found</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((course, i) => (
              <motion.div key={course.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="rounded-2xl border border-border bg-card overflow-hidden group hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 transition-all">
                <div className="relative aspect-video overflow-hidden">
                  <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center">
                      <Play className="w-5 h-5 text-primary ml-0.5" />
                    </div>
                  </div>
                  <div className="absolute top-3 left-3 flex gap-2">
                    <span className="px-2 py-1 rounded-lg bg-black/60 text-white text-xs font-medium backdrop-blur-sm">{course.level}</span>
                    <span className="px-2 py-1 rounded-lg bg-primary/80 text-white text-xs font-medium backdrop-blur-sm">{course.category}</span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-foreground mb-1.5 line-clamp-2 leading-tight">{course.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{course.description}</p>
                  <p className="text-xs text-muted-foreground mb-3">by <span className="font-medium text-foreground">{course.instructor}</span></p>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground mb-4">
                    <span className="flex items-center gap-1"><Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" /> {course.rating}</span>
                    <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" /> {course.students.toLocaleString()}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {course.duration}</span>
                    <span className="flex items-center gap-1"><BookOpen className="w-3.5 h-3.5" /> {course.lessons} lessons</span>
                  </div>
                  <div className="flex gap-2 flex-wrap mb-4">
                    {course.tags.slice(0, 2).map(t => <span key={t} className="px-2 py-0.5 rounded-full bg-muted text-muted-foreground text-xs">{t}</span>)}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-primary">₹{course.price.toLocaleString('en-IN')}</span>
                    <button onClick={() => toast.success(`Enrolled in "${course.title}"!`)} className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-all">
                      Enroll Now
                    </button>
                  </div>
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

export default StartupAcademy;
