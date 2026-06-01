import { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Star, Clock, Users, Play, Search, Filter, Award, CheckCircle } from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { COURSES } from '@/lib/mockData';
import { toast } from 'sonner';

const MY_COURSES = [
  { courseId: 'c1', progress: 72, lastWatched: '2 days ago', nextLesson: 'Lesson 18: Customer Segmentation' },
  { courseId: 'c2', progress: 45, lastWatched: '5 days ago', nextLesson: 'Lesson 16: Investor Outreach Templates' },
];

const FounderAcademy = () => {
  const [tab, setTab] = useState<'enrolled' | 'browse'>('enrolled');
  const [search, setSearch] = useState('');

  const enrolledCourses = MY_COURSES.map(mc => {
    const course = COURSES.find(c => c.id === mc.courseId);
    return { ...mc, course };
  }).filter(mc => mc.course);

  const available = COURSES.filter(c => !MY_COURSES.find(mc => mc.courseId === c.id));
  const filtered = available.filter(c => !search || c.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <DashboardLayout title="Startup Academy">
      <div className="space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Enrolled Courses', value: `${enrolledCourses.length}`, color: 'text-purple-500' },
            { label: 'Hours Learned', value: '14h', color: 'text-blue-500' },
            { label: 'Certificates', value: '0', color: 'text-yellow-500' },
            { label: 'Avg Progress', value: `${Math.round(MY_COURSES.reduce((a, c) => a + c.progress, 0) / MY_COURSES.length)}%`, color: 'text-green-500' },
          ].map(s => (
            <div key={s.label} className="rounded-2xl border border-border bg-card p-4 text-center">
              <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-2">
          <button onClick={() => setTab('enrolled')} className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${tab === 'enrolled' ? 'bg-primary text-primary-foreground' : 'border border-border text-muted-foreground'}`}>
            My Courses ({enrolledCourses.length})
          </button>
          <button onClick={() => setTab('browse')} className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${tab === 'browse' ? 'bg-primary text-primary-foreground' : 'border border-border text-muted-foreground'}`}>
            Browse All
          </button>
        </div>

        {tab === 'enrolled' ? (
          <div className="space-y-4">
            {enrolledCourses.map(({ course, progress, lastWatched, nextLesson }) => (
              <motion.div key={course!.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                className="flex gap-5 p-5 rounded-2xl border border-border bg-card hover:border-primary/30 transition-all">
                <img src={course!.thumbnail} alt={course!.title} className="w-36 h-24 rounded-xl object-cover flex-shrink-0" />
                <div className="flex-1">
                  <h3 className="font-bold text-foreground mb-1">{course!.title}</h3>
                  <p className="text-xs text-muted-foreground mb-2">by {course!.instructor}</p>
                  <p className="text-xs text-primary mb-3 font-medium">Next: {nextLesson}</p>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden">
                      <div className="h-full rounded-full bg-primary" style={{ width: `${progress}%` }} />
                    </div>
                    <span className="text-xs font-semibold text-foreground">{progress}%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Last watched: {lastWatched}</span>
                    <button onClick={() => toast.success('Resuming course...')} className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-semibold hover:bg-primary/90 transition-all">
                      <Play className="w-3.5 h-3.5" /> Continue
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search courses..." className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-background text-sm text-foreground focus:outline-none focus:border-primary" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((course, i) => (
                <motion.div key={course.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                  className="rounded-2xl border border-border bg-card overflow-hidden hover:border-primary/30 transition-all">
                  <img src={course.thumbnail} alt={course.title} className="w-full aspect-video object-cover" />
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs">{course.category}</span>
                      <span className="px-2 py-0.5 rounded-full bg-muted text-muted-foreground text-xs">{course.level}</span>
                    </div>
                    <h3 className="font-bold text-foreground text-sm mb-1 line-clamp-2">{course.title}</h3>
                    <p className="text-xs text-muted-foreground mb-3">by {course.instructor}</p>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                      <span className="flex items-center gap-1"><Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />{course.rating}</span>
                      <span className="flex items-center gap-1"><Users className="w-3 h-3" />{course.students.toLocaleString()}</span>
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{course.duration}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-primary">₹{course.price.toLocaleString('en-IN')}</span>
                      <button onClick={() => toast.success(`Enrolled in "${course.title}"!`)} className="px-4 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-semibold hover:bg-primary/90 transition-all">
                        Enroll Now
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </>
        )}
      </div>
    </DashboardLayout>
  );
};

export default FounderAcademy;
