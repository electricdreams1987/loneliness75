'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ChoiceHistory, GameResult, LifeStatus, PlayerFlags } from '@/types/game';
import { buildLifeReflections, buildSeventyFiveDay } from '@/lib/resultNarrative';
import EndingBadge from './EndingBadge';
import LifeStatusBar, { formatLifeStatus } from './LifeStatusBar';
import {
  RotateCcw,
  Share2,
  Check,
  PlusCircle,
  MinusCircle,
  CheckCircle2,
  Lightbulb,
  BookOpen,
  CalendarDays,
} from 'lucide-react';

interface ResultCardProps {
  result: GameResult;
  history: ChoiceHistory[];
  flags: PlayerFlags | null;
  lifeStatus: LifeStatus | null;
  onRestart: () => void;
}

function buildStatusNote(lifeStatus: LifeStatus, flags: PlayerFlags | null): string {
  if (
    lifeStatus.maritalStatus === 'single' &&
    lifeStatus.housingStatus === 'alone' &&
    (lifeStatus.hasLocalCommunity || lifeStatus.hasEmergencyContact)
  ) {
    return '一人で暮らしていても、挨拶する相手や連絡先があるなら、孤独と孤立は同じではありません。';
  }

  if (
    lifeStatus.childrenCount > 0 &&
    (flags?.familyPresentButDistant || lifeStatus.hasEmergencyContact === false)
  ) {
    return '家族はいても、日々の連絡や頼る約束が薄いと、緊急時には少し距離が残ります。';
  }

  if (lifeStatus.jobStatus === 'owner' || flags?.workIdentityDependent) {
    return '長く自分で決める人生を歩みました。その強さは残る一方、弱音を見せる相手を持つことも支えになります。';
  }

  if (lifeStatus.maritalStatus === 'divorced') {
    return '別々の暮らしを選んだ後も、友人、地域、制度との接点は作り直せます。';
  }

  return 'このステータスは、あなたが積み重ねた選択の現在地です。ここからも関係や支えは作り直せます。';
}

export default function ResultCard({ result, history, flags, lifeStatus, onRestart }: ResultCardProps) {
  const [animatedRisk, setAnimatedRisk] = useState(0);
  const [shareStatus, setShareStatus] = useState<'idle' | 'copied'>('idle');
  const dayScene = buildSeventyFiveDay(result.stats, flags, result.lonelinessRisk);
  const reflections = buildLifeReflections(history);
  const shareText = [
    `75歳の孤独: ${result.endingName}`,
    `孤独リスク: ${result.lonelinessRisk}点（${result.riskBandLabel}）`,
    lifeStatus ? `最終ステータス: ${formatLifeStatus(lifeStatus).join(' / ')}` : '',
    `75歳のある一日: ${dayScene.title}`,
    dayScene.paragraphs[0],
    reflections[0] ? `人生に残った選択: ${reflections[0].text}` : '',
  ].filter(Boolean).join('\n\n');

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: '75歳の孤独 結果',
          text: shareText,
        });
      } else {
        await navigator.clipboard.writeText(shareText);
        setShareStatus('copied');
        window.setTimeout(() => setShareStatus('idle'), 1800);
      }
    } catch {
      try {
        await navigator.clipboard.writeText(shareText);
        setShareStatus('copied');
        window.setTimeout(() => setShareStatus('idle'), 1800);
      } catch {
        setShareStatus('idle');
      }
    }
  };

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
      {/* 1. あなたの生活シナリオ */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
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

      {lifeStatus && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="w-full"
        >
          <h3 className="mb-3 flex items-center gap-2 text-base font-bold tracking-wide text-gray-200">
            75歳時点の人生ステータス
          </h3>
          <LifeStatusBar lifeStatus={lifeStatus} compact />
          <p className="mt-3 rounded-xl border border-gray-800 bg-gray-900/50 px-4 py-3 text-xs leading-relaxed text-gray-300">
            {buildStatusNote(lifeStatus, flags)}
          </p>
        </motion.div>
      )}

      {/* 2. 75歳のある一日 */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="w-full bg-gradient-to-b from-gray-900 to-gray-950 border border-gray-800 rounded-2xl p-6 md:p-8 shadow-xl"
      >
        <h3 className="text-base font-bold text-gray-200 tracking-wide border-b border-gray-800 pb-3 mb-4 flex items-center gap-2">
          <CalendarDays className="w-4.5 h-4.5 text-sky-400" />
          75歳のある一日
        </h3>
        <div className="flex flex-col gap-4">
          <div>
            <span className="text-[11px] font-bold text-sky-300 tracking-widest uppercase">
              {dayScene.title}
            </span>
          </div>
          {dayScene.paragraphs.map((paragraph, index) => (
            <p key={index} className="text-sm md:text-base text-gray-300 leading-relaxed">
              {paragraph}
            </p>
          ))}
          <p className="text-xs text-gray-400 leading-relaxed border-t border-gray-800 pt-4">
            {dayScene.note}
          </p>
        </div>
      </motion.div>

      {/* 3. あなたの人生に残った選択 */}
      {reflections.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-full bg-gray-900/50 border border-gray-800 rounded-2xl p-6 md:p-8 shadow-xl"
        >
          <h3 className="text-base font-bold text-gray-200 tracking-wide border-b border-gray-800 pb-3 mb-5 flex items-center gap-2">
            <BookOpen className="w-4.5 h-4.5 text-rose-400" />
            あなたの人生に残った選択
          </h3>
          <ol className="flex flex-col gap-3">
            {reflections.map((reflection, index) => (
              <li key={`${reflection.stageLabel}-${index}`} className="rounded-xl border border-gray-800 bg-gray-950/50 p-4">
                <span className="text-[11px] font-black text-rose-300 tracking-widest">
                  {reflection.stageLabel}
                </span>
                <p className="mt-2 text-sm text-gray-300 leading-relaxed">
                  {reflection.text}
                </p>
              </li>
            ))}
          </ol>
        </motion.div>
      )}

      {/* 4. リスクメーターとエンディング名 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="w-full bg-gradient-to-b from-gray-900 to-gray-950 border border-gray-800 rounded-3xl p-6 md:p-8 flex flex-col items-center shadow-2xl relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-radial-gradient from-rose-500/5 to-transparent pointer-events-none" />

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
            <span className="text-[10px] font-bold text-gray-305 tracking-wider">孤独リスク</span>
            <span className="text-4xl font-black text-white tracking-tight">{animatedRisk}点</span>
            <span className={`text-[11px] font-black tracking-widest px-2 py-0.5 rounded border mt-1.5 uppercase ${colors.text} ${colors.border} ${colors.bg}`}>
              {result.riskBandLabel}
            </span>
          </div>
        </div>

        {/* エンディングタイトル */}
        <EndingBadge endingName={result.endingName} routeName={result.routeName} />

        <button
          onClick={handleShare}
          className="mt-6 inline-flex items-center justify-center gap-2 rounded-xl border border-gray-700 bg-gray-900/70 px-4 py-3 text-xs font-bold text-gray-200 transition-colors duration-200 hover:border-sky-700/70 hover:bg-gray-800"
        >
          {shareStatus === 'copied' ? (
            <Check className="w-4 h-4 text-emerald-400" />
          ) : (
            <Share2 className="w-4 h-4 text-sky-300" />
          )}
          {shareStatus === 'copied' ? '結果をコピーしました' : '結果の文章を共有'}
        </button>
      </motion.div>

      {/* 5. 積み上げたもの vs 弱かったもの */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
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

      {/* 6. 現実で見直すべき改善案 */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
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
                  改善案: {action}
                </p>
                <p className="text-[11px] text-gray-300 leading-relaxed font-normal">
                  なぜ必要か: {reason}
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
        transition={{ duration: 0.5, delay: 0.6 }}
        className="flex flex-col items-center gap-6 mt-4"
      >
        <p className="text-center text-xs text-gray-300 leading-relaxed max-w-md">
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
