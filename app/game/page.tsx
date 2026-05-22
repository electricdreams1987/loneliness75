'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import StageProgress from '@/components/StageProgress';
import LifeEventCard from '@/components/LifeEventCard';
import ChoiceButton from '@/components/ChoiceButton';
import StatsPanel from '@/components/StatsPanel';
import FeedbackCard from '@/components/FeedbackCard';
import { lifeStages } from '@/lib/lifeStages';
import { INITIAL_STATS, applyEffects } from '@/lib/gameLogic';
import { GameStats, Choice, ChoiceHistory } from '@/types/game';
import { AnimatePresence, motion } from 'framer-motion';

export default function GamePage() {
  const router = useRouter();
  
  // ゲームステート
  const [currentStageIndex, setCurrentStageIndex] = useState(0);
  const [stats, setStats] = useState<GameStats>(INITIAL_STATS);
  const [showFeedback, setShowFeedback] = useState(false);
  const [selectedChoice, setSelectedChoice] = useState<Choice | null>(null);
  const [lastEffects, setLastEffects] = useState<Partial<GameStats> | null>(null);
  const [history, setHistory] = useState<ChoiceHistory[]>([]);

  useEffect(() => {
    // ゲーム開始時にセッションストレージをクリア
    sessionStorage.removeItem('loneliness_game_stats');
  }, []);

  const currentStage = lifeStages[currentStageIndex];
  
  // MVPなので各ステージにイベントは1つ
  const currentEvent = currentStage?.events[0];

  const handleChoiceSelect = (choice: Choice) => {
    setSelectedChoice(choice);
    setLastEffects(choice.effects);
    
    // ステータスの更新
    const newStats = applyEffects(stats, choice.effects);
    setStats(newStats);

    // 履歴の追加
    const newHistoryItem: ChoiceHistory = {
      eventId: currentEvent.id,
      choiceId: choice.id,
      stageLabel: currentStage.label,
      choiceLabel: choice.label,
      effectsApplied: choice.effects,
    };
    setHistory([...history, newHistoryItem]);
    
    setShowFeedback(true);
  };

  const handleNext = () => {
    const isLastStage = currentStageIndex === lifeStages.length - 1;

    if (isLastStage) {
      // 最終結果を sessionStorage に保存して結果ページへ遷移
      sessionStorage.setItem('loneliness_game_stats', JSON.stringify(stats));
      router.push('/result');
    } else {
      // 次のステージへ
      setCurrentStageIndex(currentStageIndex + 1);
      setShowFeedback(false);
      setSelectedChoice(null);
      setLastEffects(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 flex flex-col font-sans selection:bg-rose-900/60 selection:text-rose-100 pb-12">
      <Header currentAge={currentStage?.ageRange} />
      
      {currentStage && (
        <StageProgress
          currentStageIndex={currentStageIndex}
          totalStages={lifeStages.length}
          stageLabel={currentStage.label}
          ageRange={currentStage.ageRange}
        />
      )}

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 pt-6 flex flex-col gap-6 md:gap-8">
        
        {/* ステータスパネル (常に現在のステータスを表示) */}
        <StatsPanel stats={stats} lastEffects={lastEffects} />

        <div className="flex-1 flex flex-col gap-6">
          <AnimatePresence mode="wait">
            {!showFeedback ? (
              // 状況説明と選択肢
              <motion.div
                key={`stage-${currentStageIndex}`}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col gap-6"
              >
                {currentEvent && <LifeEventCard event={currentEvent} />}

                {/* 選択肢リスト */}
                <div className="flex flex-col gap-3">
                  {currentEvent?.choices.map((choice, idx) => (
                    <ChoiceButton
                      key={choice.id}
                      choice={choice}
                      index={idx}
                      onClick={() => handleChoiceSelect(choice)}
                    />
                  ))}
                </div>
              </motion.div>
            ) : (
              // 選択結果フィードバック
              <motion.div
                key={`feedback-${currentStageIndex}`}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.3 }}
              >
                {selectedChoice && (
                  <FeedbackCard
                    feedbackText={selectedChoice.feedback}
                    effects={selectedChoice.effects}
                    onNext={handleNext}
                  />
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
