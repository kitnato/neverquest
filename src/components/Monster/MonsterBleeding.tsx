import { useRecoilValue, useResetRecoilState, useSetRecoilState } from "recoil";

import { IconDisplay } from "@neverquest/components/IconDisplay";
import { MonsterAilmentMeter } from "@neverquest/components/Monster/MonsterAilmentMeter";
import { useChangeMonsterHealth } from "@neverquest/hooks/actions/useChangeMonsterHealth";
import { useAnimate } from "@neverquest/hooks/useAnimate";
import IconBleeding from "@neverquest/icons/bleeding.svg?react";
import {
  bleed,
  bleedingDelta,
  canReceiveAilment,
  isMonsterAiling,
  isMonsterDead,
  monsterAilmentDuration,
} from "@neverquest/state/monster";
import { bleedDamageTotal } from "@neverquest/state/statistics";

export function MonsterBleeding() {
  const bleedValue = useRecoilValue(bleed);
  const bleedDamageTotalValue = useRecoilValue(bleedDamageTotal);
  const canReceiveBleeding = useRecoilValue(canReceiveAilment("bleeding"));
  const isMonsterBleedingValue = useRecoilValue(isMonsterAiling("bleeding"));
  const isMonsterDeadValue = useRecoilValue(isMonsterDead);
  const resetMonsterBleedingDelta = useResetRecoilState(bleedingDelta);
  const setMonsterBleedingDelta = useSetRecoilState(bleedingDelta);
  const setMonsterBleedingDuration = useSetRecoilState(monsterAilmentDuration("bleeding"));

  const changeMonsterHealth = useChangeMonsterHealth();

  useAnimate({
    delta: setMonsterBleedingDelta,
    onDelta: () => {
      changeMonsterHealth({
        delta: [
          {
            color: "text-muted",
            value: "BLEEDING",
          },
          {
            color: "text-danger",
            value: `-${bleedDamageTotalValue}`,
          },
        ],
        value: -bleedDamageTotalValue,
      });

      resetMonsterBleedingDelta();
    },
    stop: !isMonsterBleedingValue || isMonsterDeadValue,
  });

  useAnimate({
    delta: setMonsterBleedingDuration,
    onDelta: resetMonsterBleedingDelta,
    stop: !isMonsterBleedingValue,
  });

  if (!canReceiveBleeding) {
    return null;
  }

  return (
    <IconDisplay
      contents={<MonsterAilmentMeter ailment="bleeding" totalDuration={bleedValue.duration} />}
      Icon={IconBleeding}
      tooltip="Bleeding"
    />
  );
}
