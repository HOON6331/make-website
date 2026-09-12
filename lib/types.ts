// 여러 컴포넌트가 공유하는 공용 타입 정의
// 필드명은 코드 표준(영어 camelCase)을 따르고, 설명 주석은 한국어로 작성한다.
import type { StaticImageData } from 'next/image';

/**
 * 나라별 히어로 슬라이드 데이터 타입 (PRD 4.D.3 스키마와 1:1 일치)
 * 사용처: lib/heroSlides.ts, components/hero/*
 */
export interface HeroSlide {
  /** 고유 id */
  id: number;
  /** 나라명 (예: "일본") */
  country: string;
  /** 상단 소제목 (예: "황금 가을에 만나는") */
  subtitle: string;
  /** 메인 카피 (예: "일본의 숨은 아지트") */
  title: string;
  /**
   * 광고 이미지.
   * - `src/img/*` 정적 import 결과(StaticImageData) 또는 `public/` 기준 경로 문자열
   * - 미확보 시 빈 문자열 → HeroSlide가 그라데이션 + 나라명 플레이스홀더를 렌더
   */
  imageUrl: string | StaticImageData;
  /** 대체 텍스트 (의미 있는 설명, 장식용이면 빈 문자열) */
  alt: string;
}

/**
 * 타임특가 상품 카드 데이터 타입
 * 사용처: lib/timeDeals.ts, components/promotion/*
 */
export interface TimeDeal {
  /** 고유 id */
  id: number;
  /** 나라명 (예: "대만") */
  country: string;
  /** 항공사 (예: "대한항공") */
  airline: string;
  /** 상품명 (예: "[마진포기] 대만 추석 전세기 4일") */
  name: string;
  /**
   * 상품 대표 이미지 (좌측 썸네일).
   * - `src/img/*` 정적 import 결과(StaticImageData) 또는 `public/` 기준 경로 문자열
   * - 미지정 시 TimeDealCard가 그라데이션 + 나라명 플레이스홀더를 렌더
   */
  imageUrl?: string | StaticImageData;
  /** 해시태그 목록 (예: ["#선착순 10명 초특가", "#대한항공"]) */
  hashtags: string[];
  /** 원가 (숫자, 표시 시 천 단위 콤마 포맷) */
  originalPrice: number;
  /** 할인가 (숫자, 표시 시 천 단위 콤마 포맷) */
  salePrice: number;
  /** 카운트다운 기본 표기 문자열 (예: "3일 00 : 56 : 25") */
  deadlineText: string;
  /** (선택) 종료 시각 ISO 문자열 — 1초 감소 타이머 옵션에서 사용 */
  endsAt?: string;
}

/**
 * 글로벌 내비게이션(GNB) 메뉴 항목 타입
 * 사용처: components/layout/GlobalNav.tsx
 */
export interface NavItem {
  /** 메뉴 라벨 (예: "패키지여행") */
  label: string;
  /** 링크 경로 — 이번 범위에서는 페이지 이동 없음("#") */
  href: string;
  /** (선택) 라벨 뒤에 붙는 이모지 (예: "✈️") */
  emoji?: string;
}

/**
 * 상단 유틸리티 바 링크 항목 타입
 * 사용처: components/layout/TopUtilityBar.tsx
 */
export interface UtilityLink {
  /** 링크 라벨 (예: "로그인") */
  label: string;
  /** 링크 경로 — no-op("#") */
  href: string;
}

/**
 * 카운트다운 타이머 동작 모드
 * - 'static': 전달된 고정 텍스트를 그대로 표시 (기본값)
 * - 'countdown': 1초 간격으로 남은 시간을 감소 표시
 * 사용처: components/promotion/CountdownTimer.tsx
 */
export type CountdownMode = 'static' | 'countdown';
