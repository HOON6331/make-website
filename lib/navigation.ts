// 레이아웃(상단 유틸리티 바 / GNB)에서 사용하는 내비게이션 상수 모음
// 실제 서비스에서 라우팅을 붙일 때 href만 교체하면 되도록 데이터와 렌더를 분리한다.
import type { NavItem, UtilityLink } from '@/lib/types';

/** 상단 유틸리티 바 우측 링크 (현재는 모두 no-op) */
export const utilityLinks: UtilityLink[] = [
  { label: '로그인', href: '#' },
  { label: '멤버십가입', href: '#' },
  { label: '고객센터', href: '#' },
];

/** GNB 주 메뉴 (좌측 정렬) */
export const navItems: NavItem[] = [
  { label: 'THE 팩', href: '#' },
  { label: '패키지여행', href: '#' },
  { label: '전세기', href: '#' },
  { label: '에어텔', href: '#' },
  { label: '항공', href: '#', emoji: '✈️' },
  { label: '호텔', href: '#', emoji: '🏨' },
];

/** GNB 보조 메뉴 (우측 정렬) */
export const navSubItems: NavItem[] = [
  { label: '기획전', href: '#' },
  { label: '이벤트', href: '#' },
];
