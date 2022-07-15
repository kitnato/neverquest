import { useAtomValue } from "jotai";
import Stack from "react-bootstrap/Stack";

import ImageIcon from "neverquest/components/ImageIcon";
import LabelledProgressBar from "neverquest/components/LabelledProgressBar";
import progressIcon from "neverquest/icons/stairs.svg";
import { isWilderness, progress, progressMax } from "neverquest/state/encounter";
import { OverlayPlacement, UIVariant } from "neverquest/types/ui";

export default function WildernessProgress() {
  const isWildernessValue = useAtomValue(isWilderness);
  const progressValue = useAtomValue(progress);
  const progressMaxValue = useAtomValue(progressMax);

  if (!isWildernessValue) {
    return null;
  }

  return (
    <Stack className="w-100" direction="horizontal" gap={3}>
      <ImageIcon icon={progressIcon} placement={OverlayPlacement.Bottom} tooltip="Progress" />

      <LabelledProgressBar
        label={`${progressValue}/${progressMaxValue}`}
        value={(progressValue / progressMaxValue) * 100}
        variant={UIVariant.Primary}
      />
    </Stack>
  );
}
