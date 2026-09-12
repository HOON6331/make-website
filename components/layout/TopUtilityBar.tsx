import { Container } from '@/components/common/Container';
import { utilityLinks } from '@/lib/navigation';

/**
 * 페이지 최상단 유틸리티 바.
 * 좌측 파트너 워드마크 + 우측 보조 링크(로그인/멤버십가입/고객센터)로 구성한다.
 * 모든 링크는 이번 범위에서 동작하지 않는 no-op이다. (docs/ui-analysis.md "유틸리티 바")
 * 모바일(~639px)에서는 공간 확보를 위해 숨긴다.
 */
export function TopUtilityBar() {
  return (
    <div className="hidden border-b border-line bg-white sm:block">
      <Container className="flex items-center justify-between py-1.5 text-[12px] text-sub">
        <span className="font-semibold tracking-wide">KALPAK</span>
        <nav aria-label="유틸리티 메뉴">
          <ul className="flex items-center gap-4">
            {utilityLinks.map((link) => (
              <li key={link.label}>
                <a href={link.href} className="transition-colors hover:text-body">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
    </div>
  );
}
