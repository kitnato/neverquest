import { Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { IconImage } from "@neverquest/components/IconImage";
import { LabelledProgressBar } from "@neverquest/components/LabelledProgressBar";
import { LABEL_MAXIMUM } from "@neverquest/data/general";
import { INFUSABLE_LEVEL_MAXIMUM } from "@neverquest/data/inventory";
import { ReactComponent as IconEssence } from "@neverquest/icons/essence.svg";
import { infusionCurrent, infusionLevel, infusionMaximum } from "@neverquest/state/items";
import type { Infusable } from "@neverquest/types/unions";
import { formatValue } from "@neverquest/utilities/formatters";

export function InfusionProgress({ infusable }: { infusable: Infusable }) {
  const infusionCurrentValue = useRecoilValue(infusionCurrent(infusable));
  const infusionMaximumValue = useRecoilValue(infusionMaximum(infusable));
  const infusionLevelValue = useRecoilValue(infusionLevel(infusable));

  if (infusionLevelValue >= INFUSABLE_LEVEL_MAXIMUM) {
    return <span className="text-center w-100">{LABEL_MAXIMUM}</span>;
  }

  return (
    <LabelledProgressBar
      disableTransitions
      label={
        <Stack direction="horizontal" gap={1}>
          <IconImage Icon={IconEssence} isStencilled size="small" />

          {`${formatValue({ value: infusionCurrentValue })}/${formatValue({
            value: infusionMaximumValue,
          })}`}
        </Stack>
      }
      value={(infusionCurrentValue / infusionMaximumValue) * 100}
      variant="secondary"
    />
  );
}
