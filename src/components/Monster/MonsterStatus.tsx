import { useEffect, useRef } from "react";
import { Card, Col, Row, Stack } from "react-bootstrap";
import { useRecoilState } from "recoil";

import MonsterAttack from "@neverquest/components/Monster/MonsterAttack";
import MonsterBleeding from "@neverquest/components/Monster/MonsterBleeding";
import MonsterDamage from "@neverquest/components/Monster/MonsterDamage";
import MonsterHealth from "@neverquest/components/Monster/MonsterHealth";
import MonsterName from "@neverquest/components/Monster/MonsterName";
import MonsterPoisonRating from "@neverquest/components/Monster/MonsterPoisonRating";
import MonsterStagger from "@neverquest/components/Monster/MonsterStagger";
import { isMonsterNew, monsterStatusElement } from "@neverquest/state/monster";
import { AnimationSpeed, AnimationType } from "@neverquest/types/ui";
import animateElement from "@neverquest/utilities/animateElement";

export default function () {
  const [isMonsterNewValue, setMonsterNew] = useRecoilState(isMonsterNew);
  const [monsterStatusElementValue, setMonsterStatusElement] = useRecoilState(monsterStatusElement);

  const element = useRef(null);

  useEffect(() => {
    const { current } = element;

    if (current) {
      setMonsterStatusElement(current);
    }

    return () => setMonsterStatusElement(null);
  }, [element, monsterStatusElementValue, setMonsterStatusElement]);

  useEffect(() => {
    if (isMonsterNewValue && monsterStatusElementValue) {
      animateElement({
        element: monsterStatusElementValue,
        speed: AnimationSpeed.Faster,
        type: AnimationType.ZoomInRight,
      });

      setMonsterNew(false);
    }
  }, [isMonsterNewValue, monsterStatusElementValue, setMonsterNew]);

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
              <MonsterStagger />
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
