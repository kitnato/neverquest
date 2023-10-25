import { Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { FloatingTextQueue } from "@neverquest/components/FloatingTextQueue";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { LabelledProgressBar } from "@neverquest/components/LabelledProgressBar";
import { useDeltaText } from "@neverquest/hooks/useDeltaText";
import IconProgress from "@neverquest/icons/progress.svg?react";
import { isWilderness, progress, progressMaximum } from "@neverquest/state/encounter";
import { formatNumber } from "@neverquest/utilities/formatters";

export function Progress() {
  const isWildernessValue = useRecoilValue(isWilderness);
  const progressValue = useRecoilValue(progress);
  const progressMaximumValue = useRecoilValue(progressMaximum);

  useDeltaText({
    delta: "progress",
    stop: ({ current }) => current === 0,
    value: progress,
  });

  if (!isWildernessValue) {
    return null;
  }

  return (
    <Stack className="w-100">
      <IconDisplay
        Icon={IconProgress}
        iconProps={{ overlayPlacement: "bottom" }}
        tooltip="Progress"
      >
        <Stack className="w-100" direction="horizontal">
          <LabelledProgressBar
            value={(progressValue / progressMaximumValue) * 100}
            variant="dark"
          >{`${formatNumber({ value: progressValue })}/${formatNumber({
            value: progressMaximumValue,
          })}`}</LabelledProgressBar>

          <FloatingTextQueue delta="progress" />
        </Stack>
      </IconDisplay>
    </Stack>
  );
}
