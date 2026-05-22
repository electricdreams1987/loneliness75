'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import ResultCard from '@/components/ResultCard';
import { processGameResult } from '@/lib/gameLogic';
import { GameStats, GameResult } from '@/types/game';
import { Home } from 'lucide-react';

export default function ResultPage() {
  const router = useRouter();
  const [result, setResult] = useState<GameResult | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      try {
        const storedStatsString = sessionStorage.getItem('loneliness_game_stats');
        if (!storedStatsString) {
          setError(true);
          return;
        }

        const parsedStats: GameStats = JSON.parse(storedStatsString);
        const calculatedResult = processGameResult(parsedStats);
        setResult(calculatedResult);
      } catch (err) {
        console.error('Failed to parse game stats', err);
        setError(true);
      }
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  const handleRestart = () => {
    sessionStorage.removeItem('loneliness_game_stats');
    router.push('/');
  };

  if (!error && !result) {
    return (
      <div className="min-h-screen bg-gray-950 text-gray-100 flex items-center justify-center font-sans">
        結果を計算中...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 flex flex-col font-sans selection:bg-rose-900/60 selection:text-rose-100 pb-16">
      <Header />

      <main className="flex-1">
        {error ? (
          <div className="max-w-md mx-auto text-center px-4 py-16 flex flex-col items-center gap-6">
            <div className="w-16 h-16 rounded-full bg-rose-950/40 border border-rose-900/50 flex items-center justify-center text-rose-400">
              <Home className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-bold text-gray-200">ゲームデータが見つかりません</h2>
            <p className="text-sm text-gray-500 leading-relaxed">
              シミュレーションデータが見つからないか、エラーが発生しました。もう一度最初からプレイしてください。
            </p>
            <button
              onClick={handleRestart}
              className="px-6 py-3 bg-gray-900 border border-gray-800 text-gray-300 font-bold rounded-xl text-sm hover:bg-gray-850 hover:text-white transition-colors duration-200"
            >
              トップページに戻る
            </button>
          </div>
        ) : (
          result && <ResultCard result={result} onRestart={handleRestart} />
        )}
      </main>

      <footer className="py-6 text-center border-t border-gray-900 text-xs text-gray-600 font-medium">
        &copy; {new Date().getFullYear()} 75歳の孤独 -老後の人生シミュレーター- MVP. All rights reserved.
      </footer>
    </div>
  );
}
