'use client';

import React from 'react';

interface StageProgressProps {
  currentStageIndex: number;
  totalStages: number;
  stageLabel: string;
  ageRange: string;
}

export default function StageProgress({
  currentStageIndex,
  totalStages,
  stageLabel,
  ageRange,
}: StageProgressProps) {
  const progressPercent = ((currentStageIndex + 1) / totalStages) * 100;

  return (
    <div className="w-full bg-gray-950 px-4 py-3 border-b border-gray-900 sticky top-[57px] z-40">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-baseline mb-2">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold tracking-widest text-amber-500 uppercase">
              STAGE {currentStageIndex + 1} / {totalStages}
            </span>
            <h2 className="text-sm font-bold text-gray-200">
              {stageLabel}
            </h2>
          </div>
          <span className="text-xs font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-amber-400">
            {ageRange}
          </span>
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
