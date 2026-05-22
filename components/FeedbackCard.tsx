'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { GameStats } from '@/types/game';
import { ArrowRight, TrendingUp, TrendingDown } from 'lucide-react';

interface FeedbackCardProps {
  feedbackText: string;
  effects: Partial<GameStats>;
  onNext: () => void;
}

const STAT_LABELS: Record<keyof GameStats, string> = {
  money: 'お金',
  career: 'キャリア',
  health: '健康',
  freedom: '自由',
  relationshipCapital: '関係資本',
  familyCapital: '家族資本',
  nextGeneration: '次世代接点',
  outsideWorkBelonging: '仕事外所属',
  meaningCapital: '意味資本',
  emergencySupport: '緊急サポート',
};

export default function FeedbackCard({ feedbackText, effects, onNext }: FeedbackCardProps) {
  const increases = Object.entries(effects).filter(([, val]) => (val ?? 0) > 0);
  const decreases = Object.entries(effects).filter(([, val]) => (val ?? 0) < 0);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="w-full bg-gradient-to-b from-gray-900 to-gray-950 border border-gray-800 rounded-2xl p-6 md:p-8 shadow-2xl flex flex-col gap-6"
    >
      <div>
        <span className="text-[10px] font-bold text-amber-500 tracking-widest uppercase bg-amber-950/40 border border-amber-900/40 px-2.5 py-0.5 rounded-full inline-block mb-3">
          Choice Feedback
        </span>
        <p className="text-base md:text-lg text-gray-100 font-medium leading-relaxed">
          {feedbackText}
        </p>
      </div>

      {/* ステータス変化のまとめ */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 rounded-xl bg-gray-950 border border-gray-900">
        {/* 上昇したステータス */}
        <div>
          <span className="flex items-center gap-1 text-xs font-bold text-emerald-400 mb-2">
            <TrendingUp className="w-3.5 h-3.5" />
            上昇したステータス
          </span>
          {increases.length > 0 ? (
            <div className="flex flex-wrap gap-1.5">
              {increases.map(([key, val]) => (
                <span
                  key={key}
                  className="text-[11px] font-bold px-2 py-0.5 bg-emerald-950/40 border border-emerald-900/30 text-emerald-300 rounded-md"
                >
                  {STAT_LABELS[key as keyof GameStats]} +{val}
                </span>
              ))}
            </div>
          ) : (
            <span className="text-xs text-gray-600 font-medium">特になし</span>
          )}
        </div>

        {/* 下降したステータス */}
        <div className="mt-3 sm:mt-0">
          <span className="flex items-center gap-1 text-xs font-bold text-rose-400 mb-2">
            <TrendingDown className="w-3.5 h-3.5" />
            低下したステータス
          </span>
          {decreases.length > 0 ? (
            <div className="flex flex-wrap gap-1.5">
              {decreases.map(([key, val]) => (
                <span
                  key={key}
                  className="text-[11px] font-bold px-2 py-0.5 bg-rose-950/40 border border-rose-900/30 text-rose-300 rounded-md"
                >
                  {STAT_LABELS[key as keyof GameStats]} {val}
                </span>
              ))}
            </div>
          ) : (
            <span className="text-xs text-gray-600 font-medium">特になし</span>
          )}
        </div>
      </div>

      {/* 次へ進むボタン */}
      <div className="w-full mt-2">
        <button
          onClick={onNext}
          className="group relative w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl text-sm font-bold tracking-wider text-white bg-gradient-to-r from-amber-500 via-rose-500 to-purple-600 hover:from-amber-600 hover:via-rose-600 hover:to-purple-700 active:scale-98 transition-all duration-200 shadow-md shadow-rose-950/20 overflow-hidden"
        >
          <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          次のライフステージへ
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </motion.div>
  );
}
