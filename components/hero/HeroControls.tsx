import { IconButton } from '@/components/common/IconButton';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  GridIcon,
  PauseIcon,
  PlayIcon,
} from '@/components/common/icons';

interface HeroControlsProps {
  /** 현재 활성 슬라이드 인덱스 (0-based) */
  activeIndex: number;
  /** 전체 슬라이드 수 */
  total: number;
  /** 자동재생 중 여부 — 재생/일시정지 아이콘을 토글한다 */
  isPlaying: boolean;
  /** 이전 슬라이드로 이동 */
  onPrev: () => void;
  /** 다음 슬라이드로 이동 */
  onNext: () => void;
  /** 자동재생 on/off 토글 */
  onTogglePlay: () => void;
}

// 히어로 컨트롤 공통 버튼 스타일 (반투명 pill 위 흰색 아이콘 전용)
const controlButtonClass = 'text-white hover:text-white/70 focus-visible:ring-white';

/**
 * 캐러셀 하단 중앙 컨트롤 바.
 * 이전/다음/재생·정지 버튼과 `현재 / 전체` 인디케이터를 제공한다.
 * 그리드(전체 보기) 버튼은 아이콘만 있는 no-op이다. (PRD 4.D.2 / 8장)
 */
export function HeroControls({
  activeIndex,
  total,
  isPlaying,
  onPrev,
  onNext,
  onTogglePlay,
}: HeroControlsProps) {
  return (
    <div className="mx-auto mt-4 flex w-fit items-center gap-0.5 rounded-full bg-strong/75 px-2 py-1 backdrop-blur-sm">
      <IconButton
        icon={<ChevronLeftIcon size={16} />}
        label="이전 슬라이드"
        labelPosition="hidden"
        onClick={onPrev}
        className={controlButtonClass}
      />

      <span aria-live="polite" className="min-w-[52px] text-center text-xs tabular-nums text-white">
        {activeIndex + 1} / {total}
      </span>

      <IconButton
        icon={<ChevronRightIcon size={16} />}
        label="다음 슬라이드"
        labelPosition="hidden"
        onClick={onNext}
        className={controlButtonClass}
      />

      <IconButton
        icon={isPlaying ? <PauseIcon size={16} /> : <PlayIcon size={16} />}
        label={isPlaying ? '자동재생 정지' : '자동재생 시작'}
        labelPosition="hidden"
        onClick={onTogglePlay}
        className={controlButtonClass}
      />

      <IconButton
        icon={<GridIcon size={16} />}
        label="전체 슬라이드 보기"
        labelPosition="hidden"
        className={controlButtonClass}
      />
    </div>
  );
}
