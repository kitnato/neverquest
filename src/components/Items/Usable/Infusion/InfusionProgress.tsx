import { Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { IconImage } from "@neverquest/components/IconImage";
import { LabelledProgressBar } from "@neverquest/components/LabelledProgressBar";
import { ReactComponent as IconEssence } from "@neverquest/icons/essence.svg";
import { infusionCurrent, infusionMaximum } from "@neverquest/state/items";
import type { Infusable } from "@neverquest/types/unions";
import { formatValue } from "@neverquest/utilities/formatters";

export function InfusionProgress({ infusable }: { infusable: Infusable }) {
  const infusionCurrentValue = useRecoilValue(infusionCurrent(infusable));
  const infusionMaximumValue = useRecoilValue(infusionMaximum(infusable));

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
