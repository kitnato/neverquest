import { Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { DeltasDisplay } from "@neverquest/components/DeltasDisplay";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { LabelledProgressBar } from "@neverquest/components/LabelledProgressBar";
import { useDeltaText } from "@neverquest/hooks/useDeltaText";
import IconProgress from "@neverquest/icons/progress.svg?react";
import { location, progress, progressMaximum } from "@neverquest/state/encounter";
import { formatNumber } from "@neverquest/utilities/formatters";

export function Progress() {
  const locationValue = useRecoilValue(location);
  const progressValue = useRecoilValue(progress);
  const progressMaximumValue = useRecoilValue(progressMaximum);

  useDeltaText({
    delta: "progress",
    state: progress,
    stop: ({ current }) => current === 0,
  });

  if (locationValue === "wilderness") {
    return (
      <IconDisplay
        className="w-100"
        Icon={IconProgress}
        iconProps={{ overlayPlacement: "bottom" }}
        tooltip="Progress"
      >
        <Stack direction="horizontal">
          <LabelledProgressBar
            value={(progressValue / progressMaximumValue) * 100}
            variant="secondary"
          >
            <Stack direction="horizontal" gap={1}>
              <span>{`${formatNumber({ value: progressValue })}/${formatNumber({
                value: progressMaximumValue,
              })}`}</span>

              <DeltasDisplay delta="progress" />
            </Stack>
          </LabelledProgressBar>
        </Stack>
      </IconDisplay>
    );
  }
}
