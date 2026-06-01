import { motion } from 'framer-motion';
import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon: LucideIcon;
  iconColor?: string;
  gradient?: string;
  subtitle?: string;
  className?: string;
  delay?: number;
}

const StatCard = ({
  title,
  value,
  change,
  changeType = 'neutral',
  icon: Icon,
  iconColor = 'text-blue-500',
  gradient = 'from-blue-500/10 to-blue-500/5',
  subtitle,
  className,
  delay = 0,
}: StatCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className={cn(
        'relative overflow-hidden rounded-2xl border border-border bg-card p-5 hover:border-primary/30 transition-all group',
        className
      )}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-100 transition-opacity`} />
      <div className="relative">
        <div className="flex items-start justify-between mb-3">
          <div className={`p-2.5 rounded-xl bg-gradient-to-br ${gradient} border border-white/10`}>
            <Icon className={`w-5 h-5 ${iconColor}`} />
          </div>
          {change && (
            <div className={cn(
              'flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-semibold',
              changeType === 'positive' ? 'bg-green-500/10 text-green-500' :
              changeType === 'negative' ? 'bg-red-500/10 text-red-500' :
              'bg-muted text-muted-foreground'
            )}>
              {changeType === 'positive' ? <TrendingUp className="w-3 h-3" /> : changeType === 'negative' ? <TrendingDown className="w-3 h-3" /> : null}
              {change}
            </div>
          )}
        </div>
        <p className="text-2xl font-bold text-foreground mb-0.5">{value}</p>
        <p className="text-sm text-muted-foreground font-medium">{title}</p>
        {subtitle && <p className="text-xs text-muted-foreground/70 mt-1">{subtitle}</p>}
      </div>
    </motion.div>
  );
};

export default StatCard;
