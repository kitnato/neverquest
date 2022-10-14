import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

import LabelledProgressBar from "@neverquest/components/LabelledProgressBar";
import { BLEED_DELTA, BLEED_DURATION } from "@neverquest/constants/attributes";
import useAnimation from "@neverquest/hooks/useAnimation";
import { deltas } from "@neverquest/state/deltas";
import { currentHealthMonster, monsterBleedingDuration } from "@neverquest/state/monster";
import { bleedDamageDelta } from "@neverquest/state/statistics";
import { DeltaType } from "@neverquest/types/enums";
import { FloatingText, UIVariant } from "@neverquest/types/ui";
import { formatMilliseconds } from "@neverquest/utilities/helpers";

export default function () {
  const [monsterBleedingDurationValue, setMonsterBleedingDuration] =
    useRecoilState(monsterBleedingDuration);
  const bleedDamageValue = useRecoilValue(bleedDamageDelta);
  const setCurrentHealthMonster = useSetRecoilState(currentHealthMonster);
  const setDeltaMonsterHealth = useSetRecoilState(deltas(DeltaType.HealthMonster));
  const [deltaBleeding, setDeltaBleeding] = useState(0);

  const stoppedBleeding = monsterBleedingDurationValue <= 0;

  useAnimation((delta) => {
    setMonsterBleedingDuration((current) => current - delta);
    setDeltaBleeding((current) => current + delta);
  }, stoppedBleeding);

  useEffect(() => {
    if (deltaBleeding >= BLEED_DELTA) {
      setCurrentHealthMonster((current) => current - bleedDamageValue);
      setDeltaMonsterHealth([
        {
          color: FloatingText.Negative,
          value: -bleedDamageValue,
        },
        {
          color: FloatingText.Negative,
          value: ` BLEED`,
        },
      ]);
      setDeltaBleeding(0);
    }
  }, [bleedDamageValue, deltaBleeding, setCurrentHealthMonster, setDeltaMonsterHealth]);

  useEffect(() => {
    if (stoppedBleeding) {
      setMonsterBleedingDuration(0);
      setDeltaBleeding(0);
    }
  }, [setMonsterBleedingDuration, stoppedBleeding]);

  return (
    <LabelledProgressBar
      disableTransitions
      label={formatMilliseconds(monsterBleedingDurationValue)}
      value={(monsterBleedingDurationValue / BLEED_DURATION) * 100}
      variant={UIVariant.Secondary}
    />
  );
}
