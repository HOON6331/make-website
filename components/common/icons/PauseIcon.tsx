import type { IconProps } from './types';
import { iconA11y } from './a11y';

/** 일시정지 — 히어로 자동재생 토글 (fill) */
export function PauseIcon({ className, size = 24, title }: IconProps) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      {...iconA11y(title)}
    >
      {title ? <title>{title}</title> : null}
      <path d="M6.5 5h3.5v14H6.5zM14 5h3.5v14H14z" />
    </svg>
  );
}
