import type { IconProps } from './types';
import { iconA11y } from './a11y';

/** 서비스 로고 심볼 — 단색 채움(fill) 종이비행기 마크 */
export function PlaneIcon({ className, size = 24, title }: IconProps) {
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
      <path d="M2 21l20-9L2 3v7l14 2-14 2v7z" />
    </svg>
  );
}
