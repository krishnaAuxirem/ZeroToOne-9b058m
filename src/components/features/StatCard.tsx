import { motion } from 'framer-motion';
import { LucideIcon, TrendingUp, TrendingDown, Minus } from 'lucide-react';
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
  sparkline?: number[];
  badge?: string;
}

const MiniSparkline = ({ data, color }: { data: number[]; color: string }) => {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const h = 28;
  const w = 60;
  const step = w / (data.length - 1);
  const points = data.map((v, i) => `${i * step},${h - ((v - min) / range) * h}`).join(' ');

  return (
    <svg width={w} height={h} className="opacity-60">
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

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
  sparkline,
  badge,
}: StatCardProps) => {
  const changeColor =
    changeType === 'positive' ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' :
    changeType === 'negative' ? 'text-red-400 bg-red-500/10 border-red-500/20' :
    'text-slate-400 bg-slate-500/10 border-slate-500/20';

  const sparkColor =
    changeType === 'positive' ? '#10b981' :
    changeType === 'negative' ? '#ef4444' : '#6366f1';

  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, delay, type: 'spring', stiffness: 100, damping: 15 }}
      whileHover={{ y: -6, scale: 1.02 }}
      className={cn(
        'relative overflow-hidden rounded-2xl border border-border bg-card p-5 cursor-default kpi-card',
        'transition-all duration-300 group',
        className
      )}
    >
      {/* Gradient overlay on hover */}
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`} />

      {/* Glow orb */}
      <div className={`absolute -top-6 -right-6 w-24 h-24 rounded-full bg-gradient-to-br ${gradient} blur-2xl opacity-30 group-hover:opacity-60 transition-opacity`} />

      <div className="relative">
        <div className="flex items-start justify-between mb-4">
          {/* Icon */}
          <motion.div
            whileHover={{ rotate: 8, scale: 1.1 }}
            transition={{ type: 'spring', stiffness: 300 }}
            className={`p-2.5 rounded-xl bg-gradient-to-br ${gradient} border border-white/10 shadow-sm`}
          >
            <Icon className={`w-5 h-5 ${iconColor}`} />
          </motion.div>

          <div className="flex flex-col items-end gap-1.5">
            {badge && (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold badge-animated text-blue-300">
                {badge}
              </span>
            )}
            {change && (
              <div className={cn(
                'flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-semibold border',
                changeColor
              )}>
                {changeType === 'positive' ? (
                  <TrendingUp className="w-3 h-3" />
                ) : changeType === 'negative' ? (
                  <TrendingDown className="w-3 h-3" />
                ) : (
                  <Minus className="w-3 h-3" />
                )}
                {change}
              </div>
            )}
          </div>
        </div>

        <div className="flex items-end justify-between">
          <div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: delay + 0.2 }}
              className="text-2xl font-bold text-foreground tracking-tight mb-0.5 font-['Space_Grotesk']"
            >
              {value}
            </motion.p>
            <p className="text-sm text-muted-foreground font-medium">{title}</p>
            {subtitle && (
              <p className="text-xs text-muted-foreground/60 mt-0.5">{subtitle}</p>
            )}
          </div>

          {sparkline && sparkline.length > 1 && (
            <div className="mb-1">
              <MiniSparkline data={sparkline} color={sparkColor} />
            </div>
          )}
        </div>

        {/* Bottom shimmer line */}
        <div className={`absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r ${gradient} opacity-0 group-hover:opacity-100 transition-opacity rounded-full`} />
      </div>
    </motion.div>
  );
};

export default StatCard;
