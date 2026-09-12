import { Container } from '@/components/common/Container';
import { BellIcon, ChevronRightIcon } from '@/components/common/icons';

/**
 * 알림 신청 배너 (F).
 * 옅은 블루틴트 가로 배너: 벨 아이콘 + 볼드 문구 + 설명 + `바로 신청하기 >` 링크.
 * CTA는 no-op이며, 모바일에서는 세로로 정렬된다. (PRD 4.F / 6장)
 */
export function AlertSignupBanner() {
  return (
    <section className="bg-white py-6" aria-label="타임특가 알림 신청 안내">
      <Container>
        <div className="flex flex-col gap-3 rounded-xl bg-notice px-5 py-4 sm:flex-row sm:items-center sm:gap-4">
          <div className="flex items-center gap-2">
            <BellIcon size={20} className="shrink-0 text-primary" />
            <span className="text-[15px] font-bold text-strong">
              가격혜택찬스! 선착순 타임특가 알림신청
            </span>
          </div>

          <p className="text-[13px] text-sub sm:flex-1">
            멤버십 가입 후 마케팅 정보 수신에 동의하시면 특가상품 오픈 정보를 알려드려요!
          </p>

          <a
            href="#"
            className="inline-flex shrink-0 items-center gap-0.5 self-start text-[13px] font-medium text-primary transition-colors hover:underline sm:self-auto"
          >
            바로 신청하기
            <ChevronRightIcon size={14} />
          </a>
        </div>
      </Container>
    </section>
  );
}
