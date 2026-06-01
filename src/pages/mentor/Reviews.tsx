import { motion } from 'framer-motion';
import { Star, ThumbsUp, MessageSquare, Award, TrendingUp, Filter } from 'lucide-react';
import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';

const REVIEWS = [
  { id: 1, founder: 'Karan Mehta', startup: 'CodeCraft', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=karan', rating: 5, date: 'May 30, 2025', topic: 'Product Strategy & PMF', comment: "Dr. Priya helped me pivot my business model at exactly the right time. Her market analysis framework is something I now use every week. Game-changing session!", helpful: 12 },
  { id: 2, founder: 'Neha Agarwal', startup: 'SkillUp', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=neha', rating: 5, date: 'May 25, 2025', topic: 'Fundraising Prep', comment: "The best mentor I've ever worked with. She gave me practical, immediately actionable advice on my fundraising strategy. Closed my seed round 2 months after our session!", helpful: 18 },
  { id: 3, founder: 'Vishal Rao', startup: 'DataPulse', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=vishal', rating: 4, date: 'May 20, 2025', topic: 'B2B Sales Playbook', comment: "Very insightful session on B2B enterprise sales. Helped me understand budget cycles and how to navigate procurement. Recommend to any early-stage B2B founder.", helpful: 7 },
  { id: 4, founder: 'Anjali Singh', startup: 'WellnessApp', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=anjali', rating: 5, date: 'May 12, 2025', topic: 'Go-to-Market Strategy', comment: "Incredibly structured session. We mapped out our full GTM in 60 minutes. Priya has a talent for cutting through the noise and finding the key levers.", helpful: 22 },
  { id: 5, founder: 'Deepika Rao', startup: 'EduPilot', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=deepika', rating: 5, date: 'May 8, 2025', topic: 'B2B School Sales', comment: "She helped me understand the school buying process completely. Her insights on who the real decision maker is in educational institutions saved us months of wasted effort.", helpful: 9 },
  { id: 6, founder: 'Nikhil Bose', startup: 'PayBridge', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=nikhilb', rating: 4, date: 'May 2, 2025', topic: 'Unit Economics', comment: "Great deep dive on unit economics. Helped me see blind spots in our CAC calculations. Would love a follow-up session once we implement the changes.", helpful: 5 },
];

const RATING_DIST = [
  { stars: 5, count: 198, pct: 69 },
  { stars: 4, count: 67, pct: 23 },
  { stars: 3, count: 18, pct: 6 },
  { stars: 2, count: 4, pct: 1 },
  { stars: 1, count: 0, pct: 0 },
];

const MentorReviews = () => {
  const [filterRating, setFilterRating] = useState(0);

  const filtered = filterRating === 0 ? REVIEWS : REVIEWS.filter(r => r.rating === filterRating);
  const avgRating = (REVIEWS.reduce((a, r) => a + r.rating, 0) / REVIEWS.length).toFixed(1);

  return (
    <DashboardLayout title="Reviews & Ratings">
      <div className="space-y-6">
        {/* Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="rounded-2xl border border-border bg-card p-6 text-center">
            <p className="text-6xl font-black text-foreground mb-2">{avgRating}</p>
            <div className="flex justify-center gap-1 mb-2">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 text-yellow-500 fill-yellow-500" />)}
            </div>
            <p className="text-muted-foreground text-sm">{REVIEWS.length} reviews · Top 5% mentor</p>
            <div className="flex items-center gap-2 justify-center mt-3">
              <Award className="w-5 h-5 text-yellow-500" />
              <span className="text-sm font-semibold text-foreground">ZeroToOne Featured Mentor</span>
            </div>
          </div>
          <div className="lg:col-span-2 rounded-2xl border border-border bg-card p-6">
            <h3 className="font-semibold text-foreground mb-4">Rating Distribution</h3>
            <div className="space-y-3">
              {RATING_DIST.map(({ stars, count, pct }) => (
                <div key={stars} className="flex items-center gap-3">
                  <div className="flex gap-0.5 w-20 flex-shrink-0">
                    {[...Array(stars)].map((_, i) => <Star key={i} className="w-3 h-3 text-yellow-500 fill-yellow-500" />)}
                  </div>
                  <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
                    <div className="h-full rounded-full bg-yellow-500 transition-all" style={{ width: `${pct}%` }} />
                  </div>
                  <span className="text-xs text-muted-foreground w-16 text-right">{count} reviews</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Filter by Stars */}
        <div className="flex gap-2 flex-wrap">
          <button onClick={() => setFilterRating(0)} className={`px-4 py-2 rounded-xl text-sm transition-all ${filterRating === 0 ? 'bg-primary text-primary-foreground' : 'border border-border text-muted-foreground'}`}>All Reviews</button>
          {[5, 4, 3].map(r => (
            <button key={r} onClick={() => setFilterRating(r)} className={`flex items-center gap-1 px-4 py-2 rounded-xl text-sm transition-all ${filterRating === r ? 'bg-yellow-500 text-white' : 'border border-border text-muted-foreground'}`}>
              <Star className="w-3.5 h-3.5" /> {r} Stars
            </button>
          ))}
        </div>

        {/* Reviews */}
        <div className="space-y-4">
          {filtered.map((review, i) => (
            <motion.div key={review.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
              className="rounded-2xl border border-border bg-card p-5">
              <div className="flex items-start gap-4">
                <img src={review.avatar} alt={review.founder} className="w-11 h-11 rounded-xl bg-muted flex-shrink-0" />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-foreground">{review.founder}</span>
                      <span className="text-muted-foreground text-sm">· {review.startup}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">{review.date}</span>
                  </div>
                  <div className="flex gap-1 mb-1">
                    {[...Array(review.rating)].map((_, j) => <Star key={j} className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />)}
                  </div>
                  <p className="text-xs text-primary/70 mb-2 font-medium">{review.topic}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed italic">"{review.comment}"</p>
                  <div className="flex items-center gap-2 mt-3">
                    <button className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-all">
                      <ThumbsUp className="w-3.5 h-3.5" /> Helpful ({review.helpful})
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default MentorReviews;
