import { useRecoilValue, useResetRecoilState, useSetRecoilState } from "recoil";

import { IconDisplay } from "@neverquest/components/IconDisplay";
import { MonsterAilmentMeter } from "@neverquest/components/Monster/MonsterAilmentMeter";
import { useChangeMonsterHealth } from "@neverquest/hooks/actions/useChangeMonsterHealth";
import { useAnimate } from "@neverquest/hooks/useAnimate";
import IconBleeding from "@neverquest/icons/bleeding.svg?react";
import { bleed, canReceiveAilment } from "@neverquest/state/ailments";
import {
  bleedingDelta,
  isMonsterAiling,
  isMonsterDead,
  monsterAilmentDuration,
} from "@neverquest/state/monster";
import { bleedDamage } from "@neverquest/state/statistics";

export function MonsterBleeding() {
  const { duration } = useRecoilValue(bleed);
  const bleedDamageValue = useRecoilValue(bleedDamage);
  const canReceiveBleeding = useRecoilValue(canReceiveAilment("bleeding"));
  const isMonsterBleedingValue = useRecoilValue(isMonsterAiling("bleeding"));
  const isMonsterDeadValue = useRecoilValue(isMonsterDead);
  const resetMonsterBleedingDelta = useResetRecoilState(bleedingDelta);
  const setMonsterBleedingDelta = useSetRecoilState(bleedingDelta);
  const setMonsterBleedingDuration = useSetRecoilState(monsterAilmentDuration("bleeding"));

  const changeMonsterHealth = useChangeMonsterHealth();

  const hasStoppedBleeding = !isMonsterBleedingValue || isMonsterDeadValue;

  useAnimate({
    delta: setMonsterBleedingDelta,
    onDelta: () => {
      changeMonsterHealth({
        damageType: "bleeding",
        value: -bleedDamageValue,
      });

      resetMonsterBleedingDelta();
    },
    stop: hasStoppedBleeding,
  });

  useAnimate({
    delta: setMonsterBleedingDuration,
    onDelta: resetMonsterBleedingDelta,
    stop: hasStoppedBleeding,
  });

  if (canReceiveBleeding) {
    return (
      <IconDisplay Icon={IconBleeding} tooltip="Bleeding">
        <MonsterAilmentMeter ailment="bleeding" totalDuration={duration} />
      </IconDisplay>
    );
  }
}
