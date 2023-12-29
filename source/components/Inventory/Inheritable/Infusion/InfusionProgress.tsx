import { Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { IconImage } from "@neverquest/components/IconImage";
import { LabelledProgressBar } from "@neverquest/components/LabelledProgressBar";
import { LABEL_MAXIMUM, LEVELLING_MAXIMUM, PERCENTAGE_POINTS } from "@neverquest/data/general";
import IconEssence from "@neverquest/icons/essence.svg?react";
import { infusion, infusionLevel, infusionMaximum } from "@neverquest/state/items";
import type { Infusable } from "@neverquest/types/unions";
import { formatNumber } from "@neverquest/utilities/formatters";

export function InfusionProgress({ infusable }: { infusable: Infusable }) {
  const infusionValue = Math.round(useRecoilValue(infusion(infusable)));
  const infusionMaximumValue = useRecoilValue(infusionMaximum(infusable));
  const infusionLevelValue = useRecoilValue(infusionLevel(infusable));

  if (infusionLevelValue >= LEVELLING_MAXIMUM) {
    return <span className="text-center w-100">{LABEL_MAXIMUM}</span>;
  }

  return (
    <LabelledProgressBar
      disableTransitions
      value={(infusionValue / infusionMaximumValue) * PERCENTAGE_POINTS}
      variant="secondary"
    >
      <Stack direction="horizontal" gap={1}>
        <IconImage className="small stencilled" Icon={IconEssence} />

        <span>
          {formatNumber({ value: infusionValue })}/
          {formatNumber({
            value: infusionMaximumValue,
          })}
        </span>
      </Stack>
    </LabelledProgressBar>
  );
}
