// 표시용 포맷 유틸 모음

/**
 * 숫자를 천 단위 콤마 형식의 문자열로 변환한다.
 * 예: 1499000 -> "1,499,000"
 */
export function formatPrice(value: number): string {
  return value.toLocaleString('ko-KR');
}
