import type { IconProps } from './types';
import { iconA11y } from './a11y';

/** 문서 + 체크 — 헤더 "예약확인" (stroke) */
export function BookmarkCheckIcon({ className, size = 24, title }: IconProps) {
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
      <path d="M14 2.75H6.5A1.75 1.75 0 0 0 4.75 4.5v15a1.75 1.75 0 0 0 1.75 1.75h11a1.75 1.75 0 0 0 1.75-1.75V8.5z" />
      <path d="M14 2.75V8.5h5.25" />
      <path d="M8.75 13.5l2.25 2.25 4.25-4.5" />
    </svg>
  );
}
