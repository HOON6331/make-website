import type { IconProps } from './types';
import { iconA11y } from './a11y';

/** 빈 하트 — 헤더 "찜" (stroke, 채움 없음) */
export function HeartIcon({ className, size = 24, title }: IconProps) {
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
      <path d="M12 20.7l-1.45-1.32C5.4 14.7 2 11.62 2 7.84 2 4.76 4.42 2.34 7.5 2.34c1.74 0 3.41.81 4.5 2.09 1.09-1.28 2.76-2.09 4.5-2.09 3.08 0 5.5 2.42 5.5 5.5 0 3.78-3.4 6.86-8.55 11.55L12 20.7z" />
    </svg>
  );
}
