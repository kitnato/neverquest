import { Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { IconDisplay } from "@neverquest/components/IconDisplay";
import IconProgressDiscount from "@neverquest/icons/progress-discount.svg?react";
import { stageMaximum } from "@neverquest/state/encounter";
import { formatValue } from "@neverquest/utilities/formatters";
import { getProgressReduction } from "@neverquest/utilities/getters";

export function ProgressDiscount() {
  const stageMaximumValue = useRecoilValue(stageMaximum);

  return (
    <Stack gap={3}>
      <h6>Progress discount</h6>

      <IconDisplay
        contents={`-${formatValue({
          format: "percentage",
          value: getProgressReduction(stageMaximumValue),
        })}`}
        Icon={IconProgressDiscount}
        tooltip="Progress discount"
      />
    </Stack>
  );
}