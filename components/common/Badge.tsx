import type { ReactNode } from 'react';

// Badge가 지원하는 표기 유형
type BadgeVariant = 'text' | 'country' | 'tag' | 'neutral';

interface BadgeProps {
  /** 뱃지에 표시할 텍스트 (아이콘·이미지는 호출부에서 별도 배치) */
  children: ReactNode;
  /**
   * 표기 유형 (기본값: text)
   * - text: 무배경/무테두리 보조 라벨. 국가명·항공사명 등 (레퍼런스 기본형)
   * - country: 무배경 소폭 강조. 국가명을 브랜드 컬러로 부각할 때 (선택적)
   * - tag: 무배경 흐린 텍스트. 해시태그 나열용
   * - neutral: 옅은 배경 + 테두리 칩형. ROADMAP 대응 (레퍼런스에는 없음)
   */
  variant?: BadgeVariant;
  /** 추가 Tailwind 클래스 (간격 조정 등) */
  className?: string;
}

// variant별 스타일 (디자인 토큰만 사용, docs/ui-analysis.md "Badge 수치" 반영)
// 대비 주의: 무배경 text-muted(#9ca3af)는 13px 이하 보조 정보에만 사용하고,
// 그 외 텍스트는 text-sub(#6b7280) 이상으로 WCAG AA 대비를 확보한다.
const variantClassMap: Record<BadgeVariant, string> = {
  text: 'text-[13px] text-sub',
  country: 'text-[13px] font-medium text-primary',
  tag: 'text-[13px] text-muted',
  neutral: 'rounded-md border border-line bg-subtle px-2 py-0.5 text-xs text-body',
};

/**
 * 라벨 표기용 재사용 뱃지.
 * 국가명·해시태그·항공사명 등 짧은 라벨을 일관된 타이포로 렌더한다. (docs/ui-analysis.md)
 * 상태가 없는 순수 표현 컴포넌트이므로 서버 컴포넌트로 둔다.
 */
export function Badge({ children, variant = 'text', className }: BadgeProps) {
  // 기본 클래스 + variant 클래스 + 호출부 클래스를 단순 결합 (Container 패턴 재사용, clsx 미도입)
  const classes = ['inline-flex items-center', variantClassMap[variant], className]
    .filter(Boolean)
    .join(' ');

  return <span className={classes}>{children}</span>;
}
