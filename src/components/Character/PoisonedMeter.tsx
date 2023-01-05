import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

import LabelledProgressBar from "@neverquest/components/LabelledProgressBar";
import { POISON } from "@neverquest/constants";
import useAnimation from "@neverquest/hooks/useAnimation";
import { poisonDuration } from "@neverquest/state/character";
import { deltas } from "@neverquest/state/deltas";
import { monsterDamage } from "@neverquest/state/monster";
import { currentHealth } from "@neverquest/state/reserves";
import { DeltaType } from "@neverquest/types/enums";
import { FloatingText, UIVariant } from "@neverquest/types/ui";
import { formatMilliseconds } from "@neverquest/utilities/formatters";

export default function () {
  const setCurrentHealth = useSetRecoilState(currentHealth);
  const setDeltaHealth = useSetRecoilState(deltas(DeltaType.Health));
  const [poisonDurationValue, setPoisonDuration] = useRecoilState(poisonDuration);
  const monsterDamageValue = useRecoilValue(monsterDamage);

  const [deltaPoisoned, setDeltaPoisoned] = useState(0);

  const { damage, duration, ticks } = POISON;
  const poisonDelta = duration / ticks;
  const poisonDamage = ((monsterDamageValue * damage) / duration) * poisonDelta;
  const stoppedPoisoning = poisonDurationValue <= 0;

  useAnimation((delta) => {
    setPoisonDuration((current) => current - delta);
    setDeltaPoisoned((current) => current + delta);
  }, stoppedPoisoning);

  useEffect(() => {
    if (deltaPoisoned >= poisonDelta) {
      setCurrentHealth((current) => current - poisonDamage);
      setDeltaHealth([
        {
          color: FloatingText.Negative,
          value: "POISONED",
        },
        {
          color: FloatingText.Negative,
          value: ` (-${poisonDamage})`,
        },
      ]);
      setDeltaPoisoned(0);
    }
  }, [deltaPoisoned, poisonDamage, poisonDelta, setCurrentHealth, setDeltaHealth]);

  useEffect(() => {
    if (stoppedPoisoning) {
      setPoisonDuration(0);
      setDeltaPoisoned(0);
    }
  }, [setPoisonDuration, stoppedPoisoning]);

  return (
    <LabelledProgressBar
      disableTransitions
      label={formatMilliseconds(poisonDurationValue)}
      value={(poisonDurationValue / duration) * 100}
      variant={UIVariant.Secondary}
    />
  );
}
