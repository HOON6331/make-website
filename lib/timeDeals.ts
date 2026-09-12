// 타임특가 프로모션 섹션의 상품 목업 데이터 (PRD 4.E)
// 실제 서비스에서는 API 응답으로 교체한다.
// 이미지는 `src/img/` 하위에 두고 정적 import 하며, 미확보 시 imageUrl을 생략한다.
import danangHoianImage from '@/src/img/danang-hoian.png';
import taipeiImage from '@/src/img/taipei.png';
import type { TimeDeal } from '@/lib/types';

/**
 * 타임특가 상품 목록.
 * 현재 섹션은 첫 항목만 카드로 노출하고, 페이지 도트는 정적 2개로 표시한다. (PRD 8장)
 */
export const timeDeals: TimeDeal[] = [
  {
    id: 1,
    country: '대만',
    airline: '대한항공',
    name: '[마진포기] 대만 추석 전세기 4일',
    imageUrl: taipeiImage,
    hashtags: ['#선착순 10명 초특가', '#대한항공', '#단1회', '#대만패키지'],
    originalPrice: 2099000,
    salePrice: 1499000,
    deadlineText: '3일 00 : 56 : 25',
  },
  {
    id: 2,
    country: '베트남',
    airline: '베트남항공',
    name: '[얼리버드] 나트랑 자유여행 5일',
    imageUrl: danangHoianImage,
    hashtags: ['#특가마감임박', '#베트남항공', '#5성호텔', '#자유일정'],
    originalPrice: 1290000,
    salePrice: 899000,
    deadlineText: '1일 12 : 30 : 00',
  },
];
