import { useEffect } from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Stack from "react-bootstrap/Stack";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

import MonsterAttack from "neverquest/components/Monster/MonsterAttack";
import MonsterHealth from "neverquest/components/Monster/MonsterHealth";
import MonsterDamage from "neverquest/components/Monster/MonsterDamage";
import MonsterDamagePerSecond from "neverquest/components/Monster/MonsterDamagePerSecond";
import MonsterName from "neverquest/components/Monster/MonsterName";
import Looting from "neverquest/components/Monster/Looting";
import ImageIcon from "neverquest/components/ImageIcon";
import useNewMonster from "neverquest/hooks/useNewMonster";
import unknownIcon from "neverquest/icons/evil-eyes.svg";
import { isAttacking, isLooting } from "neverquest/state/character";
import { isMonsterDead, isMonsterEngaged } from "neverquest/state/monster";
import { UNKNOWN } from "neverquest/utilities/constants";

export default function Monster() {
  const setLooting = useSetRecoilState(isLooting);
  const [isMonsterEngagedValue, setMonsterEngaged] = useRecoilState(isMonsterEngaged);
  const isAttackingValue = useRecoilValue(isAttacking);
  const isMonsterDeadValue = useRecoilValue(isMonsterDead);

  const newMonster = useNewMonster();

  useEffect(() => {
    // If player is attacking, engage the monster.
    if (isAttackingValue && !isMonsterEngagedValue && !isMonsterDeadValue) {
      newMonster();
      setMonsterEngaged(true);
    }

    // If player stops attacking but the monster is still alive, regenerate it,
    if (!isAttackingValue && isMonsterEngagedValue && !isMonsterDeadValue) {
      newMonster(true);
    }

    if (isMonsterDeadValue) {
      setLooting(true);
    }
  }, [isAttackingValue, isMonsterEngagedValue, isMonsterDeadValue]);

  return (
    <Card>
      <Card.Body>
        {isMonsterEngagedValue ? (
          <Stack gap={3}>
            <MonsterName />

            <MonsterHealth />

            <Row>
              <Col>
                <MonsterAttack />
              </Col>

              <Col>
                <Looting />
              </Col>
            </Row>

            <MonsterDamage />

            <MonsterDamagePerSecond />
          </Stack>
        ) : (
          <Stack direction="horizontal" gap={3}>
            <ImageIcon icon={unknownIcon} tooltip={UNKNOWN} />

            <span style={{ fontStyle: "italic" }}>The darkness stirs.</span>
          </Stack>
        )}
      </Card.Body>
    </Card>
  );
}
