import type { Metadata } from 'next';
import './globals.css';

// 페이지 공통 메타데이터
export const metadata: Metadata = {
  title: 'TEST TRAVEL — 특가 여행 상품을 한 곳에서',
  description:
    '패키지·전세기·에어텔·항공·호텔을 한 곳에서 찾는 여행 플랫폼. 나라별 추천 여행지와 마진포기 타임특가를 만나보세요.',
};

// 루트 레이아웃 — lang="ko", 시스템 폰트/배경/본문색은 app/globals.css에서 처리한다.
// 시맨틱 랜드마크(<header> / <main> / <footer>)의 실제 배치는 Phase 6의 app/page.tsx 조립 단계에서 구성한다.
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // suppressHydrationWarning: Dark Reader·Grammarly 등 확장 프로그램이 하이드레이션 전에
    // <html> 태그에 속성을 주입해 발생하는 불일치 경고를 억제한다(우리 렌더 결과에는 영향 없음).
    <html lang="ko" className="antialiased" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
