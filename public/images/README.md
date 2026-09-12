# 이미지 배치 규칙

실제 서비스 이미지가 준비되면 아래 경로/파일명 규칙에 맞춰 넣고,
`lib/heroSlides.ts` · `lib/timeDeals.ts`의 `imageUrl` 값을 채운다.
(값이 빈 문자열이면 각 컴포넌트가 그라데이션 + 텍스트 플레이스홀더를 렌더한다.)

## 히어로 캐러셀 나라별 광고 이미지 → `src/img/`

- 위치: 프로젝트 루트의 `src/img/` (정적 import 방식)
- 파일명: `<도시·지역영문소문자>.png` (예: `alps.png`, `danang-hoian.png`, `taipei.png`)
- 권장 비율: 약 21:9 (와이드), 최소 1600px 폭
- 사용: `lib/heroSlides.ts`에서 `import xxxImage from '@/src/img/xxx.png'` 후 `imageUrl: xxxImage`
  - 정적 import 시 `next/image`가 width/height/blur 프리뷰를 빌드 타임에 자동 산출한다.

## hero/ — (구) public 경로 방식

- `imageUrl`에 `'/images/hero/japan.jpg'` 같은 문자열 경로도 그대로 사용 가능(타입: `string | StaticImageData`)

## deal/ — 타임특가 상품 대표 이미지

- 파일명: `<상품id>.jpg` (예: `1.jpg`)
- 권장 비율: 약 16:10
- 사용: `imageUrl: '/images/deal/1.jpg'`
