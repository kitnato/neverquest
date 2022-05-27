import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { useEffect } from "react";
import Card from "react-bootstrap/Card";
import Stack from "react-bootstrap/Stack";

import ImageIcon from "neverquest/components/ImageIcon";
import MonsterStatus from "neverquest/components/Monster/MonsterStatus";
import unknownIcon from "neverquest/icons/evil-eyes.svg";
import { isAttacking, isLooting } from "neverquest/state/character";
import {
  isMonsterDead,
  isMonsterEngaged,
  monsterCreate,
  monsterRegenerate,
} from "neverquest/state/monster";
import { AnimationType } from "neverquest/types/ui";
import { UNKNOWN } from "neverquest/utilities/constants";
import { getAnimationClass } from "neverquest/utilities/helpers";

export default function Monster() {
  const setLooting = useSetAtom(isLooting);
  const [isMonsterEngagedValue, setMonsterEngaged] = useAtom(isMonsterEngaged);
  const isAttackingValue = useAtomValue(isAttacking);
  const isMonsterDeadValue = useAtomValue(isMonsterDead);
  const createMonster = useSetAtom(monsterCreate);
  const regenerateMonster = useSetAtom(monsterRegenerate);

  useEffect(() => {
    // If player is attacking, engage the monster.
    if (isAttackingValue && !isMonsterEngagedValue && !isMonsterDeadValue) {
      createMonster();
      setMonsterEngaged(true);
    }

    // If player stops attacking but the monster is still alive, regenerate it.
    if (!isAttackingValue && isMonsterEngagedValue && !isMonsterDeadValue) {
      regenerateMonster();
    }

    if (isMonsterDeadValue) {
      setLooting(true);
    }
  }, [isAttackingValue, isMonsterDeadValue, isMonsterEngagedValue]);

  if (isMonsterEngagedValue) {
    return <MonsterStatus />;
  }

  return (
    <Card className={getAnimationClass(AnimationType.FlipInX)}>
      <Card.Body>
        <Stack direction="horizontal" gap={3}>
          <ImageIcon icon={unknownIcon} tooltip={UNKNOWN} />

          <span className="fst-italic">The darkness stirs.</span>
        </Stack>
      </Card.Body>
    </Card>
  );
}
