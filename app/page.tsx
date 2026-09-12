import { AlertSignupBanner } from '@/components/banner/AlertSignupBanner';
import { HeroCarousel } from '@/components/hero/HeroCarousel';
import { GlobalNav } from '@/components/layout/GlobalNav';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { TopUtilityBar } from '@/components/layout/TopUtilityBar';
import { TimeDealSection } from '@/components/promotion/TimeDealSection';

/**
 * 메인 페이지.
 * PRD 3장 레이아웃 순서(A~G)대로 섹션 컴포넌트를 조립한다.
 * - 상단 3개(유틸리티 바 / 헤더 / GNB): 각자 header·nav 시맨틱을 보유
 * - 히어로 캐러셀 ~ 알림 배너: <main>
 * - 푸터: SiteFooter 내부에서 <footer> 렌더
 * 클라이언트 컴포넌트는 상호작용이 필요한 SiteHeader(검색 토글)·HeroCarousel·CountdownTimer뿐이다.
 */
export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <TopUtilityBar />
      <SiteHeader />
      <GlobalNav />

      <main className="flex-1">
        <HeroCarousel />
        <TimeDealSection />
        <AlertSignupBanner />
      </main>

      <SiteFooter />
    </div>
  );
}
