import { Container } from '@/components/common/Container';
import type { UtilityLink } from '@/lib/types';

// 푸터 정책 링크 (비활성 no-op)
const policyLinks: UtilityLink[] = [
  { label: '이용약관', href: '#' },
  { label: '개인정보처리방침', href: '#' },
];

// 더미 회사 정보 — 실제 서비스에서 실제 값으로 교체한다.
const companyInfoLines: string[] = [
  '상호 (주)테스트트래벌  |  대표 홍길동',
  '주소 서울특별시 중구 세종대로 000, 10층',
  '사업자등록번호 000-00-00000  |  통신판매업신고 제2026-서울중구-0000호',
];

/**
 * 레퍼런스 디자인에는 없는 최소 구성의 기본 푸터.
 * 더미 회사 정보 + 정책 링크(비활성) + 카피라이트로 페이지 완성도를 높인다.
 * 데스크톱은 가로, 모바일은 세로로 정렬한다.
 */
export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-subtle">
      <Container className="flex flex-col gap-4 py-10 text-[13px] text-sub md:flex-row md:items-start md:justify-between">
        <div className="flex flex-col gap-1.5">
          <span className="text-sm font-semibold text-body">TEST TRAVEL</span>
          {companyInfoLines.map((line) => (
            <span key={line}>{line}</span>
          ))}
          <span className="mt-2 text-muted">© 2026 TEST TRAVEL. All rights reserved.</span>
        </div>

        <nav aria-label="푸터 정책 링크">
          <ul className="flex items-center gap-4">
            {policyLinks.map((link) => (
              <li key={link.label}>
                <a href={link.href} className="transition-colors hover:text-body">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
    </footer>
  );
}
