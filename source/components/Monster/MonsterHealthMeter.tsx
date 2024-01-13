import { Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { DeltasDisplay } from "@neverquest/components/DeltasDisplay";
import { LabelledProgressBar } from "@neverquest/components/LabelledProgressBar";
import { LABEL_MAXIMUM, PERCENTAGE_POINTS } from "@neverquest/data/general";
import { useDeltaText } from "@neverquest/hooks/useDeltaText";
import { monsterHealth, monsterHealthMaximum } from "@neverquest/state/monster";
import { formatNumber } from "@neverquest/utilities/formatters";

export function MonsterHealthMeter() {
  const monsterHealthValue = useRecoilValue(monsterHealth);
  const monsterHealthMaximumValue = useRecoilValue(monsterHealthMaximum);

  useDeltaText({
    delta: "monsterHealthMaximum",
    state: monsterHealthMaximum,
    suffix: LABEL_MAXIMUM,
  });

  return (
    <LabelledProgressBar
      attachment="below"
      value={(monsterHealthValue / monsterHealthMaximumValue) * PERCENTAGE_POINTS}
      variant="dark"
    >
      <Stack direction="horizontal" gap={1}>
        <span>
          {formatNumber({ value: monsterHealthValue })}&nbsp;/&nbsp;
          {formatNumber({
            value: monsterHealthMaximumValue,
          })}
        </span>

        <Stack>
          <DeltasDisplay delta="monsterHealth" />

          <DeltasDisplay delta="monsterHealthMaximum" />
        </Stack>
      </Stack>
    </LabelledProgressBar>
  );
}
