import type { ReactNode } from 'react';

// Container가 렌더링할 수 있는 시맨틱 태그 종류
type ContainerElement = 'div' | 'section' | 'header' | 'footer' | 'nav';

interface ContainerProps {
  /** 내부 콘텐츠 */
  children: ReactNode;
  /** 추가 Tailwind 클래스 (배경색, 세로 여백 등) */
  className?: string;
  /** 렌더링할 시맨틱 태그 (기본값: div) */
  as?: ContainerElement;
}

/**
 * 페이지 공통 최대폭 컨테이너.
 * 콘텐츠를 중앙 정렬하고 좌우 최소 16px 여백을 유지한다. (PRD 5·6장)
 * 상태가 없는 순수 표현 컴포넌트이므로 서버 컴포넌트로 둔다.
 */
export function Container({ children, className, as = 'div' }: ContainerProps) {
  const Tag = as;
  // 기본 컨테이너 클래스 + 호출부에서 전달한 클래스를 단순 결합 (clsx 등 유틸 미도입)
  const classes = ['mx-auto w-full max-w-screen-xl px-4', className].filter(Boolean).join(' ');

  return <Tag className={classes}>{children}</Tag>;
}
