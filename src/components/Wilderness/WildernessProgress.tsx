import Stack from "react-bootstrap/Stack";
import { useRecoilValue } from "recoil";

import { FloatingText } from "@neverquest/components/FloatingText";
import { IconImage } from "@neverquest/components/IconImage";
import { LabelledProgressBar } from "@neverquest/components/LabelledProgressBar";
import { useDeltaText } from "@neverquest/hooks/useDeltaText";
import { ReactComponent as Icon } from "@neverquest/icons/stairs.svg";
import { deltas } from "@neverquest/state/deltas";
import { isWilderness, progress, progressMaximum } from "@neverquest/state/encounter";
import { DeltaType } from "@neverquest/types/enums";
import { OverlayPlacement, UIVariant } from "@neverquest/types/ui";

export function WildernessProgress() {
  const isWildernessValue = useRecoilValue(isWilderness);
  const progressValue = useRecoilValue(progress);
  const progressMaximumValue = useRecoilValue(progressMaximum);

  const deltaWildernessProgress = deltas(DeltaType.WildernessProgress);

  useDeltaText({
    atomDelta: deltaWildernessProgress,
    atomValue: progress,
    stop: (_, current) => current === 0,
  });

  if (!isWildernessValue) {
    return null;
  }

  return (
    <Stack className="w-100" direction="horizontal" gap={3}>
      <IconImage Icon={Icon} placement={OverlayPlacement.Bottom} tooltip="Progress" />

      <Stack className="w-100" direction="horizontal">
        <LabelledProgressBar
          label={`${progressValue}/${progressMaximumValue}`}
          value={(progressValue / progressMaximumValue) * 100}
          variant={UIVariant.Primary}
        />

        <FloatingText type={DeltaType.WildernessProgress} />
      </Stack>
    </Stack>
  );
}
