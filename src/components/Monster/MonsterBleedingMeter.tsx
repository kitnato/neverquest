import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";

import { LabelledProgressBar } from "@neverquest/components/LabelledProgressBar";
import { BLEED } from "@neverquest/data/statistics";
import { useChangeMonsterHealth } from "@neverquest/hooks/actions/useChangeMonsterHealth";
import { useAnimation } from "@neverquest/hooks/useAnimation";
import { monsterBleedingDelta } from "@neverquest/state/deltas";
import { isMonsterBleeding, monsterBleedingDuration } from "@neverquest/state/monster";
import { bleedDamage, damageTotal } from "@neverquest/state/statistics";
import { LABEL_EMPTY } from "@neverquest/utilities/constants";
import { formatMilliseconds } from "@neverquest/utilities/formatters";
import { getDamagePerTick } from "@neverquest/utilities/getters";

export function MonsterBleedingMeter() {
  const resetMonsterBleedingDelta = useResetRecoilState(monsterBleedingDelta);
  const [monsterBleedingDeltaValue, setMonsterBleedingDelta] = useRecoilState(monsterBleedingDelta);
  const [monsterBleedingDurationValue, setMonsterBleedingDuration] =
    useRecoilState(monsterBleedingDuration);
  const bleedDamageValue = useRecoilValue(bleedDamage);
  const damageTotalValue = useRecoilValue(damageTotal);
  const isMonsterBleedingValue = useRecoilValue(isMonsterBleeding);

  const changeMonsterHealth = useChangeMonsterHealth();

  const { duration, ticks } = BLEED;
  const bleedingDelta = duration / ticks;
  const bleedingDamage = getDamagePerTick({
    damage: damageTotalValue,
    duration,
    proportion: bleedDamageValue,
    ticks,
  });

  useAnimation((delta) => {
    const newDelta = monsterBleedingDeltaValue + delta;

    if (newDelta >= bleedingDelta) {
      changeMonsterHealth({
        delta: {
          color: "text-danger",
          value: `BLEEDING -${bleedingDamage}`,
        },
        value: -bleedingDamage,
      });

      resetMonsterBleedingDelta();
    } else {
      setMonsterBleedingDelta(newDelta);
    }

    setMonsterBleedingDuration((current) => {
      const value = current - delta;

      if (value < 0) {
        return 0;
      }

      return value;
    });
  }, !isMonsterBleedingValue);

  return (
    <LabelledProgressBar
      disableTransitions
      label={
        isMonsterBleedingValue ? formatMilliseconds(monsterBleedingDurationValue) : LABEL_EMPTY
      }
      value={(monsterBleedingDurationValue / duration) * 100}
      variant="secondary"
    />
  );
}
