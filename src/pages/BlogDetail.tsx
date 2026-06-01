import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Eye, Heart, Clock, Tag, Share2 } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { BLOG_POSTS } from '@/lib/mockData';
import { toast } from 'sonner';

const BlogDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = BLOG_POSTS.find(b => b.slug === slug) || BLOG_POSTS[0];
  const related = BLOG_POSTS.filter(b => b.id !== post.id && b.category === post.category).slice(0, 3);

  return (
    <div className="bg-background min-h-screen">
      <Navbar />
      <article className="pt-24 pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Link to="/blog" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-all text-sm mb-6">
              <ArrowLeft className="w-4 h-4" /> Back to Blog
            </Link>
            <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium mb-4">{post.category}</span>
            <h1 className="text-4xl font-bold text-foreground mb-4 leading-tight">{post.title}</h1>
            <div className="flex items-center gap-4 mb-6">
              <img src={post.authorAvatar} alt={post.author} className="w-10 h-10 rounded-full bg-muted" />
              <div>
                <p className="font-semibold text-foreground text-sm">{post.author}</p>
                <p className="text-xs text-muted-foreground">{post.publishedAt} · {post.readTime}</p>
              </div>
              <div className="ml-auto flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5"><Eye className="w-4 h-4" /> {post.views.toLocaleString()}</span>
                <button onClick={() => toast.success('Liked!')} className="flex items-center gap-1.5 hover:text-red-500 transition-colors">
                  <Heart className="w-4 h-4" /> {post.likes}
                </button>
                <button onClick={() => { navigator.clipboard.writeText(window.location.href); toast.success('Link copied!'); }} className="flex items-center gap-1.5 hover:text-primary transition-colors">
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden mb-8">
              <img src={post.thumbnail} alt={post.title} className="w-full aspect-video object-cover" />
            </div>
            <div className="prose">
              {post.content.split('\n').map((line, i) => {
                if (line.startsWith('## ')) return <h2 key={i}>{line.slice(3)}</h2>;
                if (line.startsWith('### ')) return <h3 key={i}>{line.slice(4)}</h3>;
                if (line.startsWith('- ')) return <li key={i}>{line.slice(2)}</li>;
                if (line === '') return <br key={i} />;
                return <p key={i}>{line}</p>;
              })}
            </div>
            <div className="flex flex-wrap gap-2 mt-8 pt-6 border-t border-border">
              {post.tags.map(tag => (
                <span key={tag} className="flex items-center gap-1 px-3 py-1 rounded-full bg-muted text-muted-foreground text-xs">
                  <Tag className="w-3 h-3" /> {tag}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </article>

      {related.length > 0 && (
        <section className="py-12 border-t border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-foreground mb-8">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map((p) => (
                <Link key={p.id} to={`/blog/${p.slug}`} className="block rounded-2xl border border-border bg-card overflow-hidden hover:border-primary/30 transition-all group">
                  <div className="aspect-video overflow-hidden">
                    <img src={p.thumbnail} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-foreground text-sm mb-2 line-clamp-2 group-hover:text-primary transition-colors">{p.title}</h3>
                    <p className="text-xs text-muted-foreground">{p.readTime} · {p.publishedAt}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
      <Footer />
    </div>
  );
};

export default BlogDetailPage;
