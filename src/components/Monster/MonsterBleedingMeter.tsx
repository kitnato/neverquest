import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

import LabelledProgressBar from "@neverquest/components/LabelledProgressBar";
import { BLEED } from "@neverquest/constants";
import useAnimation from "@neverquest/hooks/useAnimation";
import { deltas } from "@neverquest/state/deltas";
import { monsterBleedingDuration, monsterCurrentHealth } from "@neverquest/state/monster";
import { bleedDamage, damage } from "@neverquest/state/statistics";
import { DeltaType } from "@neverquest/types/enums";
import { FloatingText, UIVariant } from "@neverquest/types/ui";
import { formatMilliseconds } from "@neverquest/utilities/formatters";

export default function () {
  const setMonsterCurrentHealth = useSetRecoilState(monsterCurrentHealth);
  const setDeltaMonsterHealth = useSetRecoilState(deltas(DeltaType.HealthMonster));
  const [monsterBleedingDurationValue, setMonsterBleedingDuration] =
    useRecoilState(monsterBleedingDuration);
  const bleedDamageValue = useRecoilValue(bleedDamage);
  const damageValue = useRecoilValue(damage);

  const [deltaBleeding, setDeltaBleeding] = useState(0);

  const { duration, ticks } = BLEED;
  const bleedingDelta = duration / ticks;
  const bleedingDamage = ((damageValue * bleedDamageValue) / duration) * bleedingDelta;
  const hasBleedingStopped = monsterBleedingDurationValue <= 0;

  useAnimation((delta) => {
    setMonsterBleedingDuration((current) => current - delta);
    setDeltaBleeding((current) => current + delta);
  }, hasBleedingStopped);

  useEffect(() => {
    if (deltaBleeding >= bleedingDelta) {
      setMonsterCurrentHealth((current) => current - bleedingDamage);
      setDeltaMonsterHealth([
        {
          color: FloatingText.Negative,
          value: "BLEEDING",
        },
        {
          color: FloatingText.Negative,
          value: ` (-${bleedingDamage})`,
        },
      ]);
      setDeltaBleeding(0);
    }
  }, [
    bleedingDamage,
    bleedingDelta,
    setMonsterCurrentHealth,
    setDeltaMonsterHealth,
    deltaBleeding,
  ]);

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
