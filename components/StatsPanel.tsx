'use client';

import React, { useState } from 'react';
import { GameStats } from '@/types/game';
import {
  Coins,
  Briefcase,
  HeartPulse,
  Sparkles,
  Users,
  Home,
  Baby,
  MapPin,
  Compass,
  ShieldAlert,
  ChevronDown,
  ChevronUp,
  BarChart3
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface StatsPanelProps {
  stats: GameStats;
  lastEffects?: Partial<GameStats> | null;
}

type StatConfig = {
  key: keyof GameStats;
  label: string;
  description?: string;
  icon: React.ElementType;
  color: string;
  bg: string;
  isMain: boolean; // デフォルト（折りたたみ時）で表示するか
};

const STATS_CONFIG: StatConfig[] = [
  { key: 'relationshipCapital', label: '関係資本', icon: Users, color: 'text-sky-400 bg-sky-500', bg: 'from-sky-500/20 to-sky-500/5', isMain: true },
  {
    key: 'familyCapital',
    label: '家族資本',
    description: 'パートナー、子ども、きょうだい、親戚など、老後に身近な支えとなる家族関係の厚み',
    icon: Home,
    color: 'text-rose-400 bg-rose-500',
    bg: 'from-rose-500/20 to-rose-500/5',
    isMain: true
  },
  { key: 'emergencySupport', label: '緊急サポート', icon: ShieldAlert, color: 'text-amber-400 bg-amber-500', bg: 'from-amber-500/20 to-amber-500/5', isMain: true },
  { key: 'health', label: '健康', icon: HeartPulse, color: 'text-emerald-400 bg-emerald-500', bg: 'from-emerald-500/20 to-emerald-500/5', isMain: true },
  { key: 'money', label: 'お金・資産', icon: Coins, color: 'text-yellow-400 bg-yellow-500', bg: 'from-yellow-500/20 to-yellow-500/5', isMain: true },
  { key: 'nextGeneration', label: '次世代接点', icon: Baby, color: 'text-pink-400 bg-pink-500', bg: 'from-pink-500/20 to-pink-500/5', isMain: false },
  { key: 'outsideWorkBelonging', label: '仕事外所属', icon: MapPin, color: 'text-indigo-400 bg-indigo-500', bg: 'from-indigo-500/20 to-indigo-500/5', isMain: false },
  { key: 'meaningCapital', label: '意味資本', icon: Compass, color: 'text-violet-400 bg-violet-500', bg: 'from-violet-500/20 to-violet-500/5', isMain: false },
  { key: 'career', label: 'キャリア', icon: Briefcase, color: 'text-blue-400 bg-blue-500', bg: 'from-blue-500/20 to-blue-500/5', isMain: false },
  { key: 'freedom', label: '自由', icon: Sparkles, color: 'text-teal-400 bg-teal-500', bg: 'from-teal-500/20 to-teal-500/5', isMain: false },
];

export default function StatsPanel({ stats, lastEffects }: StatsPanelProps) {
  const [isOpen, setIsOpen] = useState(false);

  // 折りたたみ時に表示するステータスと、詳細表示時に表示するステータスを分ける
  const mainStats = STATS_CONFIG.filter((s) => s.isMain);
  const otherStats = STATS_CONFIG.filter((s) => !s.isMain);

  const renderStatRow = (config: StatConfig) => {
    const value = stats[config.key];
    const effect = lastEffects ? lastEffects[config.key] : undefined;
    const Icon = config.icon;

    return (
      <div key={config.key} className="bg-gray-900/40 border border-gray-800 rounded-xl p-3 flex flex-col gap-1.5 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <div className={`p-1 rounded bg-gray-800 text-xs font-semibold ${config.color.split(' ')[0]}`}>
              <Icon className="w-3.5 h-3.5" />
            </div>
            <span className="text-xs font-bold text-gray-300">{config.label}</span>
          </div>

          <div className="flex items-center gap-1.5">
            {effect !== undefined && effect !== 0 && (
              <span className={`text-[10px] font-bold ${effect > 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                {effect > 0 ? `+${effect}` : effect}
              </span>
            )}
            <span className="text-xs font-black text-gray-100">{value}</span>
          </div>
        </div>

        {/* ゲージバー */}
        <div className="w-full h-1 bg-gray-800 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${config.color.split(' ')[1]}`}
            style={{ width: `${value}%` }}
          />
        </div>

        {config.description && (
          <p className="text-[10px] leading-snug text-gray-300">
            {config.description}
          </p>
        )}
      </div>
    );
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-gray-950/80 backdrop-blur border border-gray-800 rounded-2xl overflow-hidden shadow-lg shadow-black/30">
      {/* パネルヘッダー */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="px-4 py-3 flex items-center justify-between cursor-pointer border-b border-gray-900 bg-gray-950 hover:bg-gray-900/30 select-none transition-colors duration-200"
      >
        <div className="flex items-center gap-2">
          <BarChart3 className="w-4 h-4 text-amber-500" />
          <h3 className="text-xs font-bold text-gray-300 tracking-wider">
            人生ステータス
          </h3>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-[10px] text-gray-300 font-bold mr-1">
            {isOpen ? '閉じる' : 'すべて表示'}
          </span>
          {isOpen ? (
            <ChevronUp className="w-4 h-4 text-gray-400" />
          ) : (
            <ChevronDown className="w-4 h-4 text-gray-400" />
          )}
        </div>
      </div>

      {/* ステータスグリッド */}
      <div className="p-4">
        {/* メインステータス */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
          {mainStats.map((config) => renderStatRow(config))}
        </div>

        {/* サブステータス (アコーディオン) */}
        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="pt-3 border-t border-gray-900 mt-3 grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                {otherStats.map((config) => renderStatRow(config))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
