import { useRecoilValue, useSetRecoilState } from "recoil";

import { IconDisplay } from "@neverquest/components/IconDisplay";
import { MonsterAttackMeter } from "@neverquest/components/Monster/MonsterAttackMeter";
import { AILMENT_PENALTY } from "@neverquest/data/statistics";
import { useDefend } from "@neverquest/hooks/actions/useDefend";
import { useAnimate } from "@neverquest/hooks/useAnimate";
import IconMonsterAttackRate from "@neverquest/icons/monster-attack-rate.svg?react";
import { isAttacking } from "@neverquest/state/character";
import {
  hasMonsterClosed,
  isMonsterAiling,
  isMonsterDead,
  monsterAttackDuration,
} from "@neverquest/state/monster";

export function MonsterAttackRate() {
  const hasMonsterClosedValue = useRecoilValue(hasMonsterClosed);
  const isAttackingValue = useRecoilValue(isAttacking);
  const isMonsterDeadValue = useRecoilValue(isMonsterDead);
  const isMonsterFrozen = useRecoilValue(isMonsterAiling("frozen"));
  const setMonsterAttackDuration = useSetRecoilState(monsterAttackDuration);

  const defend = useDefend();

  useAnimate({
    delta: setMonsterAttackDuration,
    factor: isMonsterFrozen ? AILMENT_PENALTY.frozen : 1,
    onDelta: defend,
    stop: !isAttackingValue || !hasMonsterClosedValue || isMonsterDeadValue,
  });

  return (
    <IconDisplay Icon={IconMonsterAttackRate} tooltip="Monster attack rate">
      <MonsterAttackMeter />
    </IconDisplay>
  );
}
