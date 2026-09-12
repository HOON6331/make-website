import Image from 'next/image';
import { Badge } from '@/components/common/Badge';
import { CountdownTimer } from '@/components/promotion/CountdownTimer';
import { formatPrice } from '@/lib/format';
import type { TimeDeal } from '@/lib/types';

interface TimeDealCardProps {
  /** 렌더할 특가 상품 데이터 */
  deal: TimeDeal;
}

/**
 * 가로형 타임특가 상품 카드.
 * 좌측 이미지 + 우측 정보(라벨/상품명/해시태그/가격/자세히보기/카운트다운)로 구성한다.
 * `자세히보기`는 no-op이며, 모바일에서는 이미지 위 / 정보 아래로 세로 스택된다. (PRD 4.E / 6장)
 */
export function TimeDealCard({ deal }: TimeDealCardProps) {
  return (
    <article className="flex flex-col gap-4 rounded-xl border border-line bg-white p-5 shadow-sm sm:flex-row sm:gap-6">
      {/* 좌측: 상품 이미지 (미확보 시 그라데이션 + 나라명 플레이스홀더) */}
      {/* 모바일은 16:10 비율, 데스크톱은 높이를 220px로 고정해 우측 정보와 균형을 맞춘다 */}
      <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden rounded-lg bg-gradient-to-br from-primary/70 to-strong/70 sm:aspect-auto sm:h-[220px] sm:w-2/5">
        {deal.imageUrl ? (
          <Image
            src={deal.imageUrl}
            alt={`${deal.country} ${deal.name} 대표 이미지`}
            fill
            sizes="(max-width: 639px) 100vw, 40vw"
            className="object-cover"
            // 정적 import(StaticImageData)일 때만 blur 프리뷰 사용 (문자열 경로는 blurDataURL이 없어 제외)
            placeholder={typeof deal.imageUrl === 'object' ? 'blur' : 'empty'}
          />
        ) : (
          <div
            className="flex h-full w-full items-center justify-center"
            role="img"
            aria-label={`${deal.country} ${deal.name} 대표 이미지`}
          >
            <span className="text-xl font-bold text-white/90">{deal.country}</span>
          </div>
        )}
      </div>

      {/* 우측: 정보 영역 */}
      <div className="flex min-w-0 flex-1 flex-col gap-2">
        <div className="flex items-center gap-1.5">
          <Badge>{deal.country}</Badge>
          <span aria-hidden="true" className="text-muted">
            ·
          </span>
          <Badge>{deal.airline}</Badge>
        </div>

        <h3 className="text-[17px] font-bold text-strong">{deal.name}</h3>

        <div className="flex flex-wrap gap-x-2 gap-y-1">
          {deal.hashtags.map((tag) => (
            <Badge key={tag} variant="tag">
              {tag}
            </Badge>
          ))}
        </div>

        <div className="mt-1 flex flex-wrap items-end gap-x-3 gap-y-1">
          <span className="text-[13px] text-muted line-through">
            {formatPrice(deal.originalPrice)}원
          </span>
          <span className="text-xl font-bold text-sale">{formatPrice(deal.salePrice)}원~</span>
          <button
            type="button"
            className="ml-auto rounded-lg border border-line px-3.5 py-2 text-[13px] text-body transition-colors hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          >
            자세히보기
          </button>
        </div>

        <CountdownTimer mode="static" staticText={deal.deadlineText} className="mt-2" />
      </div>
    </article>
  );
}
