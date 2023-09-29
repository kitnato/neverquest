import { useRecoilValue } from "recoil";

import { IconImage } from "@neverquest/components/IconImage";
import { LabelledProgressBar } from "@neverquest/components/LabelledProgressBar";
import { ReactComponent as IconEssence } from "@neverquest/icons/essence.svg";
import { monkeyPawInfusion, monkeyPawMaximum } from "@neverquest/state/items";
import { formatValue } from "@neverquest/utilities/formatters";

export function MonkeyPawInfusionMeter() {
  const monkeyPawInfusionValue = useRecoilValue(monkeyPawInfusion);
  const monkeyPawMaximumValue = useRecoilValue(monkeyPawMaximum);

  return (
    <LabelledProgressBar
      disableTransitions
      label={
        <>
          <IconImage Icon={IconEssence} isStencilled size="tiny" />
          &nbsp;
          {`${formatValue({ value: monkeyPawInfusionValue })}/${formatValue({
            value: monkeyPawMaximumValue,
          })}`}
        </>
      }
      value={(monkeyPawInfusionValue / monkeyPawMaximumValue) * 100}
      variant="secondary"
    />
  );
}
