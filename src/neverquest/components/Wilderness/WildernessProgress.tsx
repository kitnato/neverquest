import { useAtomValue } from "jotai";
import Stack from "react-bootstrap/Stack";

import ImageIcon from "neverquest/components/ImageIcon";
import LabelledProgressBar from "neverquest/components/LabelledProgressBar";
import levelIcon from "neverquest/icons/flying-flag.svg";
import progressIcon from "neverquest/icons/stairs.svg";
import { isWilderness, level, progress, progressMax } from "neverquest/state/global";
import { showWildernessProgress } from "neverquest/state/show";
import { AnimationType, OverlayPlacement, UIVariant } from "neverquest/types/ui";
import { getAnimationClass } from "neverquest/utilities/helpers";

export default function WildernessProgress() {
  const isWildernessValue = useAtomValue(isWilderness);
  const levelValue = useAtomValue(level);
  const progressValue = useAtomValue(progress);
  const progressMaxValue = useAtomValue(progressMax);
  const showWildernessProgressValue = useAtomValue(showWildernessProgress);

  if (!showWildernessProgressValue) {
    return null;
  }

  return (
    <Stack className={getAnimationClass(AnimationType.FlipInX)} direction="horizontal" gap={5}>
      <Stack direction="horizontal" gap={3}>
        <ImageIcon icon={levelIcon} placement={OverlayPlacement.Bottom} tooltip="Level" />

        <span>{levelValue}</span>
      </Stack>

      {isWildernessValue && (
        <Stack className="w-100" direction="horizontal" gap={3}>
          <ImageIcon icon={progressIcon} placement={OverlayPlacement.Bottom} tooltip="Progress" />

          <LabelledProgressBar
            label={`${progressValue}/${progressMaxValue}`}
            value={(progressValue / progressMaxValue) * 100}
            variant={UIVariant.Primary}
          />
        </Stack>
      )}
    </Stack>
  );
}
