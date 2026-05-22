'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Play, ShieldAlert, Calendar } from 'lucide-react';

interface StartScreenProps {
  onStart: () => void;
}

export default function StartScreen({ onStart }: StartScreenProps) {
  const containerVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="max-w-xl mx-auto px-4 py-8 md:py-16 flex flex-col items-center text-center"
    >
      {/* 象徴的なアイコン */}
      <motion.div
        variants={itemVariants}
        className="relative mb-6 md:mb-8"
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/20 to-rose-600/20 rounded-full blur-2xl w-28 h-28 mx-auto -z-10" />
        <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 flex items-center justify-center shadow-lg shadow-rose-950/30">
          <Calendar className="w-10 h-10 md:w-12 md:h-12 text-white" />
        </div>
      </motion.div>

      {/* タイトル */}
      <motion.div variants={itemVariants} className="mb-6 md:mb-8">
        <span className="text-xs uppercase tracking-[0.25em] text-amber-500 font-bold bg-amber-950/40 border border-amber-900/40 px-3 py-1 rounded-full">
          老後の人生シミュレーター
        </span>
        <h1 className="mt-3 text-4xl md:text-5xl font-black tracking-tight leading-none text-transparent bg-clip-text bg-gradient-to-r from-gray-50 via-gray-200 to-gray-400">
          75歳の孤独
        </h1>
      </motion.div>

      {/* キャッチコピー */}
      <motion.div
        variants={itemVariants}
        className="mb-8 md:mb-12 max-w-md bg-gray-900/40 border border-gray-800/80 p-6 rounded-2xl backdrop-blur-sm"
      >
        <p className="text-base md:text-lg text-gray-200 leading-relaxed font-medium">
          18歳から75歳までを、数分で生きる。
        </p>
        <p className="mt-3 text-xs md:text-sm text-gray-400 leading-relaxed">
          仕事、恋愛、結婚、子ども、友人、親、健康、住まい。<br />
          あなたの選択は、75歳の孤独にどうつながるのか。
        </p>
      </motion.div>

      {/* CTAボタン */}
      <motion.div variants={itemVariants} className="w-full max-w-xs mb-8">
        <button
          onClick={onStart}
          className="group relative w-full inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl text-sm font-bold tracking-wider text-white bg-gradient-to-r from-amber-500 via-rose-500 to-purple-600 hover:from-amber-600 hover:via-rose-600 hover:to-purple-700 active:scale-98 transition-all duration-200 shadow-lg shadow-rose-950/30 overflow-hidden"
        >
          <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          シミュレーションを開始する
          <Play className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </button>
      </motion.div>

      {/* 注意書き */}
      <motion.div
        variants={itemVariants}
        className="max-w-sm flex items-start gap-2.5 p-4 rounded-lg bg-gray-950/60 border border-gray-900 text-left"
      >
        <ShieldAlert className="w-4.5 h-4.5 text-amber-500/80 shrink-0 mt-0.5" />
        <p className="text-[11px] text-gray-500 leading-relaxed">
          【注意】このゲームは医療・心理診断ではありません。人生後半の孤独や人間関係を真剣に考えるきっかけを提供するシミュレーションです。結果は将来の運命を断定するものではありません。
        </p>
      </motion.div>
    </motion.div>
  );
}
