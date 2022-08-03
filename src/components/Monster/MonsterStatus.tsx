import { useEffect, useRef } from "react";
import { Card, Col, Row, Stack } from "react-bootstrap";
import { useRecoilState, useSetRecoilState } from "recoil";

import MonsterAttack from "@neverquest/components/Monster/MonsterAttack";
import MonsterHealth from "@neverquest/components/Monster/MonsterHealth";
import MonsterDamage from "@neverquest/components/Monster/MonsterDamage";
import MonsterDamagePerSecond from "@neverquest/components/Monster/MonsterDamagePerSecond";
import MonsterName from "@neverquest/components/Monster/MonsterName";
import MonsterStagger from "@neverquest/components/Monster/MonsterStagger";
import { isMonsterNew, monsterStatusElement } from "@neverquest/state/monster";
import { AnimationSpeed, AnimationType } from "@neverquest/types/ui";
import { animateElement } from "@neverquest/utilities/helpers";

export default function MonsterStatus() {
  const [isMonsterNewValue, setIsMonsterNew] = useRecoilState(isMonsterNew);
  const setMonsterStatusElement = useSetRecoilState(monsterStatusElement);

  const element = useRef(null);

  useEffect(() => {
    setMonsterStatusElement(element.current);

    return () => setMonsterStatusElement(null);
  }, [element]);

  useEffect(() => {
    if (isMonsterNewValue) {
      animateElement({
        type: AnimationType.ZoomInRight,
        element: element.current,
        speed: AnimationSpeed.Faster,
      });
      setIsMonsterNew(false);
    }
  }, [element, isMonsterNewValue]);

  return (
    <Card ref={element}>
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

          <Stack direction="horizontal" gap={5}>
            <MonsterDamage />

            <MonsterDamagePerSecond />
          </Stack>
        </Stack>
      </Card.Body>
    </Card>
  );
}
