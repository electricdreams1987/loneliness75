'use client';

import React, { useRef, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import StageProgress from '@/components/StageProgress';
import LifeEventCard from '@/components/LifeEventCard';
import ChoiceButton from '@/components/ChoiceButton';
import StatsPanel from '@/components/StatsPanel';
import LifeStatusBar from '@/components/LifeStatusBar';
import { lifeStages } from '@/lib/lifeStages';
import { randomEvents } from '@/lib/randomEvents';
import { statusEvents } from '@/lib/statusEvents';
import { INITIAL_FLAGS, INITIAL_LIFE_STATUS, INITIAL_STATS, applyEffects, applyLifeStatusEffects, applyStateEffects } from '@/lib/gameLogic';
import { Choice, ChoiceHistory, GameState, LifeEvent, LifeStatus, LifeStatusConditions, PlayerFlags } from '@/types/game';
import { compactText } from '@/lib/displayText';
import { AnimatePresence, motion } from 'framer-motion';

const STAGE_AGES = [18, 22, 26, 29, 32, 37, 45, 52, 57, 62, 67, 75];

function getStageEvents(stageId: string): LifeEvent[] {
  return [
    ...(lifeStages.find((stage) => stage.id === stageId)?.events ?? []),
    ...statusEvents.filter((event) => event.stageId === stageId),
  ];
}

function withStageAge(lifeStatus: LifeStatus, stageIndex: number): LifeStatus {
  return {
    ...lifeStatus,
    age: STAGE_AGES[stageIndex] ?? lifeStatus.age,
  };
}

function matchesLifeStatusConditions(
  lifeStatus: LifeStatus,
  conditions?: LifeStatusConditions
): boolean {
  if (!conditions) {
    return true;
  }

  if (conditions.maritalStatus && !conditions.maritalStatus.includes(lifeStatus.maritalStatus)) return false;
  if (conditions.jobStatus && !conditions.jobStatus.includes(lifeStatus.jobStatus)) return false;
  if (conditions.housingStatus && !conditions.housingStatus.includes(lifeStatus.housingStatus)) return false;
  if (conditions.healthLabel && !conditions.healthLabel.includes(lifeStatus.healthLabel)) return false;
  if (conditions.childrenCount !== undefined && lifeStatus.childrenCount !== conditions.childrenCount) return false;
  if (conditions.childrenCountMin !== undefined && lifeStatus.childrenCount < conditions.childrenCountMin) return false;
  if (conditions.childrenCountMax !== undefined && lifeStatus.childrenCount > conditions.childrenCountMax) return false;
  if (conditions.hasEmergencyContact !== undefined && lifeStatus.hasEmergencyContact !== conditions.hasEmergencyContact) return false;
  if (conditions.hasLocalCommunity !== undefined && lifeStatus.hasLocalCommunity !== conditions.hasLocalCommunity) return false;

  return true;
}

function canShowEvent(event: LifeEvent, gameState: GameState): boolean {
  const { flags, lifeStatus } = gameState;
  if (event.conditions) {
    const matchesAll = (Object.entries(event.conditions) as Array<[keyof PlayerFlags, boolean]>).every(
      ([key, expectedValue]) => flags[key] === expectedValue
    );

    if (!matchesAll) {
      return false;
    }
  }

  if (!matchesLifeStatusConditions(lifeStatus, event.lifeStatusConditions)) {
    return false;
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
  gameState: GameState
): number {
  for (let index = startIndex; index < events.length; index++) {
    if (canShowEvent(events[index], gameState)) {
      return index;
    }
  }

  return -1;
}

function findNextPlayablePosition(startStageIndex: number, gameState: GameState) {
  for (let stageIndex = startStageIndex; stageIndex < lifeStages.length; stageIndex++) {
    const agedGameState = {
      ...gameState,
      lifeStatus: withStageAge(gameState.lifeStatus, stageIndex),
    };
    const eventIndex = findNextVisibleEventIndex(getStageEvents(lifeStages[stageIndex].id), 0, agedGameState);
    if (eventIndex !== -1) {
      return { stageIndex, eventIndex };
    }
  }

  return null;
}

function canShowRandomEvent(event: LifeEvent, gameState: GameState, seenEventIds: string[]): boolean {
  if (!event.isRandom || seenEventIds.includes(event.id)) {
    return false;
  }

  return canShowEvent(event, gameState);
}

function selectRandomEvent(stageIndex: number, gameState: GameState, seenEventIds: string[]): LifeEvent | null {
  const stage = lifeStages[stageIndex];
  if (!stage) {
    return null;
  }

  const candidates = randomEvents.filter(
    (event) => event.stageId === stage.id && canShowRandomEvent(event, gameState, seenEventIds)
  );

  for (const event of candidates) {
    if (Math.random() < (event.probability ?? 0.12)) {
      return event;
    }
  }

  return null;
}

function applyChoice(choice: Choice, gameState: GameState): GameState {
  const nextStats = applyEffects(gameState.stats, choice.effects);
  const nextFlags = applyStateEffects(gameState.flags, choice.stateEffects);
  const nextLifeStatus = applyLifeStatusEffects(
    {
      ...gameState.lifeStatus,
      hasEmergencyContact: nextFlags.hasEmergencyContact,
      hasLocalCommunity: nextFlags.hasLocalCommunity || nextFlags.communityActive,
    },
    choice.lifeStatusEffects,
    nextStats
  );

  return {
    stats: nextStats,
    flags: {
      ...nextFlags,
      hasEmergencyContact: nextLifeStatus.hasEmergencyContact,
      noEmergencyContact: !nextLifeStatus.hasEmergencyContact,
      hasLocalCommunity: nextLifeStatus.hasLocalCommunity,
      communityActive: nextFlags.communityActive || nextLifeStatus.hasLocalCommunity,
      married: nextLifeStatus.maritalStatus === 'married',
      single: nextLifeStatus.maritalStatus === 'single',
      divorced: nextLifeStatus.maritalStatus === 'divorced',
      hasChildren: nextLifeStatus.childrenCount > 0,
      hasChild: nextLifeStatus.childrenCount > 0,
      noChild: nextLifeStatus.childrenCount === 0 && nextFlags.noChild,
      livingAlone: nextLifeStatus.housingStatus === 'alone',
      livingWithFamily: nextLifeStatus.housingStatus === 'withFamily' || nextLifeStatus.housingStatus === 'withPartner',
      unemployed: nextLifeStatus.jobStatus === 'unemployed',
      employed: !['student', 'unemployed', 'retired'].includes(nextLifeStatus.jobStatus),
      managementTrack: nextFlags.managementTrack || ['manager', 'executive', 'owner'].includes(nextLifeStatus.jobStatus),
    },
    lifeStatus: nextLifeStatus,
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
    lifeStatus: INITIAL_LIFE_STATUS,
  });
  const [currentRandomEvent, setCurrentRandomEvent] = useState<LifeEvent | null>(null);
  const [lastEffects, setLastEffects] = useState<Choice['effects'] | null>(null);
  const [history, setHistory] = useState<ChoiceHistory[]>([]);
  const [seenEventIds, setSeenEventIds] = useState<string[]>([]);
  const [recentFeedback, setRecentFeedback] = useState<string | null>(null);
  const [isAdvancing, setIsAdvancing] = useState(false);
  const [swipeDelta, setSwipeDelta] = useState(0);
  const swipeStartX = useRef<number | null>(null);

  useEffect(() => {
    // ゲーム開始時にセッションストレージをクリア
    sessionStorage.removeItem('loneliness_game_stats');
    sessionStorage.removeItem('loneliness_game_history');
    sessionStorage.removeItem('loneliness_game_flags');
    sessionStorage.removeItem('loneliness_game_life_status');
  }, []);

  const currentStage = lifeStages[currentStageIndex];
  const currentStageEvents = currentStage ? getStageEvents(currentStage.id) : [];
  const currentEvent = currentRandomEvent ?? currentStageEvents[currentEventIndex];
  const visibleEventCount = currentStage
    ? currentStageEvents.filter((event) => canShowEvent(event, gameState)).length
    : 0;
  const currentVisibleEventNumber = currentStage
    ? currentStageEvents
        .slice(0, currentEventIndex + 1)
        .filter((event) => canShowEvent(event, gameState)).length
    : 0;
  const currentLifeStatus = withStageAge(gameState.lifeStatus, currentStageIndex);
  const canSwipeChoices = currentEvent?.choices.length === 2 && !isAdvancing;

  const saveGameProgress = (
    nextStats = gameState.stats,
    nextFlags = gameState.flags,
    nextHistory = history,
    nextLifeStatus = currentLifeStatus
  ) => {
    sessionStorage.setItem('loneliness_game_stats', JSON.stringify(nextStats));
    sessionStorage.setItem('loneliness_game_history', JSON.stringify(nextHistory));
    sessionStorage.setItem('loneliness_game_flags', JSON.stringify(nextFlags));
    sessionStorage.setItem('loneliness_game_life_status', JSON.stringify(nextLifeStatus));
  };

  const goToResult = (nextGameState: GameState, nextHistory: ChoiceHistory[]) => {
    saveGameProgress(nextGameState.stats, nextGameState.flags, nextHistory, { ...nextGameState.lifeStatus, age: 75 });
    router.push('/result');
  };

  const advanceToNextEvent = (
    nextGameState: GameState,
    nextHistory: ChoiceHistory[],
    nextSeenEventIds: string[],
    answeredRandomEvent: boolean
  ) => {
    if (!currentStage) {
      goToResult(nextGameState, nextHistory);
      return;
    }

    if (!answeredRandomEvent) {
      const randomEvent = selectRandomEvent(currentStageIndex, nextGameState, nextSeenEventIds);
      if (randomEvent) {
        setCurrentRandomEvent(randomEvent);
        return;
      }
    }

    const nextEventIndex = findNextVisibleEventIndex(
      getStageEvents(currentStage.id),
      currentEventIndex + 1,
      nextGameState
    );

    if (nextEventIndex !== -1) {
      setCurrentEventIndex(nextEventIndex);
      setCurrentRandomEvent(null);
      return;
    }

    const nextPosition = findNextPlayablePosition(currentStageIndex + 1, nextGameState);

    if (nextPosition) {
      const agedGameState = {
        ...nextGameState,
        lifeStatus: withStageAge(nextGameState.lifeStatus, nextPosition.stageIndex),
      };
      setGameState(agedGameState);
      setCurrentStageIndex(nextPosition.stageIndex);
      setCurrentEventIndex(nextPosition.eventIndex);
      setCurrentRandomEvent(null);
    } else {
      goToResult(nextGameState, nextHistory);
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
      lifeStatusEffectsApplied: choice.lifeStatusEffects,
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
        nextGameState,
        nextHistory,
        nextSeenEventIds,
        Boolean(currentRandomEvent)
      );
      setIsAdvancing(false);
    }, 120);
  };

  const handleSwipeEnd = (endX: number) => {
    if (!currentEvent || !canSwipeChoices || swipeStartX.current === null) {
      swipeStartX.current = null;
      setSwipeDelta(0);
      return;
    }

    const deltaX = endX - swipeStartX.current;
    swipeStartX.current = null;
    setSwipeDelta(0);

    if (Math.abs(deltaX) < 72) {
      return;
    }

    const selectedChoice = deltaX < 0 ? currentEvent.choices[0] : currentEvent.choices[1];
    handleChoiceSelect(selectedChoice);
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
        <LifeStatusBar lifeStatus={currentLifeStatus} />
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

              {currentEvent?.choices.length === 2 && (
                <div className="grid grid-cols-2 gap-2 rounded-xl border border-gray-800 bg-gray-900/40 px-3 py-2 text-[11px] font-bold text-gray-300">
                  <span className={`truncate transition-colors ${swipeDelta < -32 ? 'text-rose-200' : ''}`}>← {compactText(currentEvent.choices[0].label, 18)}</span>
                  <span className={`truncate text-right transition-colors ${swipeDelta > 32 ? 'text-emerald-200' : ''}`}>{compactText(currentEvent.choices[1].label, 18)} →</span>
                </div>
              )}

              <div
                className="relative flex flex-col gap-3 touch-pan-y"
                style={{
                  transform: canSwipeChoices ? `translateX(${Math.max(-26, Math.min(26, swipeDelta / 4))}px)` : undefined,
                  transition: swipeDelta === 0 ? 'transform 140ms ease-out' : undefined,
                }}
                onPointerDown={(event) => {
                  if (canSwipeChoices && event.pointerType !== 'mouse') {
                    swipeStartX.current = event.clientX;
                    setSwipeDelta(0);
                  }
                }}
                onPointerMove={(event) => {
                  if (canSwipeChoices && swipeStartX.current !== null && event.pointerType !== 'mouse') {
                    setSwipeDelta(event.clientX - swipeStartX.current);
                  }
                }}
                onPointerUp={(event) => handleSwipeEnd(event.clientX)}
                onPointerCancel={() => {
                  swipeStartX.current = null;
                  setSwipeDelta(0);
                }}
              >
                {currentEvent?.choices.length === 2 && Math.abs(swipeDelta) > 32 && (
                  <div className={`pointer-events-none absolute inset-0 z-10 flex items-center justify-center rounded-2xl border text-sm font-black backdrop-blur-sm ${swipeDelta > 0 ? 'border-emerald-700/70 bg-emerald-950/35 text-emerald-100' : 'border-rose-700/70 bg-rose-950/35 text-rose-100'}`}>
                    {swipeDelta > 0
                      ? `${compactText(currentEvent.choices[1].label, 20)}で答える`
                      : `${compactText(currentEvent.choices[0].label, 20)}で答える`}
                  </div>
                )}
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
