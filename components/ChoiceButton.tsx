'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Choice } from '@/types/game';
import { ChevronRight } from 'lucide-react';

interface ChoiceButtonProps {
  choice: Choice;
  onClick: () => void;
  index: number;
}

export default function ChoiceButton({ choice, onClick, index }: ChoiceButtonProps) {
  // 選択肢のアルファベット記号 (A, B, C, D)
  const letters = ['A', 'B', 'C', 'D'];

  return (
    <motion.button
      initial={{ opacity: 0, x: -15 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: index * 0.08 }}
      whileHover={{ scale: 1.01, backgroundColor: 'rgba(31, 41, 55, 0.6)' }}
      whileTap={{ scale: 0.99 }}
      onClick={onClick}
      className="group w-full text-left bg-gray-900/50 hover:bg-gray-800/60 border border-gray-800 hover:border-rose-900/50 p-4 md:p-5 rounded-2xl flex items-start gap-4 transition-all duration-200 shadow-md shadow-black/20"
    >
      {/* 記号バッジ */}
      <span className="w-8 h-8 rounded-xl bg-gray-800 group-hover:bg-rose-950/60 border border-gray-700 group-hover:border-rose-900/40 text-xs font-black text-gray-400 group-hover:text-rose-400 flex items-center justify-center shrink-0 transition-colors duration-200">
        {letters[index] ?? letters[0]}
      </span>

      {/* ラベルと説明 */}
      <div className="flex-1">
        <h4 className="text-sm font-bold text-gray-200 group-hover:text-gray-100 transition-colors duration-200">
          {choice.label}
        </h4>
        <p className="mt-1 text-xs text-gray-500 group-hover:text-gray-400 leading-relaxed transition-colors duration-200">
          {choice.description}
        </p>
      </div>

      {/* 矢印アイコン */}
      <ChevronRight className="w-4.5 h-4.5 text-gray-600 group-hover:text-rose-400 shrink-0 self-center transition-all duration-200 group-hover:translate-x-0.5" />
    </motion.button>
  );
}
