import { useEffect } from "react";
import { useRecoilValue } from "recoil";

import { IconDisplay } from "@neverquest/components/IconDisplay";
import { MonsterHealthMeter } from "@neverquest/components/Monster/MonsterHealthMeter";
import { useRegenerateMonster } from "@neverquest/hooks/actions/useRegenerateMonster";
import IconMonsterHealth from "@neverquest/icons/monster-health.svg?react";
import { isAttacking } from "@neverquest/state/character";
import { isMonsterAiling } from "@neverquest/state/monster";

export function MonsterHealth() {
  const isAttackingValue = useRecoilValue(isAttacking);
  const isMonsterBurning = useRecoilValue(isMonsterAiling("burning"));

  const regenerateMonster = useRegenerateMonster();

  useEffect(() => {
    if (!isAttackingValue && !isMonsterBurning) {
      regenerateMonster();
    }
  }, [isAttackingValue, isMonsterBurning, regenerateMonster]);

  return (
    <IconDisplay Icon={IconMonsterHealth} tooltip="Monster health">
      <MonsterHealthMeter />
    </IconDisplay>
  );
}
