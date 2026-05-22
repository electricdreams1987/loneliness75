'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { GameResult } from '@/types/game';
import EndingBadge from './EndingBadge';
import {
  RotateCcw,
  PlusCircle,
  MinusCircle,
  CheckCircle2,
  Lightbulb,
} from 'lucide-react';

interface ResultCardProps {
  result: GameResult;
  onRestart: () => void;
}

export default function ResultCard({ result, onRestart }: ResultCardProps) {
  const [animatedRisk, setAnimatedRisk] = useState(0);

  // 孤独リスクの点数のカウントアップアニメーション
  useEffect(() => {
    const duration = 1200; // ms
    const frameRate = 1000 / 60; // 60fps
    const totalFrames = Math.round(duration / frameRate);
    let frame = 0;

    const timer = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      const currentValue = Math.round(result.lonelinessRisk * (1 - Math.pow(1 - progress, 3))); // イージング

      if (frame >= totalFrames) {
        setAnimatedRisk(result.lonelinessRisk);
        clearInterval(timer);
      } else {
        setAnimatedRisk(currentValue);
      }
    }, frameRate);

    return () => clearInterval(timer);
  }, [result.lonelinessRisk]);

  // リスク帯に基づくカラー設定
  const getRiskColors = (band: GameResult['riskBand']) => {
    switch (band) {
      case 'low':
        return { text: 'text-emerald-400', border: 'border-emerald-500/30', bg: 'bg-emerald-950/40', stroke: '#10b981', glow: 'shadow-emerald-950/50' };
      case 'semiLow':
        return { text: 'text-sky-400', border: 'border-sky-500/30', bg: 'bg-sky-950/40', stroke: '#0ea5e9', glow: 'shadow-sky-950/50' };
      case 'medium':
        return { text: 'text-amber-400', border: 'border-amber-500/30', bg: 'bg-amber-950/40', stroke: '#f59e0b', glow: 'shadow-amber-950/50' };
      case 'high':
        return { text: 'text-orange-400', border: 'border-orange-500/30', bg: 'bg-orange-950/40', stroke: '#f97316', glow: 'shadow-orange-950/50' };
      case 'critical':
        return { text: 'text-red-400', border: 'border-red-500/30', bg: 'bg-red-950/40', stroke: '#ef4444', glow: 'shadow-red-950/50' };
    }
  };

  const colors = getRiskColors(result.riskBand);

  // 円形メーターのSVGパラメータ
  const radius = 70;
  const strokeWidth = 10;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (animatedRisk / 100) * circumference;

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 md:py-10 flex flex-col gap-8">
      {/* 1. リスクメーターとエンディング名 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full bg-gradient-to-b from-gray-900 to-gray-950 border border-gray-800 rounded-3xl p-6 md:p-8 flex flex-col items-center shadow-2xl relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-radial-gradient from-rose-500/5 to-transparent pointer-events-none" />

        <span className="text-[11px] font-bold text-gray-500 tracking-[0.2em] uppercase mb-4">
          Simulation Result
        </span>

        {/* 円形メーター */}
        <div className={`relative w-40 h-40 flex items-center justify-center mb-6`}>
          <svg className="w-full h-full transform -rotate-90">
            {/* 背景の円 */}
            <circle
              cx="80"
              cy="80"
              r={radius}
              stroke="#1f2937"
              strokeWidth={strokeWidth}
              fill="transparent"
            />
            {/* 進捗の円 */}
            <motion.circle
              cx="80"
              cy="80"
              r={radius}
              stroke={colors.stroke}
              strokeWidth={strokeWidth}
              fill="transparent"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className="transition-all duration-100 ease-out"
            />
          </svg>
          <div className="absolute flex flex-col items-center justify-center">
            <span className="text-[10px] font-bold text-gray-500 tracking-wider">孤独リスク</span>
            <span className="text-4xl font-black text-white tracking-tight">{animatedRisk}点</span>
            <span className={`text-[11px] font-black tracking-widest px-2 py-0.5 rounded border mt-1.5 uppercase ${colors.text} ${colors.border} ${colors.bg}`}>
              {result.riskBandLabel}
            </span>
          </div>
        </div>

        {/* エンディングタイトル */}
        <EndingBadge endingName={result.endingName} routeName={result.routeName} />
      </motion.div>

      {/* 2. あなたの生活シナリオ */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="w-full bg-gray-900/60 border border-gray-800/80 rounded-2xl p-6 md:p-8 shadow-xl"
      >
        <h3 className="text-base font-bold text-gray-200 tracking-wide border-b border-gray-800 pb-3 mb-4 flex items-center gap-2">
          <CheckCircle2 className="w-4.5 h-4.5 text-amber-500" />
          75歳のあなたの生活シナリオ
        </h3>
        <p className="text-sm md:text-base text-gray-300 leading-relaxed whitespace-pre-line font-normal">
          {result.scenario}
        </p>
      </motion.div>

      {/* 3. 積み上げたもの vs 弱かったもの */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.25 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        {/* 強み */}
        <div className="w-full bg-gray-900/40 border border-gray-800 rounded-2xl p-5 shadow-md">
          <h4 className="text-xs font-bold text-emerald-400 tracking-wider mb-3 flex items-center gap-1.5">
            <PlusCircle className="w-4 h-4" />
            あなたが積み上げた資産・資本
          </h4>
          <ul className="flex flex-col gap-2">
            {result.strengths.map((str, idx) => (
              <li key={idx} className="text-xs font-bold text-gray-300 bg-emerald-950/20 border border-emerald-900/30 px-3 py-2 rounded-lg flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                {str}
              </li>
            ))}
          </ul>
        </div>

        {/* 弱み */}
        <div className="w-full bg-gray-900/40 border border-gray-800 rounded-2xl p-5 shadow-md">
          <h4 className="text-xs font-bold text-rose-400 tracking-wider mb-3 flex items-center gap-1.5">
            <MinusCircle className="w-4 h-4" />
            老後に向けて弱かった要因
          </h4>
          <ul className="flex flex-col gap-2">
            {result.weaknesses.map((weak, idx) => (
              <li key={idx} className="text-xs font-bold text-gray-300 bg-rose-950/20 border border-rose-900/30 px-3 py-2 rounded-lg flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                {weak}
              </li>
            ))}
          </ul>
        </div>
      </motion.div>

      {/* 4. 現実で見直すべき改善案 */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.35 }}
        className="w-full bg-gradient-to-b from-gray-900 to-gray-950 border border-amber-900/30 rounded-2xl p-6 md:p-8 shadow-xl relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-amber-500/5 to-transparent rounded-bl-full pointer-events-none" />

        <h3 className="text-base font-bold text-amber-400 tracking-wide border-b border-gray-800 pb-3 mb-5 flex items-center gap-2">
          <Lightbulb className="w-4.5 h-4.5 text-amber-400" />
          今から現実で見直すべきこと
        </h3>

        <div className="flex flex-col gap-5">
          {result.recommendations.map((rec, idx) => {
            const lines = rec.split('\n');
            const factor = lines[0];
            const action = lines[1] ? lines[1].replace('■ 改善アクション: ', '') : '';
            const reason = lines[2] ? lines[2].replace('■ その理由: ', '') : '';

            return (
              <div key={idx} className="bg-gray-950/60 border border-gray-900 rounded-xl p-4 flex flex-col gap-2">
                <span className="text-xs font-black text-amber-500 tracking-wider">
                  {factor}
                </span>
                <p className="text-xs md:text-sm font-bold text-gray-200 leading-relaxed">
                  💡 改善案: {action}
                </p>
                <p className="text-[11px] text-gray-500 leading-relaxed font-normal">
                  📌 なぜ必要か: {reason}
                </p>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* 5. 注意書きメッセージとリスタート */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.45 }}
        className="flex flex-col items-center gap-6 mt-4"
      >
        <p className="text-center text-xs text-gray-500 leading-relaxed max-w-md">
          ※これは未来の確定ではありません。今この瞬間から関係資本やサードプレイスを作れば、あなたの75歳ルートはいくらでも変えられます。
        </p>

        <button
          onClick={onRestart}
          className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-sm font-bold tracking-wider text-white bg-gradient-to-r from-amber-500 via-rose-500 to-purple-600 hover:from-amber-600 hover:via-rose-600 hover:to-purple-700 active:scale-98 transition-all duration-200 shadow-lg shadow-rose-950/30 overflow-hidden"
        >
          <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          もう一度プレイする
          <RotateCcw className="w-4 h-4 transition-transform group-hover:rotate-45" />
        </button>
      </motion.div>
    </div>
  );
}
