/**
 * 아이콘 svg의 접근성 속성을 title 유무로 분기한다.
 * - title 전달: role="img" (사용처에서 <title> 자식도 함께 렌더)
 * - title 미전달: aria-hidden 처리하여 스크린리더에서 감춤
 * 두 경우 모두 키보드 포커스 대상에서 제외한다.
 */
export function iconA11y(title?: string) {
  if (title) {
    return { role: 'img' as const, focusable: false as const };
  }
  return { 'aria-hidden': true as const, focusable: false as const };
}
