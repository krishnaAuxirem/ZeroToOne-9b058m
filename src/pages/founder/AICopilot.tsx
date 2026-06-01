import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Zap, RefreshCw, BookOpen, TrendingUp, DollarSign, Users, Lightbulb, BarChart3 } from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { toast } from 'sonner';

interface Message {
  id: string;
  from: 'user' | 'ai';
  text: string;
  timestamp: Date;
}

const AI_RESPONSES: Record<string, string> = {
  default: "Great question! Based on startup best practices and data from 10,000+ founders, here's my recommendation:\n\n**Key Insights:**\n• Start with the problem, not the solution\n• Validate assumptions before building\n• Focus on one customer segment initially\n\nWould you like me to dive deeper into any specific aspect?",
  pricing: "For B2B SaaS pricing strategy:\n\n**Recommended Approach:**\n1. **Value-based pricing** — Price at 10x the value you deliver\n2. **Tiered structure** — Starter/Growth/Enterprise with clear upgrades\n3. **Annual billing incentive** — 2 months free for annual plans\n\n**Benchmarks for Indian market:**\n• SMB tier: ₹2,000 - ₹8,000/user/month\n• Mid-market: ₹8,000 - ₹25,000/user/month\n\nYour LTV:CAC should target >3:1 before scaling paid acquisition.",
  fundraising: "To prepare for your fundraising round:\n\n**30-Day Fundraising Prep Checklist:**\n1. ✅ Update pitch deck (12 slides max)\n2. ✅ Build financial model (3-year projection)\n3. ✅ Prepare data room (MCA docs, MIS, contracts)\n4. ✅ Research 50 target investors\n5. ✅ Get 10 warm introductions\n\n**Key metrics investors look for at Seed:**\n• MRR growth (aim for 20%+ MoM)\n• CAC payback < 12 months\n• NPS > 50\n• Team-market fit story",
  mvp: "For building your MVP effectively:\n\n**MVP Principles:**\n1. **Solve one problem extremely well** — resist feature creep\n2. **Customer interviews first** — 50 before writing code\n3. **Fake it before you make it** — test demand manually\n\n**Build timeline (B2B SaaS):**\n• Week 1-2: Define core user flow\n• Week 3-6: Build, no more than 3 features\n• Week 7-8: Test with 10 customers, iterate\n\n**Common MVP mistakes:**\n• Too many features (you need exactly 1)\n• Solving for yourself not the customer\n• Not charging from day one",
  growth: "Growth strategy for early-stage:\n\n**The 3 growth engines:**\n1. **Viral/Product-led** — In-product sharing, freemium\n2. **Sales-led** — Outbound + SDR team\n3. **Marketing-led** — Content, SEO, paid\n\n**What works at your stage (0-100 customers):**\n• Founder-led sales (you must sell)\n• 1:1 LinkedIn outreach (50 messages/day)\n• Referral incentives (30% off for referrals)\n• Startup communities (PH, IndieHackers)\n\nDon't hire sales until you've closed 20 customers yourself.",
  team: "Building your founding team:\n\n**Ideal founding team composition:**\n• Hustler (CEO/Sales) — can sell and recruit\n• Hacker (CTO) — can ship fast\n• Designer (CPO) — deep user empathy\n\n**Co-founder red flags:**\n• Different risk appetites\n• No prior working relationship\n• Equity split discussions delayed\n\n**Hiring principles:**\n• First 10 hires define culture permanently\n• Hire for attitude, train for skill (below VP level)\n• Every hire should raise the average bar\n\nUse our Co-Founder Matching to find candidates aligned to your vision.",
};

const SUGGESTIONS = [
  { label: 'Pricing Strategy', icon: DollarSign, key: 'pricing' },
  { label: 'Fundraising Tips', icon: TrendingUp, key: 'fundraising' },
  { label: 'MVP Building', icon: Lightbulb, key: 'mvp' },
  { label: 'Growth Hacking', icon: BarChart3, key: 'growth' },
  { label: 'Team Building', icon: Users, key: 'team' },
  { label: 'Learn More', icon: BookOpen, key: 'default' },
];

const FounderAICopilot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '0',
      from: 'ai',
      text: "Hello! I'm your AI Startup Copilot, trained on insights from 10,000+ successful startups. I can help you with business strategy, fundraising, product development, growth, team building, and more.\n\nWhat challenge are you working on today?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const getAIResponse = (userText: string): string => {
    const lower = userText.toLowerCase();
    if (lower.includes('pric') || lower.includes('revenue') || lower.includes('monetiz')) return AI_RESPONSES.pricing;
    if (lower.includes('fund') || lower.includes('investor') || lower.includes('raise')) return AI_RESPONSES.fundraising;
    if (lower.includes('mvp') || lower.includes('product') || lower.includes('build')) return AI_RESPONSES.mvp;
    if (lower.includes('grow') || lower.includes('user') || lower.includes('customer')) return AI_RESPONSES.growth;
    if (lower.includes('team') || lower.includes('co-founder') || lower.includes('hire')) return AI_RESPONSES.team;
    return AI_RESPONSES.default;
  };

  const sendMessage = async (text?: string) => {
    const msgText = text || input.trim();
    if (!msgText) return;
    setInput('');
    const userMsg: Message = { id: Date.now().toString(), from: 'user', text: msgText, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setIsTyping(true);
    await new Promise(r => setTimeout(r, 1200 + Math.random() * 800));
    const aiResponse = getAIResponse(msgText);
    const aiMsg: Message = { id: (Date.now() + 1).toString(), from: 'ai', text: aiResponse, timestamp: new Date() };
    setMessages(prev => [...prev, aiMsg]);
    setIsTyping(false);
  };

  const formatText = (text: string) => {
    return text.split('\n').map((line, i) => {
      if (line.startsWith('**') && line.endsWith('**')) {
        return <p key={i} className="font-bold text-foreground mt-2 mb-1">{line.replace(/\*\*/g, '')}</p>;
      }
      if (line.startsWith('• ') || line.startsWith('✅ ') || line.match(/^\d+\./)) {
        return <p key={i} className="ml-3 text-sm">{line}</p>;
      }
      if (line === '') return <br key={i} />;
      return <p key={i} className="text-sm">{line}</p>;
    });
  };

  return (
    <DashboardLayout title="AI Startup Copilot">
      <div className="max-w-4xl mx-auto flex flex-col h-[calc(100vh-8rem)]">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-foreground">AI Startup Copilot</h1>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-xs text-muted-foreground">Online · Powered by ZeroToOne AI</span>
              </div>
            </div>
          </div>
          <button onClick={() => { setMessages([{ id: '0', from: 'ai', text: "Chat cleared! How can I help you build your startup today?", timestamp: new Date() }]); toast.success('Chat cleared'); }} className="p-2 rounded-xl border border-border hover:bg-muted transition-all text-muted-foreground hover:text-foreground">
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>

        {/* Suggestion chips */}
        <div className="flex gap-2 flex-wrap mb-4">
          {SUGGESTIONS.map((s) => {
            const Icon = s.icon;
            return (
              <button key={s.key} onClick={() => sendMessage(s.label)} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border bg-card text-muted-foreground hover:text-foreground hover:border-primary/50 text-xs transition-all">
                <Icon className="w-3.5 h-3.5" /> {s.label}
              </button>
            );
          })}
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto space-y-4 pr-1 scrollbar-hide">
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'} gap-3`}
            >
              {msg.from === 'ai' && (
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0 mt-1">
                  <Zap className="w-4 h-4 text-white" />
                </div>
              )}
              <div className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                msg.from === 'user'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-card border border-border text-muted-foreground'
              }`}>
                {msg.from === 'ai' ? formatText(msg.text) : <p className="text-sm">{msg.text}</p>}
                <p className={`text-xs mt-2 ${msg.from === 'user' ? 'text-primary-foreground/60' : 'text-muted-foreground/50'}`}>
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </motion.div>
          ))}
          {isTyping && (
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <div className="bg-card border border-border rounded-2xl px-4 py-3">
                <div className="flex gap-1">
                  {[...Array(3)].map((_, i) => (
                    <motion.div key={i} className="w-2 h-2 bg-primary/50 rounded-full" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.2 }} />
                  ))}
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="mt-4 flex gap-3">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && !e.shiftKey && sendMessage()}
            placeholder="Ask anything about your startup..."
            className="flex-1 px-4 py-3 rounded-xl border border-border bg-card text-foreground text-sm placeholder-muted-foreground focus:outline-none focus:border-primary"
          />
          <button
            onClick={() => sendMessage()}
            disabled={!input.trim() || isTyping}
            className="p-3 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-all disabled:opacity-50"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
        <p className="text-center text-xs text-muted-foreground mt-2">AI responses are based on startup best practices. Always validate with domain experts.</p>
      </div>
    </DashboardLayout>
  );
};

export default FounderAICopilot;
