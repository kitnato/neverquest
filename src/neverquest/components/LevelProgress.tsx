import Stack from "react-bootstrap/Stack";
import { useRecoilValue } from "recoil";

import ImageIcon from "neverquest/components/ImageIcon";
import Progress from "neverquest/components/Progress";
import { UIAnimationType, UIOverlayPlacement, UIVariant } from "neverquest/env";
import levelIcon from "neverquest/icons/flying-flag.svg";
import progressIcon from "neverquest/icons/stairs.svg";
import { isWilderness, level, progress, progressMax } from "neverquest/state/global";
import { showLevelProgress } from "neverquest/state/show";
import { getAnimationClass } from "neverquest/utilities/helpers";

export default function LevelProgress() {
  const isWildernessValue = useRecoilValue(isWilderness);
  const levelValue = useRecoilValue(level);
  const progressValue = useRecoilValue(progress);
  const progressMaxValue = useRecoilValue(progressMax);
  const showLevelProgressValue = useRecoilValue(showLevelProgress);

  if (!showLevelProgressValue) {
    return null;
  }

  return (
    <Stack className={getAnimationClass(UIAnimationType.FlipInX)} direction="horizontal" gap={5}>
      <Stack direction="horizontal" gap={3}>
        <ImageIcon icon={levelIcon} placement={UIOverlayPlacement.Bottom} tooltip="Level" />

        <span>{levelValue}</span>
      </Stack>

      {isWildernessValue && (
        <Stack className="w-100" direction="horizontal" gap={3}>
          <ImageIcon
            icon={progressIcon}
            placement={UIOverlayPlacement.Bottom}
            tooltip="Level progress"
          />

          <Progress
            label={`${progressValue}/${progressMaxValue}`}
            value={(progressValue / progressMaxValue) * 100}
            variant={UIVariant.Primary}
          />
        </Stack>
      )}
    </Stack>
  );
}
