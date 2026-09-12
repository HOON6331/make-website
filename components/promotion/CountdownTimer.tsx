'use client';

import { useSyncExternalStore } from 'react';
import type { CountdownMode } from '@/lib/types';

interface CountdownTimerProps {
  /** 동작 모드 (기본값: static) */
  mode?: CountdownMode;
  /** static 모드에서 그대로 표시할 고정 텍스트 (예: "3일 00 : 56 : 25") */
  staticText?: string;
  /** countdown 모드에서 사용할 종료 시각 (ISO 문자열) */
  endsAt?: string;
  /** 추가 Tailwind 클래스 (여백 등) */
  className?: string;
}

// ── 1초 간격 공유 클럭 스토어 (useSyncExternalStore용) ──────────────────
// 렌더 중 Date.now()를 직접 호출하지 않기 위해, 시간 읽기를 외부 스토어로 분리한다.
// 구독자가 있을 때만 setInterval을 돌리고, 모두 해제되면 타이머를 정리한다(cleanup).
let clockNow = 0;
let clockIntervalId: number | null = null;
const clockListeners = new Set<() => void>();

function clockSubscribe(listener: () => void): () => void {
  clockListeners.add(listener);
  if (clockIntervalId === null) {
    clockNow = Date.now();
    clockIntervalId = window.setInterval(() => {
      clockNow = Date.now();
      clockListeners.forEach((notify) => notify());
    }, 1000);
  }
  return () => {
    clockListeners.delete(listener);
    if (clockListeners.size === 0 && clockIntervalId !== null) {
      window.clearInterval(clockIntervalId);
      clockIntervalId = null;
    }
  };
}

// 서버 렌더에서는 0을 반환하고, 이때는 항상 staticText를 표시해 하이드레이션 불일치를 피한다.
function clockGetServerSnapshot(): number {
  return 0;
}

function clockGetSnapshot(): number {
  return clockNow;
}

// 남은 밀리초를 "N일 HH : MM : SS" 형식 문자열로 변환한다.
function formatRemaining(ms: number): string {
  const totalSeconds = Math.floor(Math.max(0, ms) / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const pad = (value: number) => String(value).padStart(2, '0');
  return `${days}일 ${pad(hours)} : ${pad(minutes)} : ${pad(seconds)}`;
}

/**
 * 특가 카드 하단 카운트다운 바.
 * 기본은 전달받은 고정 텍스트를 그대로 보여주는 정적 목업이며(mode="static"),
 * mode="countdown" + endsAt을 주면 1초 간격으로 남은 시간을 감소 표시한다.
 * 시간 갱신은 공유 클럭 스토어가 담당하며 마지막 구독 해제 시 타이머를 정리한다. (PRD 4.D cleanup)
 */
export function CountdownTimer({
  mode = 'static',
  staticText = '',
  endsAt,
  className,
}: CountdownTimerProps) {
  const endTime = endsAt ? new Date(endsAt).getTime() : null;
  const now = useSyncExternalStore(clockSubscribe, clockGetSnapshot, clockGetServerSnapshot);

  // now === 0 은 서버 렌더/마운트 직전 상태 — 이때는 staticText로 폴백한다.
  const isCountingDown = mode === 'countdown' && endTime !== null && now !== 0;
  const displayText = isCountingDown ? formatRemaining(endTime - now) : staticText;

  const classes = [
    'flex h-10 items-center justify-center rounded-lg bg-notice text-sm font-bold tracking-wide text-strong',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classes} aria-label={`특가 마감까지 남은 시간 ${displayText}`}>
      <span aria-hidden="true">{displayText}</span>
    </div>
  );
}
