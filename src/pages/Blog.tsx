import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Clock, Eye, Heart, Tag, ArrowRight, TrendingUp, BookOpen } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { BLOG_POSTS } from '@/lib/mockData';

const CATEGORIES = ['All', 'Founder Lessons', 'Fundraising', 'Industry Insights', 'Product', 'Team Building', 'Sales'];

const BlogPage = () => {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const featured = BLOG_POSTS.find(b => b.featured);
  const filtered = BLOG_POSTS.filter(b => {
    const matchSearch = b.title.toLowerCase().includes(search.toLowerCase()) || b.excerpt.toLowerCase().includes(search.toLowerCase());
    const matchCat = category === 'All' || b.category === category;
    return matchSearch && matchCat && !b.featured;
  });

  return (
    <div className="bg-background min-h-screen">
      <Navbar />
      <section className="pt-28 pb-12 bg-gradient-hero">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-orange-500/20 text-orange-300 text-sm font-semibold mb-4"><BookOpen className="w-3.5 h-3.5" /> ZeroToOne Blog</span>
            <h1 className="text-5xl font-bold text-white mb-4">Startup insights from practitioners</h1>
            <p className="text-white/60 text-xl max-w-xl mx-auto">Tactical advice, founder stories, and industry analysis from the ZeroToOne community.</p>
          </motion.div>
        </div>
      </section>

      <section className="py-8 border-b border-border bg-card/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search articles..." className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm placeholder-muted-foreground focus:outline-none focus:border-primary" />
            </div>
          </div>
          <div className="flex gap-2 flex-wrap mt-3">
            {CATEGORIES.map(c => <button key={c} onClick={() => setCategory(c)} className={`px-3 py-1.5 rounded-full text-xs transition-all ${category === c ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-muted/80'}`}>{c}</button>)}
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Featured */}
          {featured && category === 'All' && !search && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
              <p className="text-xs font-bold text-primary uppercase tracking-widest mb-4 flex items-center gap-2"><TrendingUp className="w-3.5 h-3.5" /> Featured Article</p>
              <Link to={`/blog/${featured.slug}`} className="grid grid-cols-1 lg:grid-cols-2 gap-8 rounded-2xl border border-border bg-card overflow-hidden hover:border-primary/30 transition-all group">
                <div className="aspect-video lg:aspect-auto overflow-hidden">
                  <img src={featured.thumbnail} alt={featured.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-8 flex flex-col justify-center">
                  <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium mb-3">{featured.category}</span>
                  <h2 className="text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">{featured.title}</h2>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-5">{featured.excerpt}</p>
                  <div className="flex items-center gap-4">
                    <img src={featured.authorAvatar} alt={featured.author} className="w-8 h-8 rounded-full bg-muted" />
                    <div>
                      <p className="text-xs font-semibold text-foreground">{featured.author}</p>
                      <p className="text-xs text-muted-foreground">{featured.publishedAt} · {featured.readTime}</p>
                    </div>
                    <div className="ml-auto flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><Eye className="w-3.5 h-3.5" /> {(featured.views/1000).toFixed(1)}k</span>
                      <span className="flex items-center gap-1"><Heart className="w-3.5 h-3.5" /> {featured.likes}</span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((post, i) => (
              <motion.div key={post.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                <Link to={`/blog/${post.slug}`} className="block rounded-2xl border border-border bg-card overflow-hidden hover:border-primary/30 hover:shadow-xl transition-all group h-full">
                  <div className="aspect-video overflow-hidden">
                    <img src={post.thumbnail} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-5">
                    <span className="inline-block px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-medium mb-3">{post.category}</span>
                    <h3 className="font-bold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">{post.title}</h3>
                    <p className="text-muted-foreground text-sm line-clamp-2 mb-4">{post.excerpt}</p>
                    <div className="flex items-center gap-3 pt-3 border-t border-border">
                      <img src={post.authorAvatar} alt={post.author} className="w-7 h-7 rounded-full bg-muted" />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-foreground truncate">{post.author}</p>
                        <p className="text-xs text-muted-foreground">{post.readTime}</p>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1"><Eye className="w-3 h-3" /> {(post.views/1000).toFixed(0)}k</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default BlogPage;
