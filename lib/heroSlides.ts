// 히어로 캐러셀이 렌더할 나라별 슬라이드 목업 데이터 (PRD 4.D.3)
// 실제 서비스에서는 CMS/API 응답으로 교체한다.
// 이미지는 `src/img/` 하위에 두고 정적 import 하며(빌드 시 width/height/blur 자동 산출),
// 미확보 시 imageUrl을 빈 문자열로 두면 HeroSlide가 그라데이션 + 나라명 플레이스홀더를 렌더한다.
import alpsImage from '@/src/img/alps.png';
import danangHoianImage from '@/src/img/danang-hoian.png';
import istanbulImage from '@/src/img/istanbul.png';
import taipeiImage from '@/src/img/taipei.png';
import bangkokImage from '@/src/img/Bangkok.png';
import barcelonaImage from '@/src/img/Barcelona.png';
import japan from '@/src/img/japan.png';
import hawaiiImage from '@/src/img/Hawaii.png';
import type { HeroSlide } from '@/lib/types';

/**
 * 나라별 히어로 슬라이드 목록.
 * 인디케이터 분모(`전체`)는 이 배열 길이로 자동 계산되므로,
 * 슬라이드를 늘리려면 항목만 추가하면 된다(목표 16개).
 */
export const heroSlides: HeroSlide[] = [
  {
    id: 1,
    country: '일본',
    subtitle: '황금 가을에 만나는',
    title: '일본의 숨은 아지트',
    imageUrl: japan,
    alt: '단풍이 물든 일본 교토의 골목 풍경',
  },
  {
    id: 2,
    country: '베트남',
    subtitle: '햇살 가득한 해변으로',
    title: '다낭 & 호이안 5일',
    imageUrl: danangHoianImage,
    alt: '노을 진 호이안 강가에 등불을 밝힌 소원배가 떠 있는 풍경',
  },
  {
    id: 3,
    country: '스위스',
    subtitle: '만년설과 초원 사이',
    title: '알프스 파노라마 기차 여행',
    imageUrl: alpsImage,
    alt: '초록 초원과 알프스 산맥을 지나는 스위스 파노라마 열차',
  },
  {
    id: 4,
    country: '튀르키예',
    subtitle: '동서양이 만나는 곳',
    title: '이스탄불 & 카파도키아',
    imageUrl: istanbulImage,
    alt: '언덕과 바다가 어우러진 튀르키예 해안 도시의 전경',
  },
  {
    id: 5,
    country: '대만',
    subtitle: '야시장의 밤을 걷다',
    title: '타이베이 미식 3일',
    imageUrl: taipeiImage,
    alt: '해 질 녘 인파로 붐비는 대만 타이베이의 거리 시장',
  },
  {
    id: 6,
    country: '스페인',
    subtitle: '정열의 태양 아래',
    title: '바르셀로나 건축 산책',
    imageUrl: barcelonaImage,
    alt: '스페인 바르셀로나 사그라다 파밀리아 성당의 첨탑',
  },
  {
    id: 7,
    country: '태국',
    subtitle: '미소의 나라로 떠나는',
    title: '방콕 & 파타야 6일',
    imageUrl: bangkokImage,
    alt: '노을이 지는 태국 방콕의 사원 전경',
  },
  {
    id: 8,
    country: '미국',
    subtitle: '태평양의 낙원',
    title: '하와이 오아후 완전정복',
    imageUrl: hawaiiImage,
    alt: '와이키키 해변과 다이아몬드 헤드가 보이는 하와이 풍경',
  },
];
