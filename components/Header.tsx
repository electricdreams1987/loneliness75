'use client';

import React from 'react';
import { Compass } from 'lucide-react';

interface HeaderProps {
  currentAge?: string;
  showBackToHome?: boolean;
}

export default function Header({ currentAge }: HeaderProps) {
  return (
    <header className="border-b border-gray-800 bg-gray-950/80 backdrop-blur-md sticky top-0 z-50 transition-all duration-300">
      <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-lg bg-gradient-to-tr from-amber-500 to-rose-600 shadow-md shadow-rose-950/30">
            <Compass className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-base font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-gray-100 via-gray-200 to-gray-400">
              75歳の孤独
            </h1>
            <p className="text-[10px] text-gray-500 font-medium tracking-tight">
              老後の人生シミュレーター
            </p>
          </div>
        </div>

        {currentAge && (
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-rose-950/40 border border-rose-900/50 shadow-inner">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
            <span className="text-xs font-bold text-rose-300 tracking-wider">
              {currentAge}
            </span>
          </div>
        )}
      </div>
    </header>
  );
}
