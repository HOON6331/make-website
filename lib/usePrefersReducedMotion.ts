'use client';

import { useSyncExternalStore } from 'react';

// OS "동작 줄이기" 미디어 쿼리
const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';

// 미디어 쿼리 변경 구독 (useSyncExternalStore용) — 언마운트 시 해제 함수 반환
function subscribe(onChange: () => void): () => void {
  const mediaQuery = window.matchMedia(REDUCED_MOTION_QUERY);
  mediaQuery.addEventListener('change', onChange);
  return () => mediaQuery.removeEventListener('change', onChange);
}

// 클라이언트 현재 값
function getSnapshot(): boolean {
  return window.matchMedia(REDUCED_MOTION_QUERY).matches;
}

// 서버 렌더 시 기본값 (모션 허용으로 가정)
function getServerSnapshot(): boolean {
  return false;
}

/**
 * OS의 "동작 줄이기(prefers-reduced-motion: reduce)" 설정 여부를 반환하는 훅.
 * 히어로 캐러셀에서 자동 전환/슬라이드 애니메이션을 끄는 데 사용한다. (PRD 9장)
 * useSyncExternalStore로 외부 미디어 쿼리 상태를 구독하므로 effect 내 setState가 없다.
 */
export function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
