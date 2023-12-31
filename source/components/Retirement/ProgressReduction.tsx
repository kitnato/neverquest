import { Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { IconDisplay } from "@neverquest/components/IconDisplay";
import IconProgressReduction from "@neverquest/icons/progress-reduction.svg?react";
import { stageMaximum } from "@neverquest/state/encounter";
import { formatNumber } from "@neverquest/utilities/formatters";
import { getProgressReduction } from "@neverquest/utilities/getters";

export function ProgressReduction() {
  const stageMaximumValue = useRecoilValue(stageMaximum);

  return (
    <Stack gap={3}>
      <h6>Monster density</h6>

      <IconDisplay
        Icon={IconProgressReduction}
        iconProps={{ isFlipped: true }}
        tooltip="Monster density"
      >
        -
        {formatNumber({
          format: "percentage",
          value: getProgressReduction(stageMaximumValue),
        })}
      </IconDisplay>
    </Stack>
  );
}
