import { useRecoilValue, useSetRecoilState } from "recoil";

import { IconDisplay } from "@neverquest/components/IconDisplay";
import { MonsterAttackMeter } from "@neverquest/components/Monster/MonsterAttackMeter";
import { AILMENT_PENALTY } from "@neverquest/data/statistics";
import { useDefend } from "@neverquest/hooks/actions/useDefend";
import { useDeltaText } from "@neverquest/hooks/useDeltaText";
import { useTimerDelta } from "@neverquest/hooks/useTimerDelta";
import IconMonsterAttackRate from "@neverquest/icons/monster-attack-rate.svg?react";
import { isAttacking } from "@neverquest/state/character";
import {
  hasMonsterClosed,
  isMonsterAiling,
  isMonsterDead,
  monsterAttackDuration,
  monsterAttackRate,
} from "@neverquest/state/monster";

export function MonsterAttackRate() {
  const hasMonsterClosedValue = useRecoilValue(hasMonsterClosed);
  const isAttackingValue = useRecoilValue(isAttacking);
  const isMonsterDeadValue = useRecoilValue(isMonsterDead);
  const isMonsterFrozen = useRecoilValue(isMonsterAiling("frozen"));
  const setMonsterAttackDuration = useSetRecoilState(monsterAttackDuration);

  const defend = useDefend();

  useDeltaText({
    delta: "monsterAttackRate",
    format: "time",
    state: monsterAttackRate,
  });

  useTimerDelta({
    delta: setMonsterAttackDuration,
    factor: isMonsterFrozen ? 1 - AILMENT_PENALTY.frozen : 1,
    onDelta: defend,
    stop: !isAttackingValue || !hasMonsterClosedValue || isMonsterDeadValue,
  });

  return (
    <IconDisplay Icon={IconMonsterAttackRate} tooltip="Monster attack rate">
      <MonsterAttackMeter />
    </IconDisplay>
  );
}
