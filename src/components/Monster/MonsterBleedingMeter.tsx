import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";

import LabelledProgressBar from "@neverquest/components/LabelledProgressBar";
import { BLEED } from "@neverquest/constants";
import useChangeMonsterHealth from "@neverquest/hooks/actions/useChangeMonsterHealth";
import useAnimation from "@neverquest/hooks/useAnimation";
import { monsterBleedingDelta } from "@neverquest/state/deltas";
import { monsterBleedingDuration } from "@neverquest/state/monster";
import { bleedDamage, damage } from "@neverquest/state/statistics";
import { FloatingTextVariant, UIVariant } from "@neverquest/types/ui";
import { formatMilliseconds } from "@neverquest/utilities/formatters";
import { getDamagePerTick } from "@neverquest/utilities/getters";

export default function () {
  const resetMonsterBleedingDelta = useResetRecoilState(monsterBleedingDelta);
  const [monsterBleedingDeltaValue, setMonsterBleedingDelta] = useRecoilState(monsterBleedingDelta);
  const [monsterBleedingDurationValue, setMonsterBleedingDuration] =
    useRecoilState(monsterBleedingDuration);
  const bleedDamageValue = useRecoilValue(bleedDamage);
  const damageValue = useRecoilValue(damage);

  const changeMonsterHealth = useChangeMonsterHealth();

  const { duration, ticks } = BLEED;
  const bleedingDelta = duration / ticks;
  const bleedingDamage = getDamagePerTick({
    damage: damageValue,
    duration,
    proportion: bleedDamageValue,
    ticks,
  });

  useAnimation((delta) => {
    const newDelta = monsterBleedingDeltaValue + delta;

    if (newDelta >= bleedingDelta) {
      changeMonsterHealth({
        delta: {
          color: FloatingTextVariant.Negative,
          value: `BLEEDING (-${bleedingDamage})`,
        },
        value: -bleedingDamage,
      });
      resetMonsterBleedingDelta();
    } else {
      setMonsterBleedingDelta(newDelta);
    }

    let newDuration = monsterBleedingDurationValue - delta;

    if (newDuration < 0) {
      newDuration = 0;
    }

    setMonsterBleedingDuration(newDuration);
  }, monsterBleedingDurationValue <= 0);

  return (
    <LabelledProgressBar
      disableTransitions
      label={formatMilliseconds(monsterBleedingDurationValue)}
      value={(monsterBleedingDurationValue / duration) * 100}
      variant={UIVariant.Secondary}
    />
  );
}
