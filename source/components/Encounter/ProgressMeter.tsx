import { Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { DeltasDisplay } from "@neverquest/components/DeltasDisplay";
import { LabelledProgressBar } from "@neverquest/components/LabelledProgressBar";
import { LABEL_UNKNOWN, PERCENTAGE_POINTS } from "@neverquest/data/general";
import { progress, progressMaximum } from "@neverquest/state/encounter";
import { formatNumber } from "@neverquest/utilities/formatters";

export function ProgressMeter() {
  const progressValue = useRecoilValue(progress);
  const progressMaximumValue = useRecoilValue(progressMaximum);

  return (
    <LabelledProgressBar
      value={
        progressMaximumValue === Number.POSITIVE_INFINITY
          ? PERCENTAGE_POINTS
          : (progressValue / progressMaximumValue) * PERCENTAGE_POINTS
      }
      variant="secondary"
    >
      <Stack direction="horizontal" gap={1}>
        <span>
          {formatNumber({ value: progressValue })}&nbsp;/&nbsp;
          {progressMaximumValue === Number.POSITIVE_INFINITY
            ? LABEL_UNKNOWN
            : formatNumber({
                value: progressMaximumValue,
              })}
        </span>

        <DeltasDisplay delta="progress" />
      </Stack>
    </LabelledProgressBar>
  );
}
