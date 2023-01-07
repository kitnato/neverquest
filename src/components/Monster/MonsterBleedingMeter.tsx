import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";

import LabelledProgressBar from "@neverquest/components/LabelledProgressBar";
import { BLEED } from "@neverquest/constants";
import useChangeMonsterHealth from "@neverquest/hooks/actions/useChangeMonsterHealth";
import useAnimation from "@neverquest/hooks/useAnimation";
import { monsterBleedingDuration } from "@neverquest/state/monster";
import { bleedDamage, damage } from "@neverquest/state/statistics";
import { FloatingText, UIVariant } from "@neverquest/types/ui";
import { formatMilliseconds } from "@neverquest/utilities/formatters";
import { getDamagePerTick } from "@neverquest/utilities/getters";

export default function () {
  const [monsterBleedingDurationValue, setMonsterBleedingDuration] =
    useRecoilState(monsterBleedingDuration);
  const bleedDamageValue = useRecoilValue(bleedDamage);
  const damageValue = useRecoilValue(damage);

  const [deltaBleeding, setDeltaBleeding] = useState(0);

  const changeMonsterHealth = useChangeMonsterHealth();

  const { duration, ticks } = BLEED;
  const bleedingDelta = duration / ticks;
  const bleedingDamage = getDamagePerTick({
    damage: damageValue,
    duration,
    proportion: bleedDamageValue,
    ticks,
  });
  const hasBleedingStopped = monsterBleedingDurationValue <= 0;

  useAnimation((delta) => {
    setMonsterBleedingDuration((current) => current - delta);
    setDeltaBleeding((current) => current + delta);
  }, hasBleedingStopped);

  useEffect(() => {
    if (deltaBleeding >= bleedingDelta) {
      changeMonsterHealth({
        delta: {
          color: FloatingText.Negative,
          value: `BLEEDING (-${bleedingDamage})`,
        },
        value: -bleedingDamage,
      });
      setDeltaBleeding(0);
    }
  }, [bleedingDamage, bleedingDelta, deltaBleeding, changeMonsterHealth]);

  useEffect(() => {
    if (hasBleedingStopped) {
      setMonsterBleedingDuration(0);
      setDeltaBleeding(0);
    }
  }, [setMonsterBleedingDuration, hasBleedingStopped]);

  return (
    <LabelledProgressBar
      disableTransitions
      label={formatMilliseconds(monsterBleedingDurationValue)}
      value={(monsterBleedingDurationValue / duration) * 100}
      variant={UIVariant.Secondary}
    />
  );
}
