import { useEffect } from "react";
import { Card } from "react-bootstrap";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

import IconDisplay from "@neverquest/components/IconDisplay";
import MonsterStatus from "@neverquest/components/Monster/MonsterStatus";
import { UNKNOWN } from "@neverquest/constants";
import { ReactComponent as Icon } from "@neverquest/icons/evil-eyes.svg";
import { isAttacking, isLooting } from "@neverquest/state/character";
import { isMonsterDead, isMonsterEngaged } from "@neverquest/state/monster";
import { monsterRegenerate } from "@neverquest/state/transactions";
import { AnimationType } from "@neverquest/types/ui";
import { getAnimationClass } from "@neverquest/utilities/helpers";

export default function () {
  const setLooting = useSetRecoilState(isLooting);
  const [isMonsterEngagedValue, setMonsterEngaged] = useRecoilState(isMonsterEngaged);
  const isAttackingValue = useRecoilValue(isAttacking);
  const isMonsterDeadValue = useRecoilValue(isMonsterDead);
  const regenerateMonster = useSetRecoilState(monsterRegenerate);

  useEffect(() => {
    // If player is attacking a new monster, engage it.
    if (isAttackingValue && !isMonsterEngagedValue && !isMonsterDeadValue) {
      setMonsterEngaged(true);
    }

    // If player stops attacking but the monster is still alive, regenerate it.
    if (!isAttackingValue && isMonsterEngagedValue && !isMonsterDeadValue) {
      regenerateMonster(null);
    }

    if (isMonsterDeadValue) {
      setLooting(true);
    }
  }, [isAttackingValue, isMonsterDeadValue, isMonsterEngagedValue]);

  if (isAttackingValue || isMonsterEngagedValue) {
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
