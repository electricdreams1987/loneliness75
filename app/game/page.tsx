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
import { INITIAL_FLAGS, INITIAL_STATS, applyEffects, applyStateEffects } from '@/lib/gameLogic';
import { Choice, ChoiceHistory, GameState, LifeEvent, PlayerFlags } from '@/types/game';
import { AnimatePresence, motion } from 'framer-motion';

function eventMatchesConditions(event: LifeEvent, flags: PlayerFlags): boolean {
  if (event.conditions) {
    const matchesAll = (Object.entries(event.conditions) as Array<[keyof PlayerFlags, boolean]>).every(
      ([key, expectedValue]) => flags[key] === expectedValue
    );

    if (!matchesAll) {
      return false;
    }
  }

  if (!event.anyConditions || event.anyConditions.length === 0) {
    return true;
  }

  return event.anyConditions.some((conditions) =>
    (Object.entries(conditions) as Array<[keyof PlayerFlags, boolean]>).every(
      ([key, expectedValue]) => flags[key] === expectedValue
    )
  );
}

function findNextVisibleEventIndex(
  events: LifeEvent[],
  startIndex: number,
  flags: PlayerFlags
): number {
  for (let index = startIndex; index < events.length; index++) {
    if (eventMatchesConditions(events[index], flags)) {
      return index;
    }
  }

  return -1;
}

function findNextPlayablePosition(startStageIndex: number, flags: PlayerFlags) {
  for (let stageIndex = startStageIndex; stageIndex < lifeStages.length; stageIndex++) {
    const eventIndex = findNextVisibleEventIndex(lifeStages[stageIndex].events, 0, flags);
    if (eventIndex !== -1) {
      return { stageIndex, eventIndex };
    }
  }

  return null;
}

export default function GamePage() {
  const router = useRouter();
  
  // ゲームステート
  const [currentStageIndex, setCurrentStageIndex] = useState(0);
  const [currentEventIndex, setCurrentEventIndex] = useState(0);
  const [gameState, setGameState] = useState<GameState>({
    stats: INITIAL_STATS,
    flags: INITIAL_FLAGS,
  });
  const [showFeedback, setShowFeedback] = useState(false);
  const [selectedChoice, setSelectedChoice] = useState<Choice | null>(null);
  const [lastEffects, setLastEffects] = useState<Choice['effects'] | null>(null);
  const [history, setHistory] = useState<ChoiceHistory[]>([]);

  useEffect(() => {
    // ゲーム開始時にセッションストレージをクリア
    sessionStorage.removeItem('loneliness_game_stats');
    sessionStorage.removeItem('loneliness_game_history');
    sessionStorage.removeItem('loneliness_game_flags');
  }, []);

  const currentStage = lifeStages[currentStageIndex];
  const currentEvent = currentStage?.events[currentEventIndex];
  const visibleEventCount = currentStage
    ? currentStage.events.filter((event) => eventMatchesConditions(event, gameState.flags)).length
    : 0;
  const currentVisibleEventNumber = currentStage
    ? currentStage.events
        .slice(0, currentEventIndex + 1)
        .filter((event) => eventMatchesConditions(event, gameState.flags)).length
    : 0;

  const handleChoiceSelect = (choice: Choice) => {
    if (!currentStage || !currentEvent) {
      return;
    }

    setSelectedChoice(choice);
    setLastEffects(choice.effects);
    
    // ステータスの更新
    const newStats = applyEffects(gameState.stats, choice.effects);
    const newFlags = applyStateEffects(gameState.flags, choice.stateEffects);
    setGameState({
      stats: newStats,
      flags: newFlags,
    });

    // 履歴の追加
    const newHistoryItem: ChoiceHistory = {
      eventId: currentEvent.id,
      eventTitle: currentEvent.title,
      choiceId: choice.id,
      stageLabel: currentStage.label,
      choiceLabel: choice.label,
      choiceDescription: choice.description,
      effectsApplied: choice.effects,
      stateEffectsApplied: choice.stateEffects,
      meaning: choice.feedback,
    };
    setHistory([...history, newHistoryItem]);
    
    setShowFeedback(true);
  };

  const saveResultState = () => {
    sessionStorage.setItem('loneliness_game_stats', JSON.stringify(gameState.stats));
    sessionStorage.setItem('loneliness_game_history', JSON.stringify(history));
    sessionStorage.setItem('loneliness_game_flags', JSON.stringify(gameState.flags));
  };

  const handleNext = () => {
    if (!currentStage) {
      saveResultState();
      router.push('/result');
      return;
    }

    const nextEventIndex = findNextVisibleEventIndex(
      currentStage.events,
      currentEventIndex + 1,
      gameState.flags
    );

    if (nextEventIndex !== -1) {
      setCurrentEventIndex(nextEventIndex);
      setShowFeedback(false);
      setSelectedChoice(null);
      setLastEffects(null);
      return;
    }

    const nextPosition = findNextPlayablePosition(currentStageIndex + 1, gameState.flags);

    if (nextPosition) {
      setCurrentStageIndex(nextPosition.stageIndex);
      setCurrentEventIndex(nextPosition.eventIndex);
      setShowFeedback(false);
      setSelectedChoice(null);
      setLastEffects(null);
    } else {
      // 最終結果を sessionStorage に保存して結果ページへ遷移
      saveResultState();
      router.push('/result');
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
          currentEventNumber={currentVisibleEventNumber}
          totalEventCount={visibleEventCount}
        />
      )}

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 pt-6 flex flex-col gap-6 md:gap-8">
        
        {/* ステータスパネル (常に現在のステータスを表示) */}
        <StatsPanel stats={gameState.stats} lastEffects={lastEffects} />

        <div className="flex-1 flex flex-col gap-6">
          <AnimatePresence mode="wait">
            {!showFeedback ? (
              // 状況説明と選択肢
              <motion.div
                key={`stage-${currentStageIndex}-event-${currentEventIndex}`}
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
