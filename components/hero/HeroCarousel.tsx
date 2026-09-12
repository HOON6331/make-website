'use client';

import { useEffect, useState } from 'react';
import { HeroControls } from '@/components/hero/HeroControls';
import { HeroSlide } from '@/components/hero/HeroSlide';
import { heroSlides } from '@/lib/heroSlides';
import { usePrefersReducedMotion } from '@/lib/usePrefersReducedMotion';

// 자동 전환 간격 (PRD 4.D.4: 3000ms)
const AUTOPLAY_INTERVAL_MS = 3000;

/**
 * 메인 히어로 캐러셀 (★ 핵심 기능).
 * - 중앙 활성 슬라이드 + 좌우 미리보기(coverflow) 레이아웃
 * - 3초 자동 전환 + 무한 순환, 호버 시 일시정지, 이전/다음/재생·정지 수동 조작
 * - 수동 조작 시 자동 타이머 리셋(activeIndex를 타이머 useEffect 의존성에 포함)
 * - prefers-reduced-motion 존중(자동 전환·트랜지션 비활성)
 * - 언마운트/의존성 변경 시 타이머 정리(cleanup)
 */
export function HeroCarousel() {
  const total = heroSlides.length;
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  const goToPrev = () => setActiveIndex((current) => (current - 1 + total) % total);
  const goToNext = () => setActiveIndex((current) => (current + 1) % total);
  const togglePlay = () => setIsPlaying((current) => !current);

  // 3초 자동 전환.
  // activeIndex가 의존성에 포함되므로, 수동 조작으로 인덱스가 바뀌면
  // 이전 타이머가 정리되고 새 타이머가 시작되어 "이동 시점부터 다시 3초"가 된다.
  // 정지 상태·호버 중·모션 최소화 설정이면 타이머를 가동하지 않는다.
  useEffect(() => {
    if (!isPlaying || isHovered || prefersReducedMotion) {
      return;
    }
    const timerId = window.setTimeout(() => {
      setActiveIndex((current) => (current + 1) % total);
    }, AUTOPLAY_INTERVAL_MS);
    return () => window.clearTimeout(timerId);
  }, [activeIndex, isPlaying, isHovered, prefersReducedMotion, total]);

  // 좌우 미리보기 인덱스 (무한 순환)
  const prevSlide = heroSlides[(activeIndex - 1 + total) % total];
  const activeSlide = heroSlides[activeIndex];
  const nextSlide = heroSlides[(activeIndex + 1) % total];

  // heroSlides는 비어 있지 않은 상수라 실제로는 항상 존재하지만,
  // noUncheckedIndexedAccess 타입 안전을 위해 방어적으로 처리한다.
  if (!prevSlide || !activeSlide || !nextSlide) {
    return null;
  }

  // 모션 최소화 설정 시 전환 애니메이션 제거(즉시 전환)
  const transitionClass = prefersReducedMotion
    ? ''
    : 'transition-transform duration-500 ease-in-out';
  const isAutoplaying = isPlaying && !prefersReducedMotion;

  // 슬라이드 3종 공통 배치: 무대 중앙 기준 폭 72%, 최대 1120px
  const slideBaseClass = 'absolute left-1/2 top-0 h-full w-[72%] max-w-[1120px]';

  return (
    <section
      aria-roledescription="carousel"
      aria-label="여행 목적지 광고"
      className="w-full overflow-hidden bg-white py-8"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* coverflow 무대: 활성 슬라이드는 중앙, 좌우 미리보기는 축소·딤 처리하여 가장자리만 노출 */}
      <div className="relative mx-auto h-[clamp(240px,40vw,440px)] w-full max-w-[1440px]">
        {/* 이전 미리보기 (태블릿↑에서만 노출) */}
        <div
          aria-hidden="true"
          className={`${slideBaseClass} z-0 hidden -translate-x-[128%] scale-[0.86] opacity-70 md:block ${transitionClass}`}
        >
          <HeroSlide slide={prevSlide} isActive={false} />
        </div>

        {/* 다음 미리보기 */}
        <div
          aria-hidden="true"
          className={`${slideBaseClass} z-0 hidden translate-x-[28%] scale-[0.86] opacity-70 md:block ${transitionClass}`}
        >
          <HeroSlide slide={nextSlide} isActive={false} />
        </div>

        {/* 활성 슬라이드 (모바일은 이 슬라이드만 풀폭) */}
        <div
          key={activeIndex}
          aria-roledescription="slide"
          aria-label={`${activeIndex + 1} / ${total}`}
          style={
            prefersReducedMotion ? undefined : { animation: 'heroSlideFade 500ms ease-in-out' }
          }
          className={`absolute left-0 right-0 top-0 z-10 mx-auto h-full origin-center md:left-1/2 md:right-auto md:mx-0 md:w-[72%] md:max-w-[1120px] md:-translate-x-1/2 ${transitionClass} ${
            isHovered && !prefersReducedMotion ? 'md:scale-[1.03] md:drop-shadow-2xl' : 'scale-100'
          }`}
        >
          <HeroSlide slide={activeSlide} isActive />
        </div>
      </div>

      <HeroControls
        activeIndex={activeIndex}
        total={total}
        isPlaying={isAutoplaying}
        onPrev={goToPrev}
        onNext={goToNext}
        onTogglePlay={togglePlay}
      />
    </section>
  );
}
