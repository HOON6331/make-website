import type { IconProps } from './types';
import { iconA11y } from './a11y';

/** 오른쪽 화살표 — 캐러셀 다음 (stroke) */
export function ChevronRightIcon({ className, size = 24, title }: IconProps) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
      {...iconA11y(title)}
    >
      {title ? <title>{title}</title> : null}
      <path d="M9 5l7 7-7 7" />
    </svg>
  );
}
