'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Choice } from '@/types/game';
import { compactChoiceLabel, compactText } from '@/lib/displayText';
import { ChevronRight } from 'lucide-react';

interface ChoiceButtonProps {
  choice: Choice;
  onClick: () => void;
  index: number;
  disabled?: boolean;
}

export default function ChoiceButton({ choice, onClick, index, disabled = false }: ChoiceButtonProps) {
  const letters = ['A', 'B', 'C', 'D', 'E', 'F'];

  return (
    <motion.button
      initial={{ opacity: 0, x: -15 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: index * 0.08 }}
      whileHover={{ scale: 1.01, backgroundColor: 'rgba(31, 41, 55, 0.6)' }}
      whileTap={{ scale: 0.99 }}
      onClick={onClick}
      disabled={disabled}
      className="group w-full text-left bg-gray-900/60 hover:bg-gray-800/60 disabled:opacity-60 disabled:pointer-events-none border border-gray-700 hover:border-rose-700/60 p-4 md:p-5 rounded-2xl flex items-start gap-4 transition-all duration-200 shadow-md shadow-black/20"
    >
      {/* 記号バッジ */}
      <span className="w-8 h-8 rounded-xl bg-gray-800 group-hover:bg-rose-950/60 border border-gray-600 group-hover:border-rose-800/60 text-xs font-black text-gray-250 group-hover:text-rose-350 flex items-center justify-center shrink-0 transition-colors duration-200">
        {letters[index] ?? letters[0]}
      </span>

      {/* ラベルと説明 */}
      <div className="flex-1">
        <h4 className="text-sm font-bold text-gray-200 group-hover:text-gray-100 transition-colors duration-200">
          {compactChoiceLabel(choice.label)}
        </h4>
        <p className="mt-1 text-xs text-gray-300 group-hover:text-gray-150 leading-relaxed transition-colors duration-200">
          {compactText(choice.description, 48)}
        </p>
      </div>

      {/* 矢印アイコン */}
      <ChevronRight className="w-4.5 h-4.5 text-gray-600 group-hover:text-rose-400 shrink-0 self-center transition-all duration-200 group-hover:translate-x-0.5" />
    </motion.button>
  );
}
