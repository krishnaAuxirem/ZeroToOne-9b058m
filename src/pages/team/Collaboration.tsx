import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Send, Search, Users, Video, Phone, Paperclip, AtSign, Hash } from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { toast } from 'sonner';

const CHANNELS = [
  { id: 1, name: 'general', type: 'channel', unread: 3 },
  { id: 2, name: 'engineering', type: 'channel', unread: 0 },
  { id: 3, name: 'design-feedback', type: 'channel', unread: 1 },
  { id: 4, name: 'random', type: 'channel', unread: 0 },
];

const DMS = [
  { id: 5, name: 'Arjun Sharma', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=arjun', online: true, unread: 2 },
  { id: 6, name: 'Priya Nair', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=priya', online: false, unread: 0 },
  { id: 7, name: 'Rahul Kumar', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=rahul', online: true, unread: 0 },
];

const MESSAGES = [
  { id: 1, from: 'Arjun Sharma', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=arjun', text: 'Team, the new sprint starts tomorrow. Please check JIRA for assigned tickets.', time: '9:00 AM', self: false },
  { id: 2, from: 'Sneha Patel', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sneha', text: 'Got it! I\'ll pick up the dashboard redesign tickets.', time: '9:05 AM', self: true },
  { id: 3, from: 'Rahul Kumar', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=rahul', text: 'Taking the AI integration tasks. Should have a PR ready by Wednesday.', time: '9:10 AM', self: false },
  { id: 4, from: 'Priya Nair', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=priya', text: 'Design specs are ready in Figma. Shared in the #design-feedback channel.', time: '9:12 AM', self: false },
  { id: 5, from: 'Arjun Sharma', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=arjun', text: 'Great! Let\'s have a standup at 11 AM. Will share the Zoom link shortly.', time: '9:15 AM', self: false },
];

const TeamCollaboration = () => {
  const [activeChannel, setActiveChannel] = useState(1);
  const [messages, setMessages] = useState(MESSAGES);
  const [input, setInput] = useState('');
  const endRef = useRef<HTMLDivElement>(null);

  const send = () => {
    if (!input.trim()) return;
    setMessages(p => [...p, { id: Date.now(), from: 'Sneha Patel', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sneha', text: input, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), self: true }]);
    setInput('');
    setTimeout(() => endRef.current?.scrollIntoView({ behavior: 'smooth' }), 50);
  };

  return (
    <DashboardLayout title="Team Collaboration">
      <div className="flex gap-0 rounded-2xl border border-border bg-card overflow-hidden" style={{ height: 'calc(100vh - 10rem)' }}>
        {/* Sidebar */}
        <div className="w-60 border-r border-border flex flex-col bg-muted/30">
          <div className="p-4 border-b border-border">
            <p className="font-bold text-foreground text-sm">EduVerse</p>
            <p className="text-xs text-green-500">● 8 online</p>
          </div>
          <div className="flex-1 overflow-y-auto p-3">
            <p className="text-xs font-semibold text-muted-foreground uppercase mb-2 px-2">Channels</p>
            {CHANNELS.map(c => (
              <button key={c.id} onClick={() => setActiveChannel(c.id)} className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-left text-sm transition-all mb-0.5 ${activeChannel === c.id ? 'bg-primary/10 text-primary font-medium' : 'text-muted-foreground hover:bg-muted hover:text-foreground'}`}>
                <Hash className="w-3.5 h-3.5 flex-shrink-0" />{c.name}
                {c.unread > 0 && <span className="ml-auto text-xs font-bold text-primary">{c.unread}</span>}
              </button>
            ))}
            <p className="text-xs font-semibold text-muted-foreground uppercase mt-4 mb-2 px-2">Direct Messages</p>
            {DMS.map(d => (
              <button key={d.id} onClick={() => setActiveChannel(d.id)} className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-left text-sm transition-all mb-0.5 ${activeChannel === d.id ? 'bg-primary/10 text-primary font-medium' : 'text-muted-foreground hover:bg-muted hover:text-foreground'}`}>
                <div className="relative flex-shrink-0">
                  <img src={d.avatar} alt="" className="w-5 h-5 rounded-full bg-muted" />
                  {d.online && <div className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-green-500" />}
                </div>
                <span className="truncate">{d.name}</span>
                {d.unread > 0 && <span className="ml-auto text-xs font-bold text-primary">{d.unread}</span>}
              </button>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          <div className="flex items-center justify-between px-5 py-3 border-b border-border">
            <div className="flex items-center gap-2">
              <Hash className="w-4 h-4 text-muted-foreground" />
              <span className="font-semibold text-foreground text-sm">general</span>
              <span className="text-xs text-muted-foreground">· EduVerse team channel</span>
            </div>
            <div className="flex items-center gap-2">
              <button className="p-2 rounded-lg hover:bg-muted text-muted-foreground"><Video className="w-4 h-4" /></button>
              <button className="p-2 rounded-lg hover:bg-muted text-muted-foreground"><Users className="w-4 h-4" /></button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {messages.map((msg, i) => (
              <motion.div key={msg.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className={`flex items-start gap-3 ${msg.self ? 'flex-row-reverse' : ''}`}>
                <img src={msg.avatar} alt="" className="w-8 h-8 rounded-xl bg-muted flex-shrink-0" />
                <div className={`max-w-md ${msg.self ? 'items-end' : 'items-start'} flex flex-col`}>
                  <div className="flex items-center gap-2 mb-1">
                    {!msg.self && <span className="text-xs font-semibold text-foreground">{msg.from}</span>}
                    <span className="text-xs text-muted-foreground">{msg.time}</span>
                  </div>
                  <div className={`px-4 py-2.5 rounded-2xl text-sm ${msg.self ? 'bg-primary text-primary-foreground' : 'bg-muted text-foreground'}`}>{msg.text}</div>
                </div>
              </motion.div>
            ))}
            <div ref={endRef} />
          </div>

          <div className="p-4 border-t border-border flex gap-3">
            <button className="p-2 rounded-xl hover:bg-muted text-muted-foreground"><Paperclip className="w-4 h-4" /></button>
            <button className="p-2 rounded-xl hover:bg-muted text-muted-foreground"><AtSign className="w-4 h-4" /></button>
            <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && send()} placeholder="Message #general..." className="flex-1 px-4 py-2.5 rounded-xl bg-muted text-sm focus:outline-none" />
            <button onClick={send} disabled={!input.trim()} className="p-2.5 rounded-xl bg-primary text-primary-foreground disabled:opacity-50"><Send className="w-4 h-4" /></button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default TeamCollaboration;
