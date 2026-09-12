/**
 * 인라인 SVG 아이콘 공통 props.
 * 모든 아이콘은 이 인터페이스를 사용하며, 색상은 `currentColor`로 부모에서 상속한다.
 */
export interface IconProps {
  /** svg 요소에 그대로 전달되는 추가 클래스 (색상은 text-* 유틸로 제어) */
  className?: string;
  /** 아이콘 한 변의 px 크기 (width·height 동시 적용, 기본값 24) */
  size?: number;
  /** 접근성 이름. 전달 시 role="img" + <title>, 미전달 시 장식용(aria-hidden) */
  title?: string;
}
