import React from 'react';
import { cn } from '@/lib/utils';

interface SkeletonProps {
  className?: string;
  variant?: 'default' | 'dark';
}

export const Skeleton = ({ className, variant = 'default' }: SkeletonProps) => (
  <div
    className={cn(
      variant === 'dark' ? 'skeleton-dark' : 'skeleton',
      className
    )}
  />
);

export const DashboardSkeleton = () => (
  <div className="space-y-6 animate-fade-up">
    {/* Welcome banner */}
    <Skeleton className="h-28 rounded-2xl" />
    {/* KPI cards */}
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="rounded-2xl border border-border bg-card p-5 space-y-3">
          <div className="flex items-start justify-between">
            <Skeleton className="w-10 h-10 rounded-xl" />
            <Skeleton className="w-16 h-6 rounded-lg" />
          </div>
          <Skeleton className="w-20 h-7 rounded-lg" />
          <Skeleton className="w-28 h-4 rounded" />
        </div>
      ))}
    </div>
    {/* Charts */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
      <div className="lg:col-span-2 rounded-2xl border border-border bg-card p-5 space-y-4">
        <Skeleton className="w-32 h-5 rounded" />
        <Skeleton className="w-full h-52 rounded-xl" />
      </div>
      <div className="rounded-2xl border border-border bg-card p-5 space-y-3">
        <Skeleton className="w-28 h-5 rounded" />
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} className="w-full h-24 rounded-xl" />
        ))}
      </div>
    </div>
    {/* Table */}
    <div className="rounded-2xl border border-border bg-card p-5 space-y-3">
      <Skeleton className="w-24 h-5 rounded" />
      {[...Array(4)].map((_, i) => (
        <Skeleton key={i} className="w-full h-14 rounded-xl" />
      ))}
    </div>
  </div>
);

export const TableSkeleton = ({ rows = 5 }: { rows?: number }) => (
  <div className="space-y-2">
    {[...Array(rows)].map((_, i) => (
      <div key={i} className="flex items-center gap-4 p-4 rounded-xl border border-border">
        <Skeleton className="w-10 h-10 rounded-full flex-shrink-0" />
        <div className="flex-1 space-y-2">
          <Skeleton className="w-32 h-4 rounded" />
          <Skeleton className="w-48 h-3 rounded" />
        </div>
        <Skeleton className="w-20 h-6 rounded-full hidden sm:block" />
        <Skeleton className="w-16 h-8 rounded-xl" />
      </div>
    ))}
  </div>
);

export const CardSkeleton = ({ count = 3 }: { count?: number }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
    {[...Array(count)].map((_, i) => (
      <div key={i} className="rounded-2xl border border-border bg-card p-6 space-y-4">
        <div className="flex items-start gap-4">
          <Skeleton className="w-14 h-14 rounded-2xl flex-shrink-0" />
          <div className="flex-1 space-y-2">
            <Skeleton className="w-28 h-5 rounded" />
            <Skeleton className="w-36 h-4 rounded" />
            <Skeleton className="w-24 h-4 rounded" />
          </div>
        </div>
        <Skeleton className="w-full h-px rounded" />
        <div className="space-y-2">
          <Skeleton className="w-full h-4 rounded" />
          <Skeleton className="w-3/4 h-4 rounded" />
        </div>
        <div className="flex gap-2">
          <Skeleton className="flex-1 h-9 rounded-xl" />
          <Skeleton className="w-24 h-9 rounded-xl" />
        </div>
      </div>
    ))}
  </div>
);

export const ProfileSkeleton = () => (
  <div className="space-y-6">
    <div className="rounded-2xl border border-border bg-card p-6">
      <div className="flex items-center gap-5 mb-6">
        <Skeleton className="w-20 h-20 rounded-2xl flex-shrink-0" />
        <div className="flex-1 space-y-3">
          <Skeleton className="w-40 h-6 rounded" />
          <Skeleton className="w-56 h-4 rounded" />
          <div className="flex gap-2">
            <Skeleton className="w-20 h-6 rounded-full" />
            <Skeleton className="w-20 h-6 rounded-full" />
          </div>
        </div>
        <Skeleton className="w-28 h-10 rounded-xl hidden md:block" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="space-y-1.5">
            <Skeleton className="w-20 h-3 rounded" />
            <Skeleton className="w-full h-10 rounded-xl" />
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default Skeleton;
