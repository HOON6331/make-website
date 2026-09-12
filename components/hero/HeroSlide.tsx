import Image from 'next/image';
import type { HeroSlide as HeroSlideType } from '@/lib/types';

interface HeroSlideProps {
  /** 렌더할 슬라이드 데이터 */
  slide: HeroSlideType;
  /** 현재 활성(중앙) 슬라이드 여부 — 카피 오버레이·딤 강도를 분기한다 */
  isActive: boolean;
}

// 이미지 미확보 시 사용하는 나라별 공통 배경 그라데이션 (Task 16 플레이스홀더 전략)
const placeholderGradient = 'bg-gradient-to-br from-primary/80 via-primary/55 to-strong/75';

/**
 * 개별 히어로 슬라이드(이미지 + 카피 오버레이)를 렌더하는 순수 표현 컴포넌트.
 * 위치·확대·트랜지션 등 레이아웃 제어는 상위 HeroCarousel이 담당한다. (docs/travelROADMAP.md Task 17)
 */
export function HeroSlide({ slide, isActive }: HeroSlideProps) {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-xl bg-subtle sm:rounded-2xl">
      {slide.imageUrl ? (
        <Image
          src={slide.imageUrl}
          alt={slide.alt}
          fill
          sizes="(max-width: 767px) 100vw, (max-width: 1279px) 90vw, 1280px"
          className="object-cover"
          priority={isActive}
          // 정적 import(StaticImageData)일 때만 blur 프리뷰 사용 (문자열 경로는 blurDataURL이 없어 제외)
          placeholder={typeof slide.imageUrl === 'object' ? 'blur' : 'empty'}
        />
      ) : (
        // 이미지가 없을 때: 그라데이션 배경 + (측면 슬라이드에 한해) 나라명 워터마크
        // 슬라이드마다 색상(hue)을 달리해 이미지 없이도 coverflow가 패널로 구분되게 한다.
        <div
          className={`flex h-full w-full items-center justify-center ${placeholderGradient}`}
          style={{ filter: `hue-rotate(${(slide.id * 47) % 360}deg)` }}
          role="img"
          aria-label={slide.alt}
        >
          {!isActive ? (
            <span className="text-2xl font-bold text-white/70 sm:text-3xl">{slide.country}</span>
          ) : null}
        </div>
      )}

      {isActive ? (
        <>
          {/* 카피 가독성을 위한 딤 그라데이션 (WCAG AA 대비 확보) */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/25 to-black/10" />
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 px-6 text-center">
            <p className="text-sm font-normal text-white drop-shadow-md sm:text-base">
              {slide.subtitle}
            </p>
            <p className="text-2xl font-bold text-white drop-shadow-md sm:text-4xl">
              {slide.title}
            </p>
          </div>
        </>
      ) : (
        // 측면 미리보기 슬라이드: 텍스트 생략 + 딤 처리
        <div className="absolute inset-0 bg-black/30" />
      )}
    </div>
  );
}
