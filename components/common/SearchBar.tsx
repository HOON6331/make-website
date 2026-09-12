'use client';

import { useState, type FormEvent } from 'react';
import { SearchIcon } from '@/components/common/icons';

interface SearchBarProps {
  /** 추가 Tailwind 클래스 (반응형 폭 확장 등) */
  className?: string;
}

/**
 * 헤더 중앙의 pill 검색바 (비활성).
 * 입력값은 로컬 state로만 보관하며, submit 시 preventDefault로 막아
 * 검색 실행·자동완성·라우팅·외부 전달을 전혀 하지 않는다. (docs/ui-analysis.md)
 */
export function SearchBar({ className }: SearchBarProps) {
  const [query, setQuery] = useState('');

  // 제출을 가로채 아무 동작도 하지 않는다 (페이지 이동/새로고침 방지)
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  // 기본 pill 스타일 + 호출부 클래스 결합 (Container 패턴 재사용)
  const classes = ['flex h-10 items-center rounded-full bg-field pl-5 pr-1', className]
    .filter(Boolean)
    .join(' ');

  return (
    <form role="search" onSubmit={handleSubmit} className={classes}>
      <input
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="여행 상품 검색"
        aria-label="여행 상품 검색"
        className="min-w-0 flex-1 bg-transparent text-sm text-body outline-none placeholder:text-muted"
      />
      <button
        type="submit"
        aria-label="검색"
        className="ml-1 inline-flex h-8 w-9 items-center justify-center rounded-lg bg-primary text-white"
      >
        <SearchIcon size={18} className="text-white" />
      </button>
    </form>
  );
}
