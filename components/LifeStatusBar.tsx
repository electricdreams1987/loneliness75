'use client';

import React from 'react';
import { BriefcaseBusiness, HeartPulse, Home, MapPin, Phone, Users } from 'lucide-react';
import { LifeStatus } from '@/types/game';

interface LifeStatusBarProps {
  lifeStatus: LifeStatus;
  compact?: boolean;
}

const maritalLabels: Record<LifeStatus['maritalStatus'], string> = {
  single: '独身',
  dating: '交際中',
  married: '既婚',
  divorced: '離婚',
  widowed: '死別',
};

const jobLabels: Record<LifeStatus['jobStatus'], string> = {
  student: '学生',
  employee: '会社員',
  manager: '管理職',
  executive: '役員',
  owner: '経営者',
  freelance: '自営',
  unemployed: '無職',
  retired: '退職',
};

const housingLabels: Record<LifeStatus['housingStatus'], string> = {
  withParents: '実家',
  alone: '一人暮らし',
  withPartner: 'パートナーと同居',
  withFamily: '家族同居',
  shared: 'シェア住まい',
  careFacility: '施設',
};

export function formatLifeStatus(lifeStatus: LifeStatus): string[] {
  return [
    `${lifeStatus.age}歳`,
    maritalLabels[lifeStatus.maritalStatus],
    `子ども${lifeStatus.childrenCount}人`,
    jobLabels[lifeStatus.jobStatus],
    housingLabels[lifeStatus.housingStatus],
    `健康${lifeStatus.healthLabel}`,
    lifeStatus.hasLocalCommunity ? '地域あり' : '地域なし',
    lifeStatus.hasEmergencyContact ? '緊急連絡先あり' : '緊急連絡先なし',
  ];
}

export default function LifeStatusBar({ lifeStatus, compact = false }: LifeStatusBarProps) {
  const chips = [
    { icon: Users, label: `${lifeStatus.age}歳`, tone: 'text-amber-200 border-amber-900/50 bg-amber-950/20' },
    { icon: Users, label: maritalLabels[lifeStatus.maritalStatus], tone: 'text-rose-200 border-rose-900/50 bg-rose-950/20' },
    { icon: Users, label: `子ども${lifeStatus.childrenCount}人`, tone: 'text-sky-200 border-sky-900/50 bg-sky-950/20' },
    { icon: BriefcaseBusiness, label: jobLabels[lifeStatus.jobStatus], tone: 'text-violet-200 border-violet-900/50 bg-violet-950/20' },
    { icon: Home, label: housingLabels[lifeStatus.housingStatus], tone: 'text-gray-200 border-gray-700 bg-gray-900/50' },
    { icon: HeartPulse, label: `健康${lifeStatus.healthLabel}`, tone: 'text-emerald-200 border-emerald-900/50 bg-emerald-950/20' },
    { icon: MapPin, label: lifeStatus.hasLocalCommunity ? '地域あり' : '地域なし', tone: 'text-cyan-200 border-cyan-900/50 bg-cyan-950/20' },
    { icon: Phone, label: lifeStatus.hasEmergencyContact ? '緊急連絡先あり' : '緊急連絡先なし', tone: 'text-lime-200 border-lime-900/50 bg-lime-950/20' },
  ];

  return (
    <section className={`${compact ? '' : 'sticky top-2 z-20'} rounded-2xl border border-gray-800 bg-gray-950/90 shadow-xl shadow-black/30 backdrop-blur ${compact ? 'p-3' : 'p-3 md:p-4'}`}>
      <div className="flex flex-wrap gap-2">
        {chips.map(({ icon: Icon, label, tone }) => (
          <span
            key={label}
            className={`inline-flex min-h-8 items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-black leading-none ${tone}`}
          >
            <Icon className="h-3.5 w-3.5 shrink-0" />
            {label}
          </span>
        ))}
      </div>
    </section>
  );
}
