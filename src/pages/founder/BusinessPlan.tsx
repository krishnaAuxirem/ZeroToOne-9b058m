import { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, ChevronDown, ChevronUp, Save, Download, CheckCircle, Lightbulb, Target, DollarSign, Users, BarChart3, Globe, Zap } from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { toast } from 'sonner';

const SECTIONS = [
  { id: 'executive', title: 'Executive Summary', icon: FileText, content: 'EduVerse is an AI-powered personalized learning platform for K-12 students that adapts curriculum based on individual learning styles, pace, and proficiency gaps. We address the ₹20,000 Cr supplemental education market with a tech-first approach that delivers measurable learning outcomes 2x faster than traditional tutoring.' },
  { id: 'problem', title: 'Problem Statement', icon: Target, content: 'Indian students spend ₹2.5 lakh/year on average on coaching but 67% report dissatisfaction with outcomes. Existing solutions are one-size-fits-all, teacher-dependent, and fail to adapt to individual learning needs. There is no scalable, personalized learning solution in the Indian K-12 market.' },
  { id: 'solution', title: 'Our Solution', icon: Lightbulb, content: 'EduVerse uses a proprietary AI engine that continuously maps a student\'s knowledge graph, identifies gaps, and serves personalized micro-lessons. Key differentiators: (1) Real-time adaptive paths (2) Parent dashboard with progress insights (3) Live doubt resolution under 5 minutes (4) Vernacular language support.' },
  { id: 'market', title: 'Market Opportunity', icon: Globe, content: 'TAM: ₹20,000 Cr Indian supplemental education market. SAM: ₹8,000 Cr digital-first EdTech segment. SOM: ₹500 Cr within 3 years targeting 6-12 grade students in metros and Tier 2 cities. Market growing at 28% CAGR driven by smartphone penetration and post-COVID digital adoption.' },
  { id: 'revenue', title: 'Revenue Model', icon: DollarSign, content: 'B2C Subscription: ₹599/month per student (individual). School Partnerships: ₹2,500/student/year (B2B2C). Institutional: Custom pricing for coaching institutes. Premium tutoring: ₹250/session for live 1:1. Current MRR: ₹8.5L. MoM Growth: 22%. Gross margin: 78%.' },
  { id: 'team', title: 'Team', icon: Users, content: 'Arjun Sharma (CEO) — IIT Bombay, 2x founder, former PM at BYJU\'s. Priya Kumar (CTO) — IIT Delhi, ex-Google, AI/ML expert. Rahul Joshi (CPO) — XLRI, 8 years in EdTech product. Advisors: Dr. Aisha Khan (ex-Flipkart), Rajesh Iyer (GrowthLabs). 24-member team across Bangalore and Delhi.' },
  { id: 'traction', title: 'Traction & Milestones', icon: BarChart3, content: '125,000 registered students. 18,000 paying subscribers. ₹8.5L MRR (340% YoY growth). NPS: 72. Churn: 4.2% monthly. 5 school partnerships live. Featured in YourStory, Economic Times, Forbes India 30 Under 30 nominee 2025. Raised ₹12Cr seed round from Blume Ventures and AngelList India.' },
  { id: 'financials', title: 'Financial Projections', icon: BarChart3, content: 'FY25 Revenue Target: ₹4.5Cr. FY26: ₹18Cr. FY27: ₹65Cr. Breakeven: Q3 FY26. Current runway: 18 months. Seeking ₹50Cr Series A for: Product expansion (40%), Sales & Marketing (35%), Team (15%), Infrastructure (10%). Expected ARR at Series A close: ₹6Cr.' },
  { id: 'ask', title: 'The Ask', icon: Zap, content: 'Raising ₹50 Crore Series A at ₹200 Crore pre-money valuation. Use of funds: Geographic expansion to 10 cities, AI product R&D, school partnerships, content library expansion. Looking for investors with EdTech portfolio experience and networks in Tier 2 city education markets.' },
];

const FounderBusinessPlan = () => {
  const [expanded, setExpanded] = useState<string[]>(['executive']);
  const [editing, setEditing] = useState<string | null>(null);
  const [content, setContent] = useState<Record<string, string>>(Object.fromEntries(SECTIONS.map(s => [s.id, s.content])));

  const toggle = (id: string) => setExpanded(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  const completedCount = SECTIONS.length;

  return (
    <DashboardLayout title="Business Plan Builder">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="rounded-2xl bg-gradient-to-r from-blue-700 to-indigo-800 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-white">EduVerse — Business Plan</h1>
              <p className="text-blue-200 text-sm mt-1">{completedCount}/{SECTIONS.length} sections completed · Last saved 2 min ago</p>
              <div className="flex flex-wrap gap-2 mt-3">
                {['Investor-Ready', 'AI-Enhanced', 'v2.4'].map(tag => (
                  <span key={tag} className="px-3 py-1 rounded-full bg-white/20 text-white text-xs">{tag}</span>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <button onClick={() => toast.success('Business plan saved!')} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white text-blue-700 text-sm font-bold hover:bg-blue-50 transition-all">
                <Save className="w-4 h-4" /> Save
              </button>
              <button onClick={() => toast.success('Downloading PDF...')} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/20 text-white text-sm hover:bg-white/30 transition-all">
                <Download className="w-4 h-4" /> Export PDF
              </button>
            </div>
          </div>
          <div className="mt-4 h-2 rounded-full bg-white/20 overflow-hidden">
            <div className="h-full rounded-full bg-white" style={{ width: '100%' }} />
          </div>
        </div>

        {/* Sections */}
        <div className="space-y-3">
          {SECTIONS.map((section, i) => {
            const Icon = section.icon;
            const isExpanded = expanded.includes(section.id);
            const isEditing = editing === section.id;
            return (
              <motion.div key={section.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
                className="rounded-2xl border border-border bg-card overflow-hidden">
                <button onClick={() => toggle(section.id)} className="w-full flex items-center gap-4 px-5 py-4 text-left hover:bg-muted/30 transition-all">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-4 h-4 text-primary" />
                  </div>
                  <span className="flex-1 font-semibold text-foreground">{section.title}</span>
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  {isExpanded ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
                </button>
                {isExpanded && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="px-5 pb-5">
                    <div className="border-t border-border pt-4">
                      {isEditing ? (
                        <div>
                          <textarea value={content[section.id]} onChange={e => setContent(prev => ({ ...prev, [section.id]: e.target.value }))} rows={6} className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm text-foreground focus:outline-none focus:border-primary resize-none mb-3" />
                          <div className="flex gap-2">
                            <button onClick={() => { setEditing(null); toast.success('Section saved!'); }} className="px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-semibold">Save Section</button>
                            <button onClick={() => setEditing(null)} className="px-4 py-2 rounded-xl border border-border text-muted-foreground text-sm">Cancel</button>
                          </div>
                        </div>
                      ) : (
                        <div>
                          <p className="text-sm text-muted-foreground leading-relaxed mb-3">{content[section.id]}</p>
                          <button onClick={() => setEditing(section.id)} className="text-xs text-primary font-medium hover:underline">Edit Section</button>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default FounderBusinessPlan;
