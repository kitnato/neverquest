import { useRecoilValue, useResetRecoilState, useSetRecoilState } from "recoil";

import { IconDisplay } from "@neverquest/components/IconDisplay";
import { AilmentMeter } from "@neverquest/components/Monster/AilmentMeter";
import { useChangeMonsterHealth } from "@neverquest/hooks/actions/useChangeMonsterHealth";
import { useTimerDelta } from "@neverquest/hooks/useTimerDelta";
import IconBleeding from "@neverquest/icons/bleeding.svg?react";
import { bleed, canReceiveAilment } from "@neverquest/state/ailments";
import {
  bleedingDelta,
  isMonsterAiling,
  isMonsterDead,
  monsterAilmentDuration,
} from "@neverquest/state/monster";
import { bleedDamage } from "@neverquest/state/statistics";
import { getAnimationClass } from "@neverquest/utilities/getters";

export function Bleeding() {
  const { duration } = useRecoilValue(bleed);
  const bleedDamageValue = useRecoilValue(bleedDamage);
  const canReceiveAilmentBleeding = useRecoilValue(canReceiveAilment("bleeding"));
  const isMonsterBleedingValue = useRecoilValue(isMonsterAiling("bleeding"));
  const isMonsterDeadValue = useRecoilValue(isMonsterDead);
  const resetMonsterBleedingDelta = useResetRecoilState(bleedingDelta);
  const setMonsterBleedingDelta = useSetRecoilState(bleedingDelta);
  const setMonsterBleedingDuration = useSetRecoilState(monsterAilmentDuration("bleeding"));

  const changeMonsterHealth = useChangeMonsterHealth();

  const hasStoppedBleeding = !isMonsterBleedingValue || isMonsterDeadValue;

  useTimerDelta({
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

  useTimerDelta({
    delta: setMonsterBleedingDuration,
    onDelta: resetMonsterBleedingDelta,
    stop: hasStoppedBleeding,
  });

  if (canReceiveAilmentBleeding) {
    return (
      <IconDisplay
        className={getAnimationClass({ animation: "flipInX" })}
        Icon={IconBleeding}
        tooltip="Bleeding"
      >
        <AilmentMeter ailment="bleeding" totalDuration={duration} />
      </IconDisplay>
    );
  }
}
