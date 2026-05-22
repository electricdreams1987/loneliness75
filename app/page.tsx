'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import StartScreen from '@/components/StartScreen';

export default function Home() {
  const router = useRouter();

  const handleStart = () => {
    router.push('/game');
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 flex flex-col font-sans selection:bg-rose-900/60 selection:text-rose-100">
      <Header />
      <main className="flex-1 flex items-center justify-center">
        <StartScreen onStart={handleStart} />
      </main>
      <footer className="py-6 text-center border-t border-gray-900 text-xs text-gray-600 font-medium">
        &copy; {new Date().getFullYear()} 75歳の孤独 -老後の人生シミュレーター- MVP. All rights reserved.
      </footer>
    </div>
  );
}

