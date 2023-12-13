import { Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { DeltasDisplay } from "../DeltasDisplay";
import { LabelledProgressBar } from "@neverquest/components/LabelledProgressBar";
import { monsterHealth, monsterHealthMaximum } from "@neverquest/state/monster";
import { formatNumber } from "@neverquest/utilities/formatters";

export function MonsterHealthMeter() {
  const monsterHealthValue = useRecoilValue(monsterHealth);
  const monsterHealthMaximumValue = useRecoilValue(monsterHealthMaximum);

  return (
    <LabelledProgressBar
      value={(monsterHealthValue / monsterHealthMaximumValue) * 100}
      variant="dark"
    >
      <Stack direction="horizontal" gap={1}>
        <span>{`${formatNumber({ value: monsterHealthValue })}/${formatNumber({
          value: monsterHealthMaximumValue,
        })}`}</span>

        <DeltasDisplay delta="monsterHealth" />
      </Stack>
    </LabelledProgressBar>
  );
}
