'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import StageProgress from '@/components/StageProgress';
import LifeEventCard from '@/components/LifeEventCard';
import ChoiceButton from '@/components/ChoiceButton';
import StatsPanel from '@/components/StatsPanel';
import { lifeStages } from '@/lib/lifeStages';
import { randomEvents } from '@/lib/randomEvents';
import { INITIAL_FLAGS, INITIAL_STATS, applyEffects, applyStateEffects } from '@/lib/gameLogic';
import { Choice, ChoiceHistory, GameState, LifeEvent, PlayerFlags } from '@/types/game';
import { compactText } from '@/lib/displayText';
import { AnimatePresence, motion } from 'framer-motion';

function canShowEvent(event: LifeEvent, flags: PlayerFlags): boolean {
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
    if (canShowEvent(events[index], flags)) {
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

function canShowRandomEvent(event: LifeEvent, flags: PlayerFlags, seenEventIds: string[]): boolean {
  if (!event.isRandom || seenEventIds.includes(event.id)) {
    return false;
  }

  return canShowEvent(event, flags);
}

function selectRandomEvent(stageIndex: number, flags: PlayerFlags, seenEventIds: string[]): LifeEvent | null {
  const stage = lifeStages[stageIndex];
  if (!stage) {
    return null;
  }

  const candidates = randomEvents.filter(
    (event) => event.stageId === stage.id && canShowRandomEvent(event, flags, seenEventIds)
  );

  for (const event of candidates) {
    if (Math.random() < (event.probability ?? 0.12)) {
      return event;
    }
  }

  return null;
}

function applyChoice(choice: Choice, gameState: GameState): GameState {
  return {
    stats: applyEffects(gameState.stats, choice.effects),
    flags: applyStateEffects(gameState.flags, choice.stateEffects),
  };
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
  const [currentRandomEvent, setCurrentRandomEvent] = useState<LifeEvent | null>(null);
  const [lastEffects, setLastEffects] = useState<Choice['effects'] | null>(null);
  const [history, setHistory] = useState<ChoiceHistory[]>([]);
  const [seenEventIds, setSeenEventIds] = useState<string[]>([]);
  const [recentFeedback, setRecentFeedback] = useState<string | null>(null);
  const [isAdvancing, setIsAdvancing] = useState(false);

  useEffect(() => {
    // ゲーム開始時にセッションストレージをクリア
    sessionStorage.removeItem('loneliness_game_stats');
    sessionStorage.removeItem('loneliness_game_history');
    sessionStorage.removeItem('loneliness_game_flags');
  }, []);

  const currentStage = lifeStages[currentStageIndex];
  const currentEvent = currentRandomEvent ?? currentStage?.events[currentEventIndex];
  const visibleEventCount = currentStage
    ? currentStage.events.filter((event) => canShowEvent(event, gameState.flags)).length
    : 0;
  const currentVisibleEventNumber = currentStage
    ? currentStage.events
        .slice(0, currentEventIndex + 1)
        .filter((event) => canShowEvent(event, gameState.flags)).length
    : 0;

  const saveGameProgress = (
    nextStats = gameState.stats,
    nextFlags = gameState.flags,
    nextHistory = history
  ) => {
    sessionStorage.setItem('loneliness_game_stats', JSON.stringify(nextStats));
    sessionStorage.setItem('loneliness_game_history', JSON.stringify(nextHistory));
    sessionStorage.setItem('loneliness_game_flags', JSON.stringify(nextFlags));
  };

  const goToResult = (nextStats: GameState['stats'], nextFlags: PlayerFlags, nextHistory: ChoiceHistory[]) => {
    saveGameProgress(nextStats, nextFlags, nextHistory);
    router.push('/result');
  };

  const advanceToNextEvent = (
    nextStats: GameState['stats'],
    nextFlags: PlayerFlags,
    nextHistory: ChoiceHistory[],
    nextSeenEventIds: string[],
    answeredRandomEvent: boolean
  ) => {
    if (!currentStage) {
      goToResult(nextStats, nextFlags, nextHistory);
      return;
    }

    if (!answeredRandomEvent) {
      const randomEvent = selectRandomEvent(currentStageIndex, nextFlags, nextSeenEventIds);
      if (randomEvent) {
        setCurrentRandomEvent(randomEvent);
        return;
      }
    }

    const nextEventIndex = findNextVisibleEventIndex(
      currentStage.events,
      currentEventIndex + 1,
      nextFlags
    );

    if (nextEventIndex !== -1) {
      setCurrentEventIndex(nextEventIndex);
      setCurrentRandomEvent(null);
      return;
    }

    const nextPosition = findNextPlayablePosition(currentStageIndex + 1, nextFlags);

    if (nextPosition) {
      setCurrentStageIndex(nextPosition.stageIndex);
      setCurrentEventIndex(nextPosition.eventIndex);
      setCurrentRandomEvent(null);
    } else {
      goToResult(nextStats, nextFlags, nextHistory);
    }
  };

  const handleChoiceSelect = (choice: Choice) => {
    if (!currentStage || !currentEvent || isAdvancing) {
      return;
    }

    setIsAdvancing(true);
    setLastEffects(choice.effects);

    const nextGameState = applyChoice(choice, gameState);
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
    const nextHistory = [...history, newHistoryItem];
    const nextSeenEventIds = [...seenEventIds, currentEvent.id];

    setGameState(nextGameState);
    setHistory(nextHistory);
    setSeenEventIds(nextSeenEventIds);
    setRecentFeedback(compactText(choice.feedback, 58));

    window.setTimeout(() => {
      advanceToNextEvent(
        nextGameState.stats,
        nextGameState.flags,
        nextHistory,
        nextSeenEventIds,
        Boolean(currentRandomEvent)
      );
      setIsAdvancing(false);
    }, 120);
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
            <motion.div
              key={`${currentRandomEvent ? 'random' : 'stage'}-${currentStageIndex}-event-${currentEvent?.id ?? currentEventIndex}`}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col gap-6"
            >
              {recentFeedback && (
                <div className="rounded-xl border border-amber-900/40 bg-amber-950/20 px-4 py-3 text-xs font-medium leading-relaxed text-amber-100/90">
                  {recentFeedback}
                </div>
              )}

              {currentEvent && <LifeEventCard event={currentEvent} />}

              <div className="flex flex-col gap-3">
                {currentEvent?.choices.map((choice, idx) => (
                  <ChoiceButton
                    key={choice.id}
                    choice={choice}
                    index={idx}
                    disabled={isAdvancing}
                    onClick={() => handleChoiceSelect(choice)}
                  />
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
