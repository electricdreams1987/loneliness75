'use client';

import React from 'react';
import { Award, Compass, Heart, ShieldAlert, Sparkles, Star, Users } from 'lucide-react';

interface EndingBadgeProps {
  endingName: string;
  routeName: string;
}

export default function EndingBadge({ endingName, routeName }: EndingBadgeProps) {
  // ルート名に応じたアイコンとテーマ色を設定する
  const getBadgeTheme = (route: string) => {
    if (route.includes('関係分散')) {
      return { icon: Users, color: 'text-sky-400 bg-sky-950/60 border-sky-900/50 from-sky-500/10 to-transparent' };
    }
    if (route.includes('自由優先')) {
      return { icon: Sparkles, color: 'text-teal-400 bg-teal-950/60 border-teal-900/50 from-teal-500/10 to-transparent' };
    }
    if (route.includes('お金はあるが')) {
      return { icon: Star, color: 'text-yellow-400 bg-yellow-950/60 border-yellow-900/50 from-yellow-500/10 to-transparent' };
    }
    if (route.includes('次世代継承')) {
      return { icon: Award, color: 'text-pink-400 bg-pink-950/60 border-pink-900/50 from-pink-500/10 to-transparent' };
    }
    if (route.includes('家族依存')) {
      return { icon: Heart, color: 'text-rose-400 bg-rose-950/60 border-rose-900/50 from-rose-500/10 to-transparent' };
    }
    if (route.includes('地域共生')) {
      return { icon: Compass, color: 'text-indigo-400 bg-indigo-950/60 border-indigo-900/50 from-indigo-500/10 to-transparent' };
    }
    if (route.includes('要対策')) {
      return { icon: ShieldAlert, color: 'text-red-400 bg-red-950/60 border-red-900/50 from-red-500/10 to-transparent' };
    }
    return { icon: Star, color: 'text-amber-400 bg-amber-950/60 border-amber-900/50 from-amber-500/10 to-transparent' };
  };

  const theme = getBadgeTheme(routeName);
  const Icon = theme.icon;

  return (
    <div className="w-full flex flex-col items-center gap-3">
      {/* 人生ルート名バッジ */}
      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border uppercase tracking-wider bg-gradient-to-b ${theme.color.split(' ').slice(0, 4).join(' ')}`}>
        <Icon className="w-3.5 h-3.5" />
        {routeName}
      </span>

      {/* エンディングタイトル */}
      <h2 className="text-2xl md:text-3xl font-black tracking-tight text-center text-transparent bg-clip-text bg-gradient-to-r from-gray-100 via-gray-200 to-gray-400 max-w-md leading-tight">
        {endingName}
      </h2>
    </div>
  );
}
