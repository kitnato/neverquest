import { Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { IconImage } from "@neverquest/components/IconImage";
import { LabelledProgressBar } from "@neverquest/components/LabelledProgressBar";
import { LABEL_MAXIMUM, LEVEL_MAXIMUM } from "@neverquest/data/general";
import IconEssence from "@neverquest/icons/essence.svg?react";
import { infusionCurrent, infusionLevel, infusionMaximum } from "@neverquest/state/items";
import type { Infusable } from "@neverquest/types/unions";
import { formatNumber } from "@neverquest/utilities/formatters";

export function InfusionProgress({ infusable }: { infusable: Infusable }) {
  const infusionCurrentValue = useRecoilValue(infusionCurrent(infusable));
  const infusionMaximumValue = useRecoilValue(infusionMaximum(infusable));
  const infusionLevelValue = useRecoilValue(infusionLevel(infusable));

  if (infusionLevelValue >= LEVEL_MAXIMUM) {
    return <span className="text-center w-100">{LABEL_MAXIMUM}</span>;
  }

  return (
    <LabelledProgressBar
      disableTransitions
      value={(infusionCurrentValue / infusionMaximumValue) * 100}
      variant="secondary"
    >
      <Stack direction="horizontal" gap={1}>
        <IconImage Icon={IconEssence} isStencilled size="small" />

        {`${formatNumber({ value: infusionCurrentValue })}/${formatNumber({
          value: infusionMaximumValue,
        })}`}
      </Stack>
    </LabelledProgressBar>
  );
}
