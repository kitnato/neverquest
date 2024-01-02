import { useRecoilValue } from "recoil";

import { IconDisplay } from "@neverquest/components/IconDisplay";
import { LabelledProgressBar } from "@neverquest/components/LabelledProgressBar";
import { LABEL_MAXIMUM, PERCENTAGE_POINTS } from "@neverquest/data/general";
import IconEssence from "@neverquest/icons/essence.svg?react";
import { infusion, infusionMaximum, isInfusionAtMaximum } from "@neverquest/state/items";
import type { Infusable } from "@neverquest/types/unions";
import { formatNumber } from "@neverquest/utilities/formatters";

export function InfusionProgress({ infusable }: { infusable: Infusable }) {
  const infusionValue = Math.round(useRecoilValue(infusion(infusable)));
  const isInfusionAtMaximumValue = useRecoilValue(isInfusionAtMaximum(infusable));
  const infusionMaximumValue = useRecoilValue(infusionMaximum(infusable));

  return (
    <LabelledProgressBar
      disableTransitions
      value={
        isInfusionAtMaximumValue
          ? PERCENTAGE_POINTS
          : (infusionValue / infusionMaximumValue) * PERCENTAGE_POINTS
      }
      variant="secondary"
    >
      <IconDisplay Icon={IconEssence} iconProps={{ className: "small stencilled" }}>
        <span>
          {isInfusionAtMaximumValue
            ? LABEL_MAXIMUM
            : `${formatNumber({ value: infusionValue })} / ${formatNumber({
                value: infusionMaximumValue,
              })}`}
        </span>
      </IconDisplay>
    </LabelledProgressBar>
  );
}
