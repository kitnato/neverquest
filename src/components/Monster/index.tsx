import { useEffect } from "react";
import { Card } from "react-bootstrap";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

import IconDisplay from "@neverquest/components/IconDisplay";
import MonsterStatus from "@neverquest/components/Monster/MonsterStatus";
import { UNKNOWN } from "@neverquest/constants";
import useRegenerateMonster from "@neverquest/hooks/actions/useRegenerateMonster";
import { ReactComponent as Icon } from "@neverquest/icons/evil-eyes.svg";
import { isAttacking, isLooting } from "@neverquest/state/character";
import { isLevelStarted, isMonsterDead } from "@neverquest/state/monster";
import { AnimationType } from "@neverquest/types/ui";
import { getAnimationClass } from "@neverquest/utilities/helpers";

export default function () {
  const setLooting = useSetRecoilState(isLooting);
  const [isLevelStartedValue, setLevelStarted] = useRecoilState(isLevelStarted);
  const isAttackingValue = useRecoilValue(isAttacking);
  const isMonsterDeadValue = useRecoilValue(isMonsterDead);

  const regenerateMonster = useRegenerateMonster();

  // Once the player attacks, the monsters are engaged.
  useEffect(() => {
    if (isAttackingValue && !isLevelStartedValue) {
      setLevelStarted(true);
    }
  }, [isAttackingValue, isLevelStartedValue, setLevelStarted]);

  // If player stops attacking but the monster is still alive, regenerate it.
  useEffect(() => {
    if (!isAttackingValue && isLevelStartedValue && !isMonsterDeadValue) {
      regenerateMonster();
    }
  }, [isAttackingValue, isMonsterDeadValue, isLevelStartedValue, regenerateMonster]);

  useEffect(() => {
    if (isMonsterDeadValue) {
      setLooting(true);
    }
  }, [isMonsterDeadValue, setLooting]);

  if (isLevelStartedValue) {
    return <MonsterStatus />;
  }

  return (
    <Card className={getAnimationClass({ type: AnimationType.FlipInX })}>
      <Card.Body>
        <IconDisplay
          contents={<span className="fst-italic">The darkness stirs.</span>}
          Icon={Icon}
          tooltip={UNKNOWN}
        />
      </Card.Body>
    </Card>
  );
}
