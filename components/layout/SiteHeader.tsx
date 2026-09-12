'use client';

import { useState } from 'react';
import { Container } from '@/components/common/Container';
import { SearchBar } from '@/components/common/SearchBar';
import { IconButton } from '@/components/common/IconButton';
import { BookmarkCheckIcon, HeartIcon, PlaneIcon, SearchIcon } from '@/components/common/icons';

/**
 * 로고 + 검색바 + 우측 아이콘(예약확인/찜)으로 구성된 메인 헤더.
 * sticky 고정하지 않는 정적 배치이며, 로고/아이콘 동작은 모두 no-op이다. (docs/ui-analysis.md "메인 헤더")
 * 모바일에서는 검색바를 숨기고, 검색 아이콘 토글로 헤더 아래 줄에 펼친다(로컬 상태).
 */
export function SiteHeader() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <header className="border-b border-line bg-white">
      <Container className="flex items-center gap-4 py-3">
        {/* 좌측: 로고 (no-op) */}
        <a href="#" className="flex shrink-0 items-center gap-2" aria-label="TEST TRAVEL 홈">
          <PlaneIcon size={26} className="text-primary" />
          <span className="text-xl font-bold tracking-tight text-strong">TEST TRAVEL</span>
        </a>

        {/* 중앙: 검색바 (데스크톱) */}
        <div className="hidden flex-1 justify-center md:flex">
          <SearchBar className="w-full max-w-[420px]" />
        </div>

        {/* 우측: 모바일 검색 토글 + 예약확인/찜 */}
        <div className="ml-auto flex items-center gap-1 md:ml-0">
          <IconButton
            icon={<SearchIcon size={22} />}
            label={isSearchOpen ? '검색창 닫기' : '검색창 열기'}
            labelPosition="hidden"
            onClick={() => setIsSearchOpen((prev) => !prev)}
            className="md:hidden"
          />
          <IconButton
            icon={<BookmarkCheckIcon size={22} />}
            label="예약확인"
            labelPosition="bottom"
          />
          <IconButton icon={<HeartIcon size={22} />} label="찜" labelPosition="bottom" />
        </div>
      </Container>

      {/* 모바일: 토글로 펼쳐지는 검색바 줄 */}
      {isSearchOpen ? (
        <Container className="pb-3 md:hidden">
          <SearchBar />
        </Container>
      ) : null}
    </header>
  );
}
