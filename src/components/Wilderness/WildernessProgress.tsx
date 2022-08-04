import Stack from "react-bootstrap/Stack";
import { useRecoilValue } from "recoil";

import FloatingText from "@neverquest/components/FloatingText";
import ImageIcon from "@neverquest/components/ImageIcon";
import LabelledProgressBar from "@neverquest/components/LabelledProgressBar";
import useDeltaText from "@neverquest/hooks/useDeltaText";
import { ReactComponent as Icon } from "@neverquest/icons/stairs.svg";
import { deltas } from "@neverquest/state/deltas";
import { isWilderness, progress, progressMax } from "@neverquest/state/encounter";
import { DeltaType } from "@neverquest/types/enums";
import { OverlayPlacement, UIVariant } from "@neverquest/types/ui";

export default function WildernessProgress() {
  const isWildernessValue = useRecoilValue(isWilderness);
  const progressValue = useRecoilValue(progress);
  const progressMaxValue = useRecoilValue(progressMax);

  const deltaWildernessProgress = deltas(DeltaType.WildernessProgress);

  useDeltaText({
    deltaAtom: deltaWildernessProgress,
    stop: (_, current) => current === 0,
    valueAtom: progress,
  });

  if (!isWildernessValue) {
    return null;
  }

  return (
    <Stack className="w-100" direction="horizontal" gap={3}>
      <ImageIcon Icon={Icon} placement={OverlayPlacement.Bottom} tooltip="Progress" />

      <Stack className="w-100" direction="horizontal">
        <LabelledProgressBar
          label={`${progressValue}/${progressMaxValue}`}
          value={(progressValue / progressMaxValue) * 100}
          variant={UIVariant.Primary}
        />

        <FloatingText atom={deltaWildernessProgress} />
      </Stack>
    </Stack>
  );
}
