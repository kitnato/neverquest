import { useEffect, useRef } from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Stack from "react-bootstrap/Stack";
import { useAtomValue, useSetAtom } from "jotai";

import MonsterAttack from "neverquest/components/Monster/MonsterAttack";
import MonsterHealth from "neverquest/components/Monster/MonsterHealth";
import MonsterDamage from "neverquest/components/Monster/MonsterDamage";
import MonsterDamagePerSecond from "neverquest/components/Monster/MonsterDamagePerSecond";
import MonsterName from "neverquest/components/Monster/MonsterName";
import MonsterStagger from "neverquest/components/Monster/MonsterStagger";
import { lootingRate } from "neverquest/state/character";
import { isMonsterDead, monsterStatusElement } from "neverquest/state/monster";
import { AnimationSpeed, AnimationType } from "neverquest/types/ui";
import { animateElement } from "neverquest/utilities/helpers";

export default function MonsterStatus() {
  const element = useRef(null);
  const isMonsterDeadValue = useAtomValue(isMonsterDead);
  const lootingRateValue = useAtomValue(lootingRate);
  const setMonsterStatusElement = useSetAtom(monsterStatusElement);

  useEffect(() => {
    const { current } = element;

    setMonsterStatusElement(current);
    animateElement({
      animation: AnimationType.ZoomInRight,
      element: current,
      speed: AnimationSpeed.Faster,
    });

    if (isMonsterDeadValue) {
      animateElement({
        animation: AnimationType.BlurOut,
        element: current,
        speed: lootingRateValue,
      });
    }
  }, [element, isMonsterDeadValue]);

  return (
    <Card className="d-none" ref={element}>
      <Card.Body>
        <Stack gap={3}>
          <MonsterName />

          <MonsterHealth />

          <Row>
            <Col>
              <MonsterAttack />
            </Col>

            <Col>
              <MonsterStagger />
            </Col>
          </Row>

          <MonsterDamage />

          <MonsterDamagePerSecond />
        </Stack>
      </Card.Body>
    </Card>
  );
}
