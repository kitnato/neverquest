import { Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { IconImage } from "@neverquest/components/IconImage";
import { LabelledProgressBar } from "@neverquest/components/LabelledProgressBar";
import { ReactComponent as IconEssence } from "@neverquest/icons/essence.svg";
import { monkeyPawInfusion, monkeyPawMaximum } from "@neverquest/state/items";
import { formatValue } from "@neverquest/utilities/formatters";

export function MonkeyPawInfusionProgress() {
  const monkeyPawInfusionValue = useRecoilValue(monkeyPawInfusion);
  const monkeyPawMaximumValue = useRecoilValue(monkeyPawMaximum);

  return (
    <LabelledProgressBar
      disableTransitions
      label={
        <Stack direction="horizontal" gap={1}>
          <IconImage Icon={IconEssence} isStencilled size="small" />

          {`${formatValue({ value: monkeyPawInfusionValue })}/${formatValue({
            value: monkeyPawMaximumValue,
          })}`}
        </Stack>
      }
      value={(monkeyPawInfusionValue / monkeyPawMaximumValue) * 100}
      variant="secondary"
    />
  );
}
