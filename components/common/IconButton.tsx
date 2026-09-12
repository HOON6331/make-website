import type { ReactNode } from 'react';

// 라벨을 아이콘 기준 어디에 둘지 (hidden은 시각적으로 숨기고 aria-label로만 노출)
type LabelPosition = 'right' | 'bottom' | 'hidden';

interface IconButtonProps {
  /** 버튼에 표시할 아이콘 (components/common/icons의 인라인 SVG 등) */
  icon: ReactNode;
  /** 버튼의 의미를 나타내는 라벨. labelPosition이 hidden이어도 접근성 이름으로 쓰인다 */
  label: string;
  /**
   * 라벨 배치 (기본값: right)
   * - right: 아이콘 오른쪽에 가시 라벨 (가로 배치)
   * - bottom: 아이콘 아래에 가시 라벨 (세로 배치 — 헤더 예약확인/찜)
   * - hidden: 라벨을 sr-only로 숨김. 이때 aria-label(없으면 label)이 반드시 부여된다 (캐러셀 컨트롤 등)
   */
  labelPosition?: LabelPosition;
  /** 클릭 콜백. 호출부(클라이언트 컴포넌트)에서 전달하며, 미전달 시 아무 동작도 하지 않는다 */
  onClick?: () => void;
  /** 접근성 이름을 label과 다르게 지정할 때 사용. 전달 시 aria-label로 우선 적용된다 */
  ariaLabel?: string;
  /** 추가 Tailwind 클래스 (색상 오버라이드, 여백 등) */
  className?: string;
}

// labelPosition별 flex 방향 + 아이콘-라벨 간격
const layoutClassMap: Record<LabelPosition, string> = {
  right: 'flex-row gap-1.5',
  bottom: 'flex-col gap-1',
  hidden: 'flex-row',
};

/**
 * 아이콘 + 라벨 버튼의 표준 컴포넌트.
 * 세로 배치(라벨 표시)와 아이콘 전용(라벨 숨김) 사용처를 모두 지원한다. (docs/ui-analysis.md)
 * 상태를 갖지 않으며 onClick은 호출부에서 주입한다. hidden일 때는 aria-label(없으면 label)이 항상 부여된다.
 */
export function IconButton({
  icon,
  label,
  labelPosition = 'right',
  onClick,
  ariaLabel,
  className,
}: IconButtonProps) {
  const isHidden = labelPosition === 'hidden';
  // hidden이면 접근성 이름이 시각 라벨로 노출되지 않으므로 aria-label을 강제한다
  const resolvedAriaLabel = isHidden ? (ariaLabel ?? label) : ariaLabel;

  // 44x44 터치 타깃 + hover/focus 상태 스타일 (디자인 토큰만 사용)
  const classes = [
    'inline-flex min-h-11 min-w-11 items-center justify-center text-body transition-colors',
    'hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
    layoutClassMap[labelPosition],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button type="button" onClick={onClick} aria-label={resolvedAriaLabel} className={classes}>
      {icon}
      <span className={isHidden ? 'sr-only' : 'text-[11px] leading-none'}>{label}</span>
    </button>
  );
}
