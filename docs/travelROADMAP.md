# TEST TRAVEL 메인 페이지 개발 로드맵 (ROADMAP)

> 기준 문서: `docs/travelPRD.md`
> 작성일: 2026-09-10
> 문서 언어: 한국어 / 식별자: 영어

---

## 0. 현재 프로젝트 상태

작업 시작 전 프로젝트 루트(`C:\Users\14ZB90Q\temp\myworkspace\make-website`)를 확인한 결과는 다음과 같다.

| 항목                                                                           | 상태                                                       |
| ------------------------------------------------------------------------------ | ---------------------------------------------------------- |
| `package.json`                                                                 | 없음                                                       |
| `README.md`                                                                    | 없음                                                       |
| `app/`                                                                         | 없음                                                       |
| `components/`                                                                  | 없음                                                       |
| `src/`                                                                         | 없음                                                       |
| `lib/`                                                                         | 없음                                                       |
| `public/`                                                                      | 없음                                                       |
| 설정 파일(`next.config.*`, `tsconfig.json`, `tailwind.config.*`, `.eslintrc*`) | 없음                                                       |
| 존재하는 것                                                                    | `docs/travelPRD.md`, `.claude/agents/*.md` (에이전트 정의) |

**결론: 완전한 그린필드(신규) 프로젝트다. PRD 대비 이미 구현된 기능은 없다.**
따라서 로드맵은 프로젝트 스캐폴딩부터 시작한다.

---

## 1. 요구사항 요약 (PRD 추출)

### 1.1 기능 요구사항

| 코드 | 영역                           | 핵심 내용                                                                                                                                                                                                                               | 동작 여부                                                                                                                                                                                                            |
| ---- | ------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| A    | 상단 유틸리티 바               | `KALPAK` 워드마크, `로그인/멤버십가입/고객센터` 링크 3개                                                                                                                                                                                | 링크 no-op / 모바일 숨김                                                                                                                                                                                             |
| B    | 헤더                           | 비행기 인라인 SVG 로고 + `TEST TRAVEL`, 중앙 pill 검색바(placeholder `여행 상품 검색`, 돋보기 버튼), 우측 `예약확인`/`찜` 아이콘                                                                                                        | 검색바 입력만 가능(submit preventDefault), 나머지 no-op, sticky 아님                                                                                                                                                 |
| C    | 글로벌 내비게이션(GNB)         | 햄버거 버튼 + 메뉴 `THE 팩/패키지여행/전세기/에어텔/항공 ✈️/호텔 🏨`, 우측 보조 `기획전/이벤트`                                                                                                                                         | 전부 no-op, hover 강조만                                                                                                                                                                                             |
| D    | **메인 히어로 캐러셀 (★핵심)** | coverflow 레이아웃(중앙 활성 + 좌우 미리보기 축소·투명), 카피 오버레이(소제목/큰 제목/딤), 하단 컨트롤 바(이전/`현재·전체` 인디케이터/다음/재생·정지/전체보기)                                                                          | 3초 자동 전환·무한 순환, 400~600ms 트랜지션, 호버 시 scale·shadow + 자동재생 일시정지, 수동 조작 시 타이머 리셋, 재생/정지 토글, `prefers-reduced-motion` 대응, 언마운트 시 타이머 해제. 전체보기(grid) 버튼만 no-op |
| E    | 타임특가 프로모션 섹션         | 제목 `특가 종료 임박! ⚡ 마진포기 타임어택 ⏰`, 가로형 상품 카드 1개(이미지 + 나라 뱃지·항공사 + 상품명 + 해시태그 + 원가 취소선·할인가 강조 + `자세히보기` 아웃라인 버튼 + 카운트다운 바 `3일 00 : 56 : 25`), 하단 도트 인디케이터 2개 | `자세히보기` no-op, 도트 정적, 카운트다운 기본 정적(옵션: 1초 감소)                                                                                                                                                  |
| F    | 알림 신청 배너                 | 옅은 배경 가로 배너, 아이콘 + 제목 `가격혜택찬스! 선착순 타임특가 알림신청`, 본문 안내, 우측 `바로 신청하기 >` 링크                                                                                                                     | 링크 no-op                                                                                                                                                                                                           |
| G    | 푸터                           | 디자인 미노출, 간단 기본형(회사 더미 정보, 이용약관/개인정보처리방침 비활성 링크, 카피라이트)                                                                                                                                           | 링크 no-op                                                                                                                                                                                                           |

### 1.2 비기능 요구사항

- **반응형 필수**: Mobile(~~639px) / Tablet(640~~1023px) / Desktop(1024px~). 좌우 최소 여백 16px, 본문 가로 스크롤 금지, `img { max-width: 100% }`.
- **접근성**: 의미 있는 `alt`(장식은 `alt=""`), 인터랙티브 요소는 `<button>`/`<a>` + 포커스 링 유지, 캐러셀 `aria-roledescription="carousel"` / 버튼 `aria-label` / 자동재생 정지 수단 제공 / `prefers-reduced-motion` 존중, 텍스트·배경 대비 WCAG AA 이상, Lighthouse 접근성·베스트프랙티스 90점 이상 지향.
- **품질**: `any` 타입 미사용, ESLint/TypeScript 에러 0, 콘솔 에러·경고 0, 타이머 cleanup 필수.
- **디자인 토큰**: Primary `#2563eb`, Point/Sale `#e11d48`, Text Strong `#111827` / Base `#374151` / Muted `#9ca3af`, Background `#ffffff`·`#f9fafb`, Border `#e5e7eb`, Radius `rounded-xl`(히어로 `rounded-2xl`), Shadow `shadow-md`~~`shadow-xl`, 최대 콘텐츠 폭 `max-w-screen-xl` 중앙 정렬, 섹션 간격 `py-12`~~`py-16`, 8px 배수 그리드.

### 1.3 기술 요구사항

- 프레임워크: **Next.js 16 (App Router)**
- 언어: **TypeScript** (`any` 금지), **React 19 함수형 컴포넌트**, 시맨틱 HTML
- 스타일: **Tailwind CSS**
- 폰트/아이콘: **시스템 폰트 + 이모지/인라인 SVG** (외부 아이콘 라이브러리 최소화)
- 상태관리: **로컬 컴포넌트 상태(useState/useEffect)만** 사용, 전역 상태 불필요
- 이미지: `next/image`, 자산은 `public/images/hero/`, `public/images/deal/` 하위
- 범위 제외: 상세/목록 페이지, API 연동, 백엔드, 인증, i18n, 다크모드, 상태관리 라이브러리, 폼 라이브러리

---

## 2. 확인 필요 / 추후 결정 사항

| #   | 항목                                                                   | 상태                    | 비고                                                                                                                                                                     |
| --- | ---------------------------------------------------------------------- | ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Q1  | 첨부 디자인 이미지 `c:\Users\14ZB90Q\Downloads\테스트트레벌.jpg`       | **확인 필요**           | 로드맵 단계에서 미확인. 실제 구현 시 픽셀 단위 레이아웃/간격/타이포 확정을 위해 반드시 참조하거나 `ui-analyzer`로 명세화 필요. 본 로드맵은 PRD 텍스트 기준으로만 작성됨. |
| Q2  | 전역 CLAUDE.md의 shadcn/ui · Zustand · React Hook Form + Zod 사용 지침 | **PRD 우선 적용(충돌)** | PRD는 "전역 상태 불필요", 해당 라이브러리들을 "향후 확장(Out of Scope)"으로 명시. 이번 범위에서는 도입하지 않음. 상충 시 사용자 확인 권장.                               |
| Q3  | 실제 히어로/특가 이미지 자산 확보 여부                                 | **추후 결정**           | 미확보 시 PRD 4.D.3에 따라 단색/그라데이션 + 나라명 텍스트 플레이스홀더로 진행.                                                                                          |
| Q4  | 히어로 슬라이드 개수                                                   | **추후 결정**           | 초기 6~8개로 시작, 목표 16개. 인디케이터 분모는 배열 길이로 자동 계산.                                                                                                   |
| Q5  | 특가 카운트다운 동작 방식                                              | 기본값 확정             | 기본은 정적 목업. 1초 감소 타이머는 선택 구현(옵션 prop).                                                                                                                |
| Q6  | 패키지 매니저                                                          | **추후 결정**           | 기본 `npm` 가정. 팀 표준이 있으면 교체.                                                                                                                                  |
| Q7  | 테스트 프레임워크(Jest/Vitest/Playwright) 도입                         | **추후 결정**           | PRD에 명시 없음. 이번 범위 QA는 수동 + Lighthouse 중심. E2E 필요 시 별도 논의.                                                                                           |
| Q8  | Next.js 16 정식 버전/의존성 호환성(React 19, Tailwind 버전)            | **확인 필요**           | 스캐폴딩 시점 최신 안정 버전 확인 후 고정. Tailwind v3/v4 여부에 따라 설정 파일 형식 상이.                                                                               |
| Q9  | 헤더 sticky 고정                                                       | 기본값 확정             | PRD상 고정 안 함. "선택적 개선 항목"으로만 표시(P3).                                                                                                                     |
| Q10 | 폰트 전략                                                              | 기본값 확정             | PRD 지침대로 시스템 폰트 스택 사용(`next/font` 웹폰트 미도입).                                                                                                           |

---

## 3. 개발 순서 및 의존성 개요

```
Phase 1  Foundation (스캐폴딩 / 토큰 / 타입 / 루트 레이아웃)
   │
Phase 2  Common Components (아이콘 / Badge / IconButton / SearchBar)
   │
Phase 3  Layout Sections (TopUtilityBar / SiteHeader / GlobalNav / SiteFooter)   ─┐
   │                                                                              │ 병렬 가능
Phase 4  Hero Carousel ★ (데이터 → Slide → Controls → 컨테이너 → 자동재생 → 호버 → 수동조작 → 접근성)
   │
Phase 5  Promotion / Banner (특가 데이터 → Countdown → TimeDealCard → TimeDealSection / AlertSignupBanner)
   │
Phase 6  Page Assembly & Responsive (page.tsx 조립 → Mobile → Tablet → 접근성·대비 최종)
   │
Phase 7  QA (Lint·타입·빌드 → 기능 QA → Visual QA → Lighthouse)
```

- Phase 3과 Phase 4는 Phase 2 완료 후 서로 독립적으로 병렬 진행 가능(공유 자원: 아이콘 세트, 공통 컨테이너).
- Phase 5는 Phase 2(Badge/IconButton)만 있으면 Phase 4와 병렬 가능하나, 페이지 조립(Phase 6)은 Phase 3·4·5 모두 필요.

---

## 4. Phase & Task 상세

우선순위 기준: **P0** 반드시 필요한 핵심 / **P1** 주요 기능 / **P2** 부가 기능 / **P3** 개선 기능

---

## Phase 1 — Foundation

### Task 1. Next.js 16 프로젝트 스캐폴딩

#### 목적

개발을 시작할 수 있는 Next.js 16 App Router + TypeScript + Tailwind 기본 환경을 구성한다.

#### 작업 내용

- `create-next-app` 기반으로 App Router, TypeScript, Tailwind CSS, ESLint 포함 스캐폴딩(현재 빈 디렉토리에 초기화).
- React 19 / Next.js 16 의존성 버전 확인 후 `package.json`에 고정.
- 개발 서버 구동(`dev`), 빌드(`build`), 린트(`lint`) 스크립트 정상 동작 확인.
- 불필요한 기본 보일러플레이트(예시 페이지 스타일/에셋) 정리.
- `.gitignore` 확인(향후 git 사용 대비, 현재 저장소 아님).

#### 대상 파일 (예상)

- `package.json`
- `next.config.ts`
- `tsconfig.json`
- `tailwind.config.ts` 또는 `postcss.config.mjs` + `app/globals.css` (Tailwind 버전에 따라 상이 — Q8)
- `app/layout.tsx`, `app/page.tsx` (스캐폴딩 기본형)
- `.gitignore`, `README.md`

#### 선행 Task

없음

#### 의존성

이후 모든 Task의 기반.

#### 완료 조건

- `npm run dev` 실행 시 로컬에서 기본 페이지가 에러 없이 렌더링된다.
- `npm run build` 성공.
- `npm run lint` 실행 가능(에러 0).
- TypeScript strict 모드 활성 상태.
- 콘솔 에러/경고 0.

#### 우선순위

P0

---

### Task 2. 디렉토리 구조 및 경로 별칭 설정

#### 목적

PRD 7장 컴포넌트 분리 설계를 반영한 폴더 구조와 import 경로 별칭을 확정한다.

#### 작업 내용

- 다음 디렉토리 골격 생성: `components/layout`, `components/hero`, `components/promotion`, `components/common`, `components/banner`, `lib`, `public/images/hero`, `public/images/deal`.
- `tsconfig.json`의 `paths`에 `@/*` 별칭 설정(스캐폴딩 기본값 확인, 없으면 추가).
- 각 빈 디렉토리에 `.gitkeep` 또는 최소 index 배치는 하지 않고, 실제 파일 생성 Task에서 채운다.

#### 대상 파일 (예상)

- `tsconfig.json`
- 디렉토리 골격(파일 없음)

#### 선행 Task

Task 1

#### 의존성

Phase 2~5의 파일 배치 위치를 규정.

#### 완료 조건

- `@/components/...`, `@/lib/...` 형태 import가 타입 에러 없이 해석된다.
- PRD 7장 구조와 폴더 트리가 일치한다.

#### 우선순위

P0

---

### Task 3. ESLint / TypeScript 품질 규칙 정비

#### 목적

`any` 금지, 2칸 들여쓰기, 네이밍 규칙 등 PRD 2.1 코딩 규칙을 도구로 강제한다.

#### 작업 내용

- ESLint 규칙에 `@typescript-eslint/no-explicit-any: error` 추가/확인.
- 들여쓰기 2칸, 세미콜론/따옴표 등 포맷 규칙 확정(Prettier 도입 여부는 팀 표준 따름 — 미도입 시 ESLint 포맷 규칙만).
- `tsconfig.json` `strict: true`, `noUncheckedIndexedAccess` 등 엄격 옵션 검토.
- `npm run lint` 및 타입체크(`tsc --noEmit`) 스크립트 정리.

#### 대상 파일 (예상)

- `eslint.config.mjs` 또는 `.eslintrc.json`
- `tsconfig.json`
- `package.json` (scripts에 `typecheck` 추가)

#### 선행 Task

Task 1

#### 의존성

Phase 7 QA(Task 34)에서 재검증.

#### 완료 조건

- 코드에 `any`를 넣으면 lint 에러가 발생한다.
- `npm run typecheck` 통과.

#### 우선순위

P1

---

### Task 4. 공용 타입 정의

#### 목적

`HeroSlide` 등 여러 컴포넌트가 공유하는 타입을 한 곳에서 관리한다.

#### 작업 내용

- PRD 4.D.3 스키마대로 `HeroSlide` 인터페이스 정의(`id`, `country`, `subtitle`, `title`, `imageUrl`, `alt`).
- 특가 상품 카드용 타입(`TimeDeal` 등: 나라, 항공사, 상품명, 해시태그 배열, 원가, 할인가, 마감 정보) 정의 — Task 25와 정합.
- GNB 메뉴 항목, 유틸리티 링크 등 반복 렌더 데이터용 타입 정의.
- 모든 필드에 한국어 주석.

#### 대상 파일 (예상)

- `lib/types.ts`

#### 선행 Task

Task 2

#### 의존성

Task 16(heroSlides), Task 25(특가 데이터), Hero/Promotion 컴포넌트 전반.

#### 완료 조건

- `HeroSlide` 타입이 PRD 스키마와 1:1 일치한다.
- `any` 없이 모든 타입이 명시된다.

#### 우선순위

P0

---

### Task 5. 디자인 토큰 설정

#### 목적

PRD 5장 디자인 토큰을 Tailwind 테마/CSS 변수로 등록해 전 컴포넌트가 일관되게 사용한다.

#### 작업 내용

- Tailwind 테마 확장에 색상 토큰 등록: `primary(#2563eb)`, `sale(#e11d48)`, `text-strong(#111827)`, `text-base(#374151)`, `text-muted(#9ca3af)`, `bg-subtle(#f9fafb)`, `border(#e5e7eb)`.
- 라운드/그림자/컨테이너 최대폭 관례 정리(`max-w-screen-xl` 사용 가이드, 히어로 `rounded-2xl`).
- `app/globals.css`에 시스템 폰트 스택, 기본 텍스트 색(`text-base`), `img { max-width: 100% }`, 가로 스크롤 방지(`overflow-x` 가이드) 설정.
- 섹션 간격 유틸 관례(`py-12`~`py-16`) 문서화(주석).

#### 대상 파일 (예상)

- `tailwind.config.ts` (또는 v4의 `@theme` 블록 in `app/globals.css` — Q8)
- `app/globals.css`

#### 선행 Task

Task 1

#### 의존성

Phase 2~6 모든 UI Task.

#### 완료 조건

- `text-strong`, `bg-sale` 등 커스텀 클래스가 정상 적용된다.
- 시스템 폰트가 적용되고 웹폰트 네트워크 요청이 없다.
- 페이지에 가로 스크롤이 생기지 않는 기본 CSS가 적용된다.

#### 우선순위

P0

---

### Task 6. 루트 레이아웃 및 공통 컨테이너

#### 목적

`app/layout.tsx`에 공통 메타/폰트/구조를 정의하고, 재사용 컨테이너 규칙을 마련한다.

#### 작업 내용

- `app/layout.tsx`: `lang="ko"`, `<meta>` 기본값(title/description), 시스템 폰트 클래스, `globals.css` import.
- 페이지 최대폭 중앙 정렬 컨테이너 컴포넌트 또는 유틸 클래스 정의(`max-w-screen-xl mx-auto px-4` 등, 좌우 최소 16px 여백).
- `<body>` 기본 배경/텍스트 색 토큰 적용.
- 시맨틱 랜드마크 골격(`<header>`, `<main>`, `<footer>`) 배치 지점 정의(내용은 Phase 3에서).

#### 대상 파일 (예상)

- `app/layout.tsx`
- `components/common/Container.tsx` (선택)

#### 선행 Task

Task 5

#### 의존성

Task 30(page 조립), Phase 3 레이아웃 컴포넌트.

#### 완료 조건

- 모든 페이지에 공통 배경/폰트/메타가 적용된다.
- 컨테이너로 감싼 영역이 1280px 초과 화면에서 중앙 정렬되고 좌우 여백 16px 이상 유지된다.
- 콘솔 경고 0.

#### 우선순위

P0

---

## Phase 2 — Common Components

### Task 7. 인라인 SVG 아이콘 세트

#### 목적

외부 아이콘 라이브러리 없이 필요한 아이콘을 인라인 SVG 컴포넌트로 제공한다.

#### 작업 내용

- 필요한 아이콘 컴포넌트 구현: 비행기(로고), 돋보기(검색), 하트(찜), 문서·체크(예약확인), 화살표 좌/우(캐러셀), 재생/일시정지, 그리드(전체보기), 알림 벨(배너), 햄버거(GNB).
- 공통 props: `className`, `aria-hidden` 기본값, `size` 또는 Tailwind로 크기 제어.
- 순수 표현용이며 상태 없음. `currentColor` 사용으로 색상 상속.

#### 대상 파일 (예상)

- `components/common/icons/` (예: `PlaneIcon.tsx`, `SearchIcon.tsx`, `HeartIcon.tsx`, `ChevronLeftIcon.tsx`, `ChevronRightIcon.tsx`, `PlayIcon.tsx`, `PauseIcon.tsx`, `GridIcon.tsx`, `BellIcon.tsx`, `MenuIcon.tsx`)
- 또는 단일 `components/common/Icons.tsx`

#### 선행 Task

Task 2

#### 의존성

Header, GNB, HeroControls, TimeDealCard, AlertSignupBanner 등 대부분의 UI Task.

#### 완료 조건

- 각 아이콘이 크기/색상 제어 가능하게 렌더링된다.
- 장식 아이콘은 `aria-hidden="true"`가 기본 적용된다.
- 콘솔 경고 0.

#### 우선순위

P0

---

### Task 8. Badge 컴포넌트

#### 목적

나라명/해시태그/항공사 등 라벨 표기에 쓰는 재사용 뱃지를 만든다.

#### 작업 내용

- `Badge` 컴포넌트: `children`, `variant`(예: `country`, `tag`, `neutral`), `className` props.
- 토큰 색상 사용(강조는 `primary`/`sale` 계열, 기본은 `bg-subtle` + `border`).
- 시맨틱: 단순 `<span>`.

#### 대상 파일 (예상)

- `components/common/Badge.tsx`

#### 선행 Task

Task 5

#### 의존성

Task 27(TimeDealCard), 필요 시 Hero 오버레이.

#### 완료 조건

- variant별 스타일이 구분되어 렌더링된다.
- 텍스트 대비 WCAG AA 충족.

#### 우선순위

P1

---

### Task 9. IconButton 컴포넌트

#### 목적

아이콘 + 라벨 형태의 버튼(예약확인/찜, 캐러셀 컨트롤 등)을 표준화한다.

#### 작업 내용

- `IconButton` 컴포넌트: `icon`(ReactNode), `label`(string), `labelPosition`(`right`/`bottom`/`hidden`), `onClick`, `ariaLabel`, `type="button"` 기본.
- 라벨 숨김(`hidden`) 시 `aria-label` 필수 처리.
- 포커스 링 유지(`focus-visible` 스타일), hover 시 색상 강조.
- 기본은 no-op 허용(onClick 미전달 시 아무 동작 없음).

#### 대상 파일 (예상)

- `components/common/IconButton.tsx`

#### 선행 Task

Task 7

#### 의존성

Task 13(Header), Task 19(HeroControls), Task 14(GNB 햄버거).

#### 완료 조건

- 키보드 Tab으로 포커스되고 포커스 링이 보인다.
- `aria-label` 또는 가시 라벨 중 하나가 항상 존재한다.
- 라벨 위치 3종이 정상 렌더링된다.

#### 우선순위

P1

---

### Task 10. SearchBar 컴포넌트 (비활성)

#### 목적

헤더 중앙 검색바를 재사용 가능한 형태로 구현하되, 검색 실행은 하지 않는다.

#### 작업 내용

- pill 형태 `<form>` + `<input type="search">`(placeholder `여행 상품 검색`) + 우측 돋보기 아이콘 버튼.
- `onSubmit`에서 `event.preventDefault()` — 검색/자동완성/라우팅 없음.
- 입력값은 로컬 `useState`로만 관리(선택), 외부로 전달하지 않음.
- 넓은 화면에서 넓게, 모바일에서 축약/토글 가능하도록 props(`variant` 또는 `className`)로 확장 여지 확보.
- 접근성: `<label>` 또는 `aria-label="여행 상품 검색"`, 버튼 `aria-label="검색"`.

#### 대상 파일 (예상)

- `components/common/SearchBar.tsx`

#### 선행 Task

Task 7

#### 의존성

Task 13(SiteHeader)에서 사용.

#### 완료 조건

- 입력은 되지만 submit 시 페이지 이동/새로고침이 발생하지 않는다.
- 자동완성 드롭다운이 없다.
- 키보드 포커스 및 `aria-label`이 존재한다.
- 콘솔 에러 0.

#### 우선순위

P0

---

## Phase 3 — Layout Sections

> Phase 3 Task들(11~14)은 Task 7 완료 후 서로 병렬 진행 가능. Task 15(Footer)도 병렬 가능.

### Task 11. TopUtilityBar (A)

#### 목적

페이지 최상단 유틸리티 바를 구현한다.

#### 작업 내용

- 흰색 배경 + 얇은 하단 보더.
- 좌측: `KALPAK` 워드마크(작게, `text-muted`).
- 우측: 텍스트 링크 3개 `로그인` / `멤버십가입` / `고객센터` — `<a href="#">` 또는 `<button type="button">` + no-op.
- 컨테이너 최대폭 정렬.
- 반응형: Mobile(~639px)에서 숨김(`hidden sm:block` 등) 또는 축소.

#### 대상 파일 (예상)

- `components/layout/TopUtilityBar.tsx`

#### 선행 Task

Task 6

#### 의존성

Task 30(page 조립). 다른 레이아웃 Task와 독립.

#### 완료 조건

- 데스크톱에서 좌측 워드마크 + 우측 링크 3개가 정렬되어 보인다.
- 링크 클릭 시 아무 동작(라우팅/스크롤/에러) 없음.
- Mobile 폭에서 바가 숨겨지거나 축소된다.
- 콘솔 에러 0.

#### 우선순위

P1

---

### Task 12. SiteHeader (B)

#### 목적

로고 + 검색바 + 우측 아이콘으로 구성된 헤더를 구현한다.

#### 작업 내용

- 좌측: 비행기 인라인 SVG(Task 7) + `TEST TRAVEL` 텍스트(굵게).
- 중앙: `SearchBar`(Task 10) 배치, 넓은 화면에서 넓게.
- 우측: `IconButton` 2개 — `예약확인`(문서/체크 아이콘), `찜`(하트 아이콘), 라벨 표시, no-op.
- sticky 고정하지 않음(정적 배치).
- 반응형: Mobile에서 로고 / 검색 아이콘 토글 / 햄버거로 축약, 검색바는 아래 줄로 내리거나 아이콘 토글(토글 상태는 로컬 `useState`).

#### 대상 파일 (예상)

- `components/layout/SiteHeader.tsx`

#### 선행 Task

Task 10, Task 9, Task 7

#### 의존성

`SearchBar`, `IconButton`, 아이콘 세트. Task 30에서 조립.

#### 완료 조건

- 데스크톱에서 로고/검색바/우측 아이콘 3영역이 한 줄에 배치된다.
- 검색바는 입력만 가능(submit no-op).
- 우측 아이콘 클릭 시 no-op.
- Mobile 폭에서 검색바가 축약/토글되고 가로 스크롤이 없다.
- 콘솔 에러 0.

#### 우선순위

P0

---

### Task 13. GlobalNav (C)

#### 목적

글로벌 내비게이션(GNB) 바를 구현한다.

#### 작업 내용

- 좌측: 햄버거(전체 카테고리) 버튼 — no-op.
- 좌측 정렬 메뉴: `THE 팩`, `패키지여행`, `전세기`, `에어텔`, `항공 ✈️`, `호텔 🏨` (데이터 배열 + map 렌더, 타입은 `lib/types.ts`).
- 우측 정렬 보조 메뉴: `기획전`, `이벤트`.
- 모든 항목 `<a href="#">`, 페이지 이동 없음. hover 시 텍스트 컬러 강조/밑줄만.
- 반응형: Mobile에서 가로 스크롤 탭(`overflow-x-auto`) 또는 햄버거 내부 수납.

#### 대상 파일 (예상)

- `components/layout/GlobalNav.tsx`
- (데이터) `lib/navItems.ts` 또는 컴포넌트 내부 상수

#### 선행 Task

Task 7, Task 4

#### 의존성

Task 30에서 조립. 다른 레이아웃 Task와 독립.

#### 완료 조건

- 메뉴 6개 + 보조 메뉴 2개가 좌/우 정렬로 표시된다.
- hover 시 강조 인터랙션만 발생, 클릭 시 라우팅 없음.
- Mobile 폭에서 가로 스크롤 탭 또는 햄버거 수납으로 본문 가로 스크롤이 생기지 않는다.
- 콘솔 에러 0.

#### 우선순위

P0

---

### Task 14. SiteFooter (G)

#### 목적

디자인에 없는 간단한 기본 푸터를 추가해 페이지 완성도를 높인다.

#### 작업 내용

- 회사 정보 더미 텍스트(상호/대표/주소/사업자번호 등 placeholder).
- `이용약관` / `개인정보처리방침` 링크(비활성, `href="#"`).
- 카피라이트 문구.
- `<footer>` 시맨틱, 과하지 않은 최소 구성, 섹션 배경 `bg-subtle`.
- 반응형: 모바일 세로 정렬.

#### 대상 파일 (예상)

- `components/layout/SiteFooter.tsx`

#### 선행 Task

Task 6

#### 의존성

Task 30에서 조립. 완전 독립(병렬 가능).

#### 완료 조건

- 푸터에 더미 회사 정보/링크/카피라이트가 표시된다.
- 링크 클릭 시 no-op.
- 모바일/데스크톱 모두 레이아웃이 깨지지 않는다.

#### 우선순위

P2

---

## Phase 4 — Hero Carousel (★ 핵심)

> 내부 순서 의존성이 강함: 16 → 17 → 18 → 19 → 20 → 21 → 22 → 23 → 24.

### Task 15. 히어로 슬라이드 목업 데이터

#### 목적

캐러셀이 렌더할 나라별 슬라이드 데이터를 상수로 정의한다.

#### 작업 내용

- `HeroSlide[]` 상수 정의(Task 4 타입 사용).
- 초기 6~8개 항목 작성(나라/소제목/큰 제목/이미지 경로/alt). 예: 일본 `황금 가을에 만나는` / `일본의 숨은 아지트`.
- `imageUrl`은 `public/images/hero/` 기준 경로. 이미지 미확보 시 경로만 정의하고 Task 17의 플레이스홀더와 연동.
- 목표 16개까지 확장 가능한 구조(배열만 추가). 인디케이터 분모는 `slides.length`로 계산.

#### 대상 파일 (예상)

- `lib/heroSlides.ts`

#### 선행 Task

Task 4

#### 의존성

Task 18(HeroSlide), Task 20(HeroCarousel).

#### 완료 조건

- 6개 이상 슬라이드가 타입 에러 없이 정의된다.
- 모든 항목에 의미 있는 `alt`가 있다.
- `any` 미사용.

#### 우선순위

P0

---

### Task 16. 플레이스홀더 이미지 구조

#### 목적

실제 이미지 미확보 상황에서도 캐러셀/특가 카드가 정상 표시되도록 한다. (Q3)

#### 작업 내용

- `public/images/hero/`, `public/images/deal/` 디렉토리 생성 및 배치 규칙 문서화(파일명 컨벤션).
- 이미지 미확보 시: 단색/그라데이션 배경 + 나라명 텍스트 플레이스홀더를 렌더하는 방식 결정(예: `HeroSlide` 내부에서 `imageUrl` 로드 실패/미정의 시 CSS 그라데이션 fallback).
- 최소 1~2개 샘플/더미 이미지 또는 SVG 데이터 URI 준비.
- `next/image` 사용 시 `remotePatterns` 불필요(로컬 자산), `sizes` 속성 가이드.

#### 대상 파일 (예상)

- `public/images/hero/` (자산)
- `public/images/deal/` (자산)
- `components/hero/HeroSlide.tsx` 내 fallback 로직(Task 18과 연계)

#### 선행 Task

Task 2

#### 의존성

Task 18, Task 27.

#### 완료 조건

- 이미지가 없어도 슬라이드 영역이 깨지지 않고 나라명 플레이스홀더가 보인다.
- `next/image` 사용 시 레이아웃 시프트가 없다(width/height 또는 fill + 컨테이너 비율 지정).

#### 우선순위

P1

---

### Task 17. HeroSlide 컴포넌트

#### 목적

개별 슬라이드(이미지 + 카피 오버레이)를 렌더하는 표현 컴포넌트를 만든다.

#### 작업 내용

- props: `slide: HeroSlide`, `isActive: boolean`, `variant: 'active' | 'side'` (또는 위치값).
- `next/image`로 이미지 렌더(`fill` + 컨테이너 `aspect-ratio`), 라운드 코너(`rounded-2xl`), 활성 시 `shadow-xl`.
- 활성 슬라이드: 상단 그라데이션/딤 + 카피 오버레이(소제목 → 큰 제목). 대비 WCAG AA.
- 측면 슬라이드(`side`): 축소(scale) + `opacity-60~70`, 오버레이 텍스트 생략 또는 흐림.
- 이미지 없을 때 그라데이션 + `country` 텍스트 fallback(Task 16).
- 상태 없음(순수 표현). 트랜지션 관련 클래스는 컨테이너(Task 20)에서 제어.

#### 대상 파일 (예상)

- `components/hero/HeroSlide.tsx`

#### 선행 Task

Task 15, Task 16

#### 의존성

Task 20(HeroCarousel)에서 배치.

#### 완료 조건

- 활성/측면 variant가 시각적으로 구분된다(크기·투명도·그림자).
- 활성 슬라이드에 소제목/큰 제목이 읽기 쉽게 표시된다.
- `alt`가 적용되고, 장식적 요소는 `alt=""`.
- 콘솔 경고 0(next/image 경고 포함).

#### 우선순위

P0

---

### Task 18. HeroControls 컴포넌트

#### 목적

캐러셀 하단 중앙 컨트롤 바를 구현한다.

#### 작업 내용

- 구성: `이전(<)` 버튼, `현재/전체` 인디케이터(예: `4 / 16`), `다음(>)` 버튼, `재생/일시정지` 토글, `전체 보기(그리드)` 버튼.
- props: `activeIndex`, `total`, `isPlaying`, `onPrev`, `onNext`, `onTogglePlay`. 그리드 버튼은 no-op(아이콘만).
- 각 버튼 `IconButton`/`aria-label` 지정: "이전 슬라이드", "다음 슬라이드", 재생 상태에 따라 "자동재생 정지"/"자동재생 시작".
- 재생/정지 상태에 따라 아이콘 토글.
- 인디케이터는 `aria-live="polite"` 또는 시각 텍스트로 현재 위치 표시.

#### 대상 파일 (예상)

- `components/hero/HeroControls.tsx`

#### 선행 Task

Task 9, Task 7

#### 의존성

Task 20(HeroCarousel)에서 콜백/상태 연결.

#### 완료 조건

- 버튼 4종 + 인디케이터가 표시된다.
- `isPlaying`에 따라 재생/정지 아이콘이 바뀐다.
- 모든 조작 버튼에 `aria-label`이 있다.
- 그리드 버튼은 클릭해도 no-op.

#### 우선순위

P0

---

### Task 19. HeroCarousel 컨테이너 — coverflow 레이아웃

#### 목적

중앙 활성 + 좌우 미리보기(coverflow) 시각 구조와 슬라이드 전환 레이아웃을 구현한다(자동재생 제외).

#### 작업 내용

- `useState`로 `activeIndex` 관리.
- `prev = (i-1+len)%len`, `next = (i+1)%len` 계산으로 좌/우 미리보기 슬라이드 배치(일부만 보이게, 축소 + 투명).
- 트랜지션: Tailwind `transition-transform duration-500 ease-in-out` + `translate-x` 또는 opacity/scale 조합(400~600ms).
- `HeroSlide`(활성/측면) + `HeroControls` 조립, `onPrev`/`onNext`로 `activeIndex` ±1 이동(무한 순환).
- 영역 시맨틱: `<section aria-roledescription="carousel" aria-label="여행 목적지 광고">`.
- 반응형: Mobile에서 좌우 미리보기 축소·숨김, Tablet에서 살짝 노출, Desktop 풀 레이아웃.

#### 대상 파일 (예상)

- `components/hero/HeroCarousel.tsx`

#### 선행 Task

Task 17, Task 18

#### 의존성

Task 20~23이 이 컴포넌트에 로직 추가. Task 30에서 조립.

#### 완료 조건

- 중앙 활성 슬라이드 + 좌우 미리보기가 coverflow 형태로 표시된다.
- 이전/다음 버튼으로 부드럽게 1칸씩 순환 이동한다(마지막→첫, 첫→마지막).
- Mobile/Tablet/Desktop에서 레이아웃이 규정대로 변한다.
- 본문 가로 스크롤 없음, 콘솔 에러 0.

#### 우선순위

P0

---

### Task 20. HeroCarousel 자동 전환(3초) 로직

#### 목적

PRD의 핵심 요구사항인 3초 자동 전환 + 무한 순환을 구현한다.

#### 작업 내용

- `useEffect` + `setInterval`(또는 재귀 `setTimeout`)로 3000ms마다 `activeIndex`를 다음으로 이동.
- 의존성 배열: `activeIndex`, `isPlaying`, `isHovered`.
- `isPlaying === false` 또는 `isHovered === true`이면 타이머 미가동.
- **cleanup**: `useEffect` 반환 함수에서 `clearInterval`/`clearTimeout` 반드시 호출(언마운트/의존성 변경 시).
- `isPlaying` 초기값 `true`.

#### 대상 파일 (예상)

- `components/hero/HeroCarousel.tsx`

#### 선행 Task

Task 19

#### 의존성

Task 22(수동 조작 시 타이머 리셋), Task 21(호버 일시정지).

#### 완료 조건

- 페이지 로드 후 3초마다 슬라이드가 자동으로 다음으로 넘어간다.
- 마지막 슬라이드 다음에 첫 슬라이드로 돌아간다(무한 loop).
- 컴포넌트 언마운트 시 타이머가 남지 않는다(개발자도구/React strict mode 중복 타이머 없음).
- 콘솔 에러/경고 0.

#### 우선순위

P0

---

### Task 21. HeroCarousel 호버 효과 + 호버 시 자동재생 일시정지

#### 목적

활성 슬라이드 호버 시 시각 강조 + 자동 전환 일시정지 UX를 구현한다.

#### 작업 내용

- `useState`로 `isHovered` 관리, 캐러셀 영역 `onMouseEnter`/`onMouseLeave`(또는 `onPointerEnter/Leave`)로 토글.
- 활성 슬라이드 호버 시: 살짝 확대(`scale`) + 그림자 강화(`shadow-2xl`) 등.
- `isHovered === true`인 동안 자동 전환 타이머 정지, 벗어나면 재개(Task 20 의존성과 연동).
- 터치 디바이스에서 hover가 sticky되지 않도록 처리 고려.

#### 대상 파일 (예상)

- `components/hero/HeroCarousel.tsx`
- `components/hero/HeroSlide.tsx` (호버 스타일 클래스)

#### 선행 Task

Task 20

#### 의존성

Task 20 타이머 로직.

#### 완료 조건

- 마우스를 캐러셀 위에 올리면 자동 전환이 멈추고, 벗어나면 다시 시작된다.
- 활성 슬라이드에 확대/그림자 효과가 보인다.
- 콘솔 에러 0.

#### 우선순위

P0

---

### Task 22. HeroCarousel 수동 조작 + 타이머 리셋 + 재생/정지 토글

#### 목적

이전/다음 클릭과 재생/정지 토글이 자동 타이머와 올바르게 상호작용하도록 마무리한다.

#### 작업 내용

- 이전/다음 버튼 클릭 시 해당 방향 1칸 이동 후 자동 타이머 리셋(다음 자동 전환까지 다시 3초).
- `isPlaying` 토글: `HeroControls`의 재생/정지 버튼으로 자동 전환 on/off, 상태에 따라 아이콘 변경.
- `activeIndex` 변경이 타이머 `useEffect` 의존성에 포함되어 자연스럽게 리셋되도록 구현(또는 명시적 reset 함수).
- 인디케이터가 현재 `activeIndex + 1 / total` 실시간 반영.

#### 대상 파일 (예상)

- `components/hero/HeroCarousel.tsx`
- `components/hero/HeroControls.tsx`

#### 선행 Task

Task 20, Task 18

#### 의존성

Task 20 타이머, Task 18 컨트롤.

#### 완료 조건

- 다음 버튼을 누르면 즉시 이동하고, 그 시점부터 3초 뒤 자동 전환된다(직전 타이머 잔여시간 무시).
- 정지 버튼을 누르면 자동 전환이 멈추고 아이콘이 "재생"으로 바뀐다. 다시 누르면 재개.
- 인디케이터 숫자가 항상 현재 위치와 일치한다.
- 콘솔 에러 0.

#### 우선순위

P0

---

### Task 23. HeroCarousel 접근성 (aria / prefers-reduced-motion)

#### 목적

캐러셀의 접근성 요구사항을 충족한다.

#### 작업 내용

- 영역: `aria-roledescription="carousel"` + `aria-label`.
- 각 슬라이드 그룹에 `aria-roledescription="slide"`, `aria-label="N / 전체"` 고려.
- 모든 컨트롤 버튼 `aria-label`(Task 18에서 1차 적용, 여기서 검수).
- 자동재생 정지 수단(재생/정지 버튼) 제공 확인.
- `prefers-reduced-motion: reduce` 미디어 쿼리 감지 시: 자동 전환 비활성화(또는 매우 느리게) + 전환 애니메이션 제거(즉시 전환). `useMediaQuery` 훅 또는 CSS + JS 조합.
- 인디케이터 `aria-live="polite"`.

#### 대상 파일 (예상)

- `components/hero/HeroCarousel.tsx`
- `lib/usePrefersReducedMotion.ts` (선택)

#### 선행 Task

Task 22

#### 의존성

Task 33(접근성 최종 점검)에서 재확인.

#### 완료 조건

- 스크린리더가 캐러셀 영역과 컨트롤을 의미 있게 읽는다.
- OS 모션 최소화 설정 시 자동 전환/슬라이드 애니메이션이 비활성화된다.
- 키보드로 모든 컨트롤 조작 가능, 포커스 링 유지.
- axe/Lighthouse 접근성 위반 0(캐러셀 관련).

#### 우선순위

P1

---

## Phase 5 — Promotion / Banner

> Task 24는 Phase 4와 병렬 가능(Task 4, 8만 필요). Task 28도 Phase 3~4와 병렬 가능.

### Task 24. 특가 상품 목업 데이터 및 타입 정합

#### 목적

타임특가 카드가 사용할 상품 데이터를 상수로 정의한다.

#### 작업 내용

- Task 4에서 정의한 특가 타입 사용(나라, 항공사, 상품명, 해시태그 배열, 원가, 할인가, 마감 표기 문자열 또는 종료 시각).
- PRD 예시 반영: `대만` · `대한항공`, `[마진포기] 대만 추석 전세기 4일`, 해시태그 `#선착순 10명 초특가` `#대한항공` `#단1회` `#대만패키지`, 원가 `2,099,000`, 할인가 `1,499,000`.
- 카운트다운 기본 표기 `3일 00 : 56 : 25`(정적 문자열). 옵션 감소용으로 `endsAt`(미래 시각) 필드도 병행 정의 가능(Q5).
- 가격 표시용 포맷 유틸(천 단위 콤마) 필요 시 `lib/format.ts`.

#### 대상 파일 (예상)

- `lib/timeDeals.ts`
- `lib/format.ts` (선택)

#### 선행 Task

Task 4

#### 의존성

Task 26(TimeDealCard), Task 25(CountdownTimer).

#### 완료 조건

- 최소 1개 상품 데이터가 타입 에러 없이 정의된다(도트 2개 표기와 정합되도록 1~2개).
- 가격/해시태그가 PRD 예시 형식과 일치한다.
- `any` 미사용.

#### 우선순위

P1

---

### Task 25. CountdownTimer 컴포넌트

#### 목적

특가 카드 하단 카운트다운 바를 구현한다(기본 정적, 옵션 감소).

#### 작업 내용

- props: `mode: 'static' | 'countdown'`(기본 `static`), `staticText`(예: `3일 00 : 56 : 25`) 또는 `endsAt`(Date/ISO).
- `static` 모드: 전달된 텍스트를 그대로 표시.
- `countdown` 모드: `useEffect` + `setInterval` 1초 간격으로 남은 시간 계산, `일 HH : MM : SS` 포맷. **cleanup 필수**. 0 도달 시 `00 : 00 : 00` 고정 또는 "종료".
- 접근성: `aria-label`로 남은 시간 의미 전달, 시각적 강조는 `sale` 색.

#### 대상 파일 (예상)

- `components/promotion/CountdownTimer.tsx`

#### 선행 Task

Task 5

#### 의존성

Task 26(TimeDealCard)에서 사용.

#### 완료 조건

- 기본(`static`)에서 고정 텍스트가 표시되고 타이머가 돌지 않는다.
- `countdown` 모드에서 1초마다 감소하고, 언마운트 시 인터벌이 정리된다.
- 콘솔 에러/경고 0.

#### 우선순위

P2

---

### Task 26. TimeDealCard 컴포넌트

#### 목적

가로형 특가 상품 카드를 구현한다.

#### 작업 내용

- 좌측: 상품 이미지(라운드, `next/image`, 플레이스홀더 fallback).
- 우측 정보 영역: 나라 뱃지 + 항공사(`Badge` 사용), 상품명, 해시태그 목록(`Badge` variant `tag`), 가격(원가 `line-through text-muted` + 할인가 `text-sale` 큰 글씨 + `원~`), `자세히보기` 아웃라인 버튼(no-op), 하단 `CountdownTimer`.
- 데이터는 props(`deal: TimeDeal`)로 주입.
- 반응형: Mobile에서 이미지 상단 / 정보 하단 세로 스택.

#### 대상 파일 (예상)

- `components/promotion/TimeDealCard.tsx`

#### 선행 Task

Task 24, Task 25, Task 8, Task 16

#### 의존성

Task 27(TimeDealSection)에서 배치.

#### 완료 조건

- 데스크톱에서 좌(이미지)/우(정보) 가로 배치, 모바일에서 세로 스택.
- 원가 취소선 + 할인가 강조가 시각적으로 구분된다.
- `자세히보기` 클릭 시 no-op.
- 콘솔 에러 0.

#### 우선순위

P1

---

### Task 27. TimeDealSection 컴포넌트

#### 목적

특가 섹션 래퍼(제목 + 카드 + 도트 인디케이터)를 구현한다.

#### 작업 내용

- 섹션 제목: `특가 종료 임박! ⚡ 마진포기 타임어택 ⏰`.
- `TimeDealCard` 1개 렌더(데이터 배열의 첫 항목).
- 카드 하단: 도트 인디케이터 2개(정적, 비활성 — 현재 활성 도트 1개 강조 표시만).
- 섹션 간격 `py-12`~`py-16`, 컨테이너 최대폭 정렬.
- 시맨틱: `<section>` + `<h2>`.

#### 대상 파일 (예상)

- `components/promotion/TimeDealSection.tsx`

#### 선행 Task

Task 26

#### 의존성

Task 30(page 조립).

#### 완료 조건

- 제목 + 카드 1개 + 도트 2개가 표시된다.
- 도트는 클릭해도 no-op(정적).
- 반응형에서 레이아웃이 깨지지 않는다.

#### 우선순위

P1

---

### Task 28. AlertSignupBanner (F)

#### 목적

알림 신청 배너를 구현한다.

#### 작업 내용

- 옅은 배경색(`bg-subtle` 또는 primary 톤 옅게) 가로 배너.
- 좌측: 아이콘(벨) + 제목 `가격혜택찬스! 선착순 타임특가 알림신청`.
- 본문: `멤버십 가입 후 마케팅 정보 수신에 동의하시면 특가상품 오픈 정보를 알려드려요!`.
- 우측: `바로 신청하기 >` 링크(`<a href="#">` 또는 `<button>`), no-op.
- 반응형: Mobile에서 세로 정렬.

#### 대상 파일 (예상)

- `components/banner/AlertSignupBanner.tsx`

#### 선행 Task

Task 7, Task 5

#### 의존성

Task 30(page 조립). 완전 독립(병렬 가능).

#### 완료 조건

- 아이콘/제목/본문/CTA가 한 배너에 표시된다.
- CTA 클릭 시 no-op.
- Mobile에서 세로 정렬로 전환된다.

#### 우선순위

P2

---

## Phase 6 — Page Assembly & Responsive

### Task 29. 메인 페이지 조립 (app/page.tsx)

#### 목적

모든 섹션 컴포넌트를 PRD 3장 레이아웃 순서로 조립해 완성된 메인 페이지를 만든다.

#### 작업 내용

- 순서: `TopUtilityBar` → `SiteHeader` → `GlobalNav` → `HeroCarousel` → `TimeDealSection` → `AlertSignupBanner` → `SiteFooter`.
- 시맨틱 랜드마크: 상단 3개는 `<header>` 계열, 히어로~배너는 `<main>`, 마지막은 `<footer>`.
- 섹션 간 간격/배경 구분(`bg-white` / `bg-subtle` 교차) 적용.
- 서버/클라이언트 컴포넌트 경계 정리(캐러셀·카운트다운·검색바·헤더 토글만 `"use client"`).
- 페이지 메타(title/description) 확정.

#### 대상 파일 (예상)

- `app/page.tsx`

#### 선행 Task

Task 11, Task 12, Task 13, Task 14, Task 19~23, Task 27, Task 28

#### 의존성

Phase 3·4·5 전체.

#### 완료 조건

- 한 페이지에 A~G 전 영역이 PRD 순서대로 렌더링된다.
- 히어로 캐러셀 자동 전환이 페이지 컨텍스트에서 정상 동작한다.
- `npm run build` 성공, 콘솔 에러/경고 0.

#### 우선순위

P0

---

### Task 30. 반응형 — Mobile (~639px) 대응

#### 목적

Mobile 구간에서 PRD 6장 규정대로 레이아웃이 변형되도록 마감한다.

#### 작업 내용

- 유틸리티 바 숨김 확인.
- 헤더: 로고 / 검색 아이콘 토글 / 햄버거 축약, 검색바 아래 줄 또는 토글.
- GNB: 가로 스크롤 탭 또는 햄버거 수납.
- 히어로: 좌우 미리보기 축소·숨김, 컨트롤 바 터치 타깃 크기 확보(≥44px).
- 특가 카드: 이미지 상단 / 정보 하단 세로 스택.
- 알림 배너: 세로 정렬.
- 좌우 최소 여백 16px, 본문 가로 스크롤 0.

#### 대상 파일 (예상)

- 각 컴포넌트의 Tailwind 반응형 클래스 조정(주요: `SiteHeader`, `GlobalNav`, `HeroCarousel`, `TimeDealCard`, `AlertSignupBanner`)

#### 선행 Task

Task 29

#### 의존성

Task 31, Task 34~36.

#### 완료 조건

- 375px / 390px 폭에서 가로 스크롤이 없다.
- 모든 섹션이 규정된 모바일 변형을 따른다.
- 터치 조작 요소가 충분히 크다.

#### 우선순위

P0

---

### Task 31. 반응형 — Tablet (640~1023px) 대응

#### 목적

Tablet 구간에서 2단 구성 유지 및 히어로 좌우 미리보기 부분 노출을 확인한다.

#### 작업 내용

- 히어로: 좌우 미리보기가 살짝 노출되도록 중간 breakpoint 스타일 조정.
- 특가 카드: 2단(이미지/정보) 유지 여부 확인.
- 헤더/GNB: 데스크톱과 모바일 사이 중간 레이아웃 자연스럽게.

#### 대상 파일 (예상)

- `components/hero/HeroCarousel.tsx`, `components/promotion/TimeDealCard.tsx`, `components/layout/*`

#### 선행 Task

Task 30

#### 의존성

Task 34~36.

#### 완료 조건

- 768px / 1024px 경계에서 레이아웃이 깨지지 않는다.
- 히어로 좌우 미리보기가 데스크톱보다 좁게, 모바일보다 넓게 노출된다.

#### 우선순위

P1

---

### Task 32. 접근성 · 색 대비 최종 점검

#### 목적

PRD 9장 접근성/품질 기준을 페이지 전체 관점에서 검수·보정한다.

#### 작업 내용

- 모든 이미지 `alt` 검수(의미/장식 구분).
- 인터랙티브 요소가 `<button>`/`<a>`인지, 포커스 링이 살아있는지 전수 확인.
- 히어로 오버레이 텍스트 등 대비 WCAG AA 이상 측정·보정.
- 키보드 탭 순서 논리적인지 확인.
- `prefers-reduced-motion` 전역 동작 확인(히어로 + 카운트다운).
- 랜드마크(`header/main/footer/nav`) 구조 검증.

#### 대상 파일 (예상)

- 다수 컴포넌트 미세 조정

#### 선행 Task

Task 29, Task 23

#### 의존성

Task 37(Lighthouse)와 연계.

#### 완료 조건

- axe 또는 Lighthouse 접근성 스캔에서 심각(critical) 위반 0.
- 주요 텍스트/배경 대비 AA 충족.
- 키보드만으로 모든 조작 가능.

#### 우선순위

P1

---

## Phase 7 — QA

### Task 33. Lint / 타입체크 / 빌드 무결성

#### 목적

코드 품질 게이트를 통과시킨다.

#### 작업 내용

- `npm run lint` 에러/경고 0.
- `npm run typecheck`(`tsc --noEmit`) 에러 0, `any` 미사용 확인(grep).
- `npm run build` 성공, 빌드 경고 확인.
- 개발/프로덕션 모드 모두 콘솔 에러·경고 0.

#### 대상 파일 (예상)

- 전역

#### 선행 Task

Task 29

#### 의존성

릴리스 전 필수 게이트.

#### 완료 조건

- 세 명령(lint/typecheck/build) 모두 통과.
- 코드베이스에 `any` 없음.
- 런타임 콘솔 클린.

#### 우선순위

P0

---

### Task 34. 기능 QA — 히어로 캐러셀 시나리오

#### 목적

PRD 4.D.4 동작 요구사항을 시나리오 기반으로 검증한다.

#### 작업 내용

- 자동 전환: 3초 간격으로 다음 슬라이드 이동 확인(스톱워치).
- 순환: 마지막 → 첫 슬라이드 확인.
- 트랜지션: 400~600ms 부드러운 전환 확인.
- 호버: 활성 슬라이드 확대/그림자 + 자동재생 일시정지/재개 확인.
- 수동 조작: 이전/다음 클릭 시 1칸 이동 + 타이머 리셋 확인.
- 재생/정지: 토글 및 아이콘 변경 확인.
- 인디케이터: `현재+1 / 전체` 실시간 일치 확인.
- 정리: 페이지 이동/언마운트 후 타이머 잔존 없음(메모리/콘솔) 확인.
- `prefers-reduced-motion`: OS 설정 변경 후 자동 전환/애니메이션 비활성 확인.

#### 대상 파일 (예상)

- 결함 발견 시 `components/hero/*` 수정

#### 선행 Task

Task 29

#### 의존성

Task 20~23.

#### 완료 조건

- 위 9개 항목 전부 PASS.
- 발견된 결함은 수정 후 재검증 완료.

#### 우선순위

P0

---

### Task 35. 기능 QA — 비활성 요소 및 정적 섹션

#### 목적

비활성(no-op)로 지정된 요소가 실제로 아무 동작도 하지 않는지, 정적 섹션이 규격대로인지 확인한다.

#### 작업 내용

- PRD 8장 표 기준 전수 점검: 로그인/멤버십/고객센터, GNB 메뉴·햄버거, 예약확인/찜, 자세히보기, 바로 신청하기, 히어로 그리드 버튼, 특가 도트 → 클릭 시 라우팅/스크롤/에러 없음.
- 검색바: 입력 가능 / submit 시 새로고침·이동 없음 / 자동완성 없음.
- 특가 카운트다운: 기본 정적 표시 확인(옵션 모드 사용 시 1초 감소 확인).
- 푸터: 더미 정보/비활성 링크/카피라이트 표시.

#### 대상 파일 (예상)

- 결함 발견 시 해당 컴포넌트 수정

#### 선행 Task

Task 29

#### 의존성

Phase 3·5.

#### 완료 조건

- PRD 8장 표의 모든 행이 명시된 상태와 일치한다.
- no-op 요소에서 콘솔 에러 없음.

#### 우선순위

P1

---

### Task 36. Visual QA — 레퍼런스 이미지 대비

#### 목적

첨부 디자인(`테스트트레벌.jpg`)과 구현 화면을 시각적으로 비교해 차이를 보정한다. (Q1)

#### 작업 내용

- 레퍼런스 이미지 확보 후 데스크톱/태블릿/모바일 스크린샷과 비교.
- 레이아웃/간격/타이포/색상/컴포넌트 배치 차이를 P0~P2로 분류.
- P0(구조·핵심 요소 누락), P1(간격·정렬·크기), P2(미세 색/그림자) 순으로 수정 후 재검증.
- 디자인 토큰(PRD 5장) 준수 여부 확인.

#### 대상 파일 (예상)

- 다수 컴포넌트 미세 조정

#### 선행 Task

Task 29, Task 30, Task 31

#### 의존성

Q1 해소 필요(레퍼런스 이미지). 미확보 시 PRD 텍스트 기준으로만 수행하고 별도 표시.

#### 완료 조건

- 레퍼런스 대비 P0/P1 차이 0.
- 전체 톤(화이트 기반 + 여백 + 부드러운 그림자)이 일치한다.

#### 우선순위

P1

---

### Task 37. Lighthouse / 접근성 스캔

#### 목적

PRD 9장 품질 지표(Lighthouse 접근성·베스트프랙티스 90점 이상 지향)를 측정한다.

#### 작업 내용

- 프로덕션 빌드 기준 Lighthouse 실행(모바일/데스크톱).
- 접근성·베스트프랙티스 점수 확인, 90 미만 시 지적 항목 수정.
- axe DevTools로 위반 항목 교차 확인.
- 성능 점수는 참고용(범위 밖이나 이미지 최적화 이슈는 반영).

#### 대상 파일 (예상)

- 지적 사항에 따른 컴포넌트/설정 수정

#### 선행 Task

Task 33, Task 32

#### 의존성

QA 마지막 단계.

#### 완료 조건

- Lighthouse 접근성 ≥ 90, 베스트프랙티스 ≥ 90.
- axe 심각 위반 0.
- 콘솔 에러/경고 0.

#### 우선순위

P1

---

## 5. 병렬 작업 가능성

### 5.1 병렬 가능 그룹

| 그룹                     | Task                                        | 조건                                                                           |
| ------------------------ | ------------------------------------------- | ------------------------------------------------------------------------------ |
| G-1 (Foundation 내부)    | Task 3, Task 4, Task 5                      | Task 1 완료 후 동시 진행 가능(서로 독립). Task 6은 Task 5 이후.                |
| G-2 (아이콘/공통)        | Task 8, Task 10                             | Task 7 완료 후 병렬. Task 9는 Task 7 이후.                                     |
| G-3 (레이아웃 섹션)      | Task 11, Task 12, Task 13, Task 14          | 공통 컴포넌트(Task 7·9·10) 완료 후 4개 병렬 가능. 단 Task 12는 Task 10·9 필요. |
| G-4 (히어로 vs 프로모션) | (Task 15~~23) 라인 ∥ (Task 24~~28) 라인     | Task 4·8 완료 후 두 라인 병렬. 각 라인 내부는 순차.                            |
| G-5 (독립 섹션)          | Task 14(Footer), Task 28(AlertSignupBanner) | 공통 토큰/아이콘만 있으면 언제든 병렬.                                         |
| G-6 (QA 일부)            | Task 34, Task 35, Task 36                   | Task 29·30·31 완료 후 병렬 수행 가능(결함 수정은 조율 필요).                   |

### 5.2 직렬(임계 경로, Critical Path)

```
Task 1 → Task 2 → Task 4 → Task 15 → Task 17 → Task 19 → Task 20 → Task 22 → Task 23
       → Task 29 → Task 30 → Task 36 → Task 37
```

히어로 캐러셀 로직 체인(Task 19→20→21→22→23)이 가장 길고 리스크가 크므로 최우선 배정 권장.

### 5.3 병렬 불가(반드시 순차)

- Task 19 → 20 → 21 → 22 → 23 (동일 파일 `HeroCarousel.tsx`에 상태·타이머·이벤트를 누적 구현).
- Task 24 → 25 → 26 → 27 (특가 데이터 → 타이머 → 카드 → 섹션).
- Task 29(page 조립)는 Phase 3·4·5의 산출물이 모두 있어야 시작.

---

## 6. 로드맵 요약

### Phase 목록

| Phase   | 이름                       | Task 범위  | Task 수 | 핵심 목표                                                                      |
| ------- | -------------------------- | ---------- | ------- | ------------------------------------------------------------------------------ |
| Phase 1 | Foundation                 | Task 1~6   | 6       | 스캐폴딩, 디자인 토큰, 공용 타입, 루트 레이아웃                                |
| Phase 2 | Common Components          | Task 7~10  | 4       | 인라인 SVG 아이콘, Badge, IconButton, SearchBar(비활성)                        |
| Phase 3 | Layout Sections            | Task 11~14 | 4       | TopUtilityBar, SiteHeader, GlobalNav, SiteFooter                               |
| Phase 4 | Hero Carousel (★)          | Task 15~23 | 9       | 데이터 → 슬라이드/컨트롤 → coverflow → 3초 자동전환 → 호버 → 수동조작 → 접근성 |
| Phase 5 | Promotion / Banner         | Task 24~28 | 5       | 특가 데이터, CountdownTimer, TimeDealCard/Section, AlertSignupBanner           |
| Phase 6 | Page Assembly & Responsive | Task 29~32 | 4       | page.tsx 조립, Mobile/Tablet 대응, 접근성·대비 최종                            |
| Phase 7 | QA                         | Task 33~37 | 5       | Lint·타입·빌드, 기능 QA, Visual QA, Lighthouse                                 |

- **총 Phase 수: 7**
- **총 Task 수: 37**
- **P0 Task: 15** (Task 1, 2, 4, 5, 6, 7, 10, 12, 13, 15, 17, 18, 19, 20, 21, 22 중 핵심 — 상세는 각 Task의 우선순위 참조)
- **임계 경로 핵심: 히어로 캐러셀 로직 체인(Task 19~23) + 페이지 조립(Task 29) + 반응형(Task 30)**

### 권장 진행 순서 (요약)

1. Phase 1 완료(스캐폴딩·토큰·타입·레이아웃) — 이후 모든 작업의 전제.
2. Phase 2 공통 컴포넌트 — 아이콘 세트를 먼저 끝내 병목 제거.
3. Phase 3(레이아웃)과 Phase 4(히어로)를 병렬로. 히어로 로직 체인에 숙련 인력 배정.
4. Phase 5(프로모션/배너)를 히어로와 병렬로.
5. Phase 6에서 조립·반응형·접근성 마감.
6. Phase 7 QA로 품질 게이트 통과(Lint/타입/빌드 → 기능 → Visual → Lighthouse).

### 착수 전 해소 권장 항목

- **Q8**: Next.js 16 / React 19 / Tailwind 버전 호환성 및 설정 파일 형식 확인.
