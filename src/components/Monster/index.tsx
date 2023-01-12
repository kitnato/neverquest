import { useEffect } from "react";
import { Card } from "react-bootstrap";
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from "recoil";

import IconDisplay from "@neverquest/components/IconDisplay";
import MonsterStatus from "@neverquest/components/Monster/MonsterStatus";
import { LABEL_UNKNOWN } from "@neverquest/constants";
import { ReactComponent as Icon } from "@neverquest/icons/evil-eyes.svg";
import { lootingDuration, lootingRate } from "@neverquest/state/character";
import { isLevelStarted } from "@neverquest/state/encounter";
import { isMonsterDead, monsterAttackDuration } from "@neverquest/state/monster";
import { AnimationType } from "@neverquest/types/ui";
import { getAnimationClass } from "@neverquest/utilities/getters";

export default function () {
  const isLevelStartedValue = useRecoilValue(isLevelStarted);
  const isMonsterDeadValue = useRecoilValue(isMonsterDead);
  const lootingRateValue = useRecoilValue(lootingRate);
  const resetMonsterAttackDuration = useResetRecoilState(monsterAttackDuration);
  const setLootingDuration = useSetRecoilState(lootingDuration);

  useEffect(() => {
    if (isMonsterDeadValue) {
      setLootingDuration(lootingRateValue);
      resetMonsterAttackDuration();
    }
  }, [isMonsterDeadValue, lootingRateValue, setLootingDuration, resetMonsterAttackDuration]);

  if (isLevelStartedValue) {
    return <MonsterStatus />;
  }

  return (
    <Card className={getAnimationClass({ type: AnimationType.FlipInX })}>
      <Card.Body>
        <IconDisplay
          contents={<span className="fst-italic">The darkness stirs.</span>}
          Icon={Icon}
          tooltip={LABEL_UNKNOWN}
        />
      </Card.Body>
    </Card>
  );
}
