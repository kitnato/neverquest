import { useEffect, useRef } from "react";
import { Card, Col, Row, Stack } from "react-bootstrap";
import { useRecoilState } from "recoil";

import { MonsterAttack } from "@neverquest/components/Monster/MonsterAttack";
import { MonsterBleeding } from "@neverquest/components/Monster/MonsterBleeding";
import { MonsterDamage } from "@neverquest/components/Monster/MonsterDamage";
import { MonsterHealth } from "@neverquest/components/Monster/MonsterHealth";
import { MonsterName } from "@neverquest/components/Monster/MonsterName";
import { MonsterPoisonRating } from "@neverquest/components/Monster/MonsterPoisonRating";
import { MonsterStaggered } from "@neverquest/components/Monster/MonsterStaggered";
import { isMonsterNew, monsterElement } from "@neverquest/state/monster";
import { AnimationSpeed, AnimationType } from "@neverquest/types/ui";
import { animateElement } from "@neverquest/utilities/animateElement";

export function Monster() {
  const [isMonsterNewValue, setMonsterNew] = useRecoilState(isMonsterNew);
  const [monsterElementValue, setMonsterElement] = useRecoilState(monsterElement);

  const element = useRef(null);

  useEffect(() => {
    const { current } = element;

    if (current) {
      setMonsterElement(current);
    }

    return () => setMonsterElement(null);
  }, [element, setMonsterElement]);

  useEffect(() => {
    if (isMonsterNewValue && monsterElementValue) {
      animateElement({
        element: monsterElementValue,
        speed: AnimationSpeed.Faster,
        type: AnimationType.ZoomInRight,
      });

      setMonsterNew(false);
    }
  }, [isMonsterNewValue, monsterElementValue, setMonsterNew]);

  return (
    <Card ref={element}>
      <Card.Body>
        <Stack gap={3}>
          <MonsterName />

          <MonsterHealth />

          <MonsterAttack />

          <Row>
            <Col>
              <MonsterDamage />
            </Col>

            <Col>
              <MonsterPoisonRating />
            </Col>
          </Row>

          <Row>
            <Col>
              <MonsterStaggered />
            </Col>

            <Col>
              <MonsterBleeding />
            </Col>
          </Row>
        </Stack>
      </Card.Body>
    </Card>
  );
}
