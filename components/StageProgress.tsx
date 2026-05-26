'use client';

import React from 'react';

interface StageProgressProps {
  currentStageIndex: number;
  totalStages: number;
  stageLabel: string;
  ageRange: string;
  currentEventNumber: number;
  totalEventCount: number;
}

export default function StageProgress({
  currentStageIndex,
  totalStages,
  stageLabel,
  ageRange,
  currentEventNumber,
  totalEventCount,
}: StageProgressProps) {
  const progressPercent = ((currentStageIndex + 1) / totalStages) * 100;

  return (
    <div className="w-full bg-gray-950/95 px-4 py-3 md:py-4 border-b border-gray-900 sticky top-[57px] z-40 backdrop-blur-md">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-3">
          <div className="flex flex-col gap-1">
            <span className="text-[11px] font-bold tracking-widest text-amber-500 uppercase">
              STAGE {currentStageIndex + 1} / {totalStages}
            </span>
            <h2 className="text-2xl md:text-3xl font-black tracking-tight text-gray-100 leading-none">
              {stageLabel}
            </h2>
          </div>
          <div className="flex items-center gap-2 sm:flex-col sm:items-end sm:gap-1">
            <span className="text-base md:text-lg font-black text-transparent bg-clip-text bg-gradient-to-r from-rose-300 to-amber-300">
              {ageRange}
            </span>
            {totalEventCount > 0 && (
              <span className="text-[11px] font-bold text-gray-500">
                質問 {currentEventNumber} / {totalEventCount}
              </span>
            )}
          </div>
        </div>

        {/* 進捗バー */}
        <div className="w-full h-1.5 bg-gray-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-amber-500 via-rose-500 to-purple-600 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>
    </div>
  );
}
