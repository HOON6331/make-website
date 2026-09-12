import type { IconProps } from './types';
import { iconA11y } from './a11y';

/** 알림 벨 — 이벤트/알림 배너 (stroke) */
export function BellIcon({ className, size = 24, title }: IconProps) {
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
      <path d="M18 8.5a6 6 0 1 0-12 0c0 5.25-2.25 6.75-2.25 6.75h16.5S18 13.75 18 8.5z" />
      <path d="M13.75 19a2 2 0 0 1-3.5 0" />
    </svg>
  );
}
