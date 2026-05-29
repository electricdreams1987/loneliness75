'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { LifeEvent } from '@/types/game';
import { compactText, compactTitle } from '@/lib/displayText';
import { Sparkles } from 'lucide-react';

interface LifeEventCardProps {
  event: LifeEvent;
}

export default function LifeEventCard({ event }: LifeEventCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.4 }}
      className="relative w-full bg-gradient-to-b from-gray-900 to-gray-950 border border-gray-800 rounded-2xl p-6 md:p-8 shadow-xl overflow-hidden"
    >
      {/* デザイン装飾用のライトエフェクト */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-rose-500/10 to-transparent rounded-bl-full pointer-events-none" />
      <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-gradient-to-tr from-amber-500/5 to-transparent rounded-tr-full pointer-events-none" />

      {/* アイコンとタイトル */}
      <div className="flex items-center gap-2 mb-4">
        <div className="p-1 rounded-md bg-rose-950/50 border border-rose-900/30">
          <Sparkles className="w-4 h-4 text-rose-400" />
        </div>
        <span className="text-[11px] font-bold text-rose-400/80 tracking-widest uppercase">
          Current Situation
        </span>
      </div>

      <h3 className="text-xl md:text-2xl font-black text-gray-100 tracking-tight leading-snug mb-4">
        {compactTitle(event.title)}
      </h3>

      <p className="text-sm md:text-base text-gray-200 leading-relaxed font-normal">
        {compactText(event.description, 72)}
      </p>
    </motion.div>
  );
}
