import { useRecoilValue, useSetRecoilState } from "recoil";

import { IconDisplay } from "@neverquest/components/IconDisplay";
import { MonsterBleedingMeter } from "@neverquest/components/Monster/MonsterBleedingMeter";
import { useAnimate } from "@neverquest/hooks/useAnimate";
import { ReactComponent as IconBleeding } from "@neverquest/icons/bleeding.svg";
import { monsterBleedingDelta } from "@neverquest/state/deltas";
import {
  canReceiveAilment,
  isMonsterAiling,
  monsterAilmentDuration,
} from "@neverquest/state/monster";

export function MonsterBleeding() {
  const canReceiveBleeding = useRecoilValue(canReceiveAilment("bleeding"));
  const isMonsterBleedingValue = useRecoilValue(isMonsterAiling("bleeding"));
  const setMonsterBleedingDelta = useSetRecoilState(monsterBleedingDelta);
  const setMonsterBleedingDuration = useSetRecoilState(monsterAilmentDuration("bleeding"));

  useAnimate({
    delta: setMonsterBleedingDelta,
    stop: !isMonsterBleedingValue,
  });

  useAnimate({
    delta: setMonsterBleedingDuration,
    stop: !isMonsterBleedingValue,
  });

  if (!canReceiveBleeding) {
    return null;
  }

  return <IconDisplay contents={<MonsterBleedingMeter />} Icon={IconBleeding} tooltip="Bleeding" />;
}
