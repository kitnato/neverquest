import { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Stack from "react-bootstrap/Stack";
import { useRecoilValue } from "recoil";

import MonsterHealth from "neverquest/components/Monster/MonsterHealth";
import MonsterName from "neverquest/components/Monster/MonsterName";
import MonsterOffense from "neverquest/components/Monster/MonsterOffense";
import ImageIcon from "neverquest/components/ImageIcon";
import icon from "neverquest/icons/evil-eyes.svg";
import useTimeout from "neverquest/hooks/useTimeout";
import useKill from "neverquest/hooks/useKill";
import { isAttacking } from "neverquest/state/character";
import { isMonsterDead } from "neverquest/state/monster";

export default function Monster() {
  const isAttackingValue = useRecoilValue(isAttacking);
  const isMonsterDeadValue = useRecoilValue(isMonsterDead);
  const [isEngaged, setEngaged] = useState(false);
  const kill = useKill();

  useEffect(() => {
    if (isAttackingValue && !isEngaged && !isMonsterDeadValue) {
      setEngaged(true);
    }
  }, [isAttackingValue, isEngaged, isMonsterDeadValue]);

  useTimeout(kill, isMonsterDeadValue ? 2000 : null);

  return (
    <Card>
      <Card.Body>
        {isEngaged ? (
          <Stack gap={3}>
            <MonsterName />

            <MonsterHealth />

            <MonsterOffense isEngaged={isEngaged} />
          </Stack>
        ) : (
          <Stack direction="horizontal" gap={3}>
            <ImageIcon icon={icon} tooltip="???" />

            <span style={{ fontStyle: "italic" }}>The darkness stirs.</span>
          </Stack>
        )}
      </Card.Body>
    </Card>
  );
}
