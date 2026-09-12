import { Container } from '@/components/common/Container';
import { TimeDealCard } from '@/components/promotion/TimeDealCard';
import { timeDeals } from '@/lib/timeDeals';

/**
 * 타임특가 프로모션 섹션 래퍼.
 * 섹션 제목 + 특가 카드 1개 + 정적 도트 인디케이터(2개)로 구성한다. (PRD 4.E)
 */
export function TimeDealSection() {
  const featuredDeal = timeDeals[0];

  // timeDeals는 비어 있지 않은 상수지만 noUncheckedIndexedAccess 대비 방어 처리
  if (!featuredDeal) {
    return null;
  }

  return (
    <section className="bg-white py-12 sm:py-16">
      <Container>
        <h2 className="mb-6 text-lg font-bold text-strong sm:text-xl">
          특가 종료 임박! <span aria-hidden="true">⚡</span> 마진포기 타임어택{' '}
          <span aria-hidden="true">⏰</span>
        </h2>

        <TimeDealCard deal={featuredDeal} />

        {/* 페이지 도트 — PRD 8장 기준 정적(비활성). 활성 1개 강조 + 비활성 1개 */}
        <div className="mt-5 flex items-center justify-center gap-2" aria-hidden="true">
          <span className="h-1.5 w-5 rounded-full bg-primary" />
          <span className="h-1.5 w-1.5 rounded-full bg-line" />
        </div>
      </Container>
    </section>
  );
}
