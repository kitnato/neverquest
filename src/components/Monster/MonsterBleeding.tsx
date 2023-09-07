import { useRecoilValue, useResetRecoilState, useSetRecoilState } from "recoil";

import { IconDisplay } from "@neverquest/components/IconDisplay";
import { MonsterAilmentMeter } from "@neverquest/components/Monster/MonsterAilmentMeter";
import { BLEED } from "@neverquest/data/statistics";
import { useChangeMonsterHealth } from "@neverquest/hooks/actions/useChangeMonsterHealth";
import { useAnimate } from "@neverquest/hooks/useAnimate";
import { ReactComponent as IconBleeding } from "@neverquest/icons/bleeding.svg";
import {
  bleedDamageTotal,
  canReceiveAilment,
  isMonsterAiling,
  monsterAilmentDuration,
  monsterBleedingDelta,
} from "@neverquest/state/monster";

export function MonsterBleeding() {
  const bleedDamageTotalValue = useRecoilValue(bleedDamageTotal);
  const canReceiveBleeding = useRecoilValue(canReceiveAilment("bleeding"));
  const isMonsterBleedingValue = useRecoilValue(isMonsterAiling("bleeding"));
  const resetMonsterBleedingDelta = useResetRecoilState(monsterBleedingDelta);
  const setMonsterBleedingDelta = useSetRecoilState(monsterBleedingDelta);
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
    stop: !isMonsterBleedingValue,
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
      contents={<MonsterAilmentMeter totalDuration={BLEED.duration} type="bleeding" />}
      Icon={IconBleeding}
      tooltip="Bleeding"
    />
  );
}
