import { Container } from '@/components/common/Container';
import { MenuIcon } from '@/components/common/icons';
import { navItems, navSubItems } from '@/lib/navigation';

/**
 * 글로벌 내비게이션(GNB) 바.
 * 좌측 햄버거(전체 카테고리) + 주 메뉴, 우측 보조 메뉴로 구성한다. (docs/ui-analysis.md "Navigation")
 * 햄버거·메뉴 링크는 모두 no-op이며 hover 시 색 강조만 준다.
 * 모바일에서는 메뉴 줄이 가로 스크롤되어 본문 가로 스크롤을 만들지 않는다.
 */
export function GlobalNav() {
  return (
    <nav aria-label="주 메뉴" className="border-b border-line bg-white">
      <Container className="flex items-center gap-3 py-2.5">
        <button
          type="button"
          aria-label="전체 카테고리 열기"
          className="inline-flex shrink-0 items-center justify-center rounded-md border border-line p-1.5 text-body transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
        >
          <MenuIcon size={20} />
        </button>

        <div className="flex flex-1 items-center gap-5 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <ul className="flex items-center gap-5">
            {navItems.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className="inline-block whitespace-nowrap text-[15px] text-body transition-colors hover:text-primary"
                >
                  {item.label}
                  {item.emoji ? <span aria-hidden="true"> {item.emoji}</span> : null}
                </a>
              </li>
            ))}
          </ul>

          <ul className="ml-auto flex items-center gap-4">
            {navSubItems.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className="inline-block whitespace-nowrap text-[15px] text-body transition-colors hover:text-primary"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </nav>
  );
}
