import { useEffect, useRef } from "react";
import { Card, Col, Row, Stack } from "react-bootstrap";
import { useRecoilState, useSetRecoilState } from "recoil";

import MonsterAttack from "@neverquest/components/Monster/MonsterAttack";
import MonsterBleed from "@neverquest/components/Monster/MonsterBleed";
import MonsterDamage from "@neverquest/components/Monster/MonsterDamage";
import MonsterHealth from "@neverquest/components/Monster/MonsterHealth";
import MonsterName from "@neverquest/components/Monster/MonsterName";
import MonsterStagger from "@neverquest/components/Monster/MonsterStagger";
import useCreateMonster from "@neverquest/hooks/actions/useCreateMonster";
import { isMonsterNew, monsterStatusElement } from "@neverquest/state/monster";
import { AnimationSpeed, AnimationType } from "@neverquest/types/ui";
import { animateElement } from "@neverquest/utilities/helpers";

export default function () {
  const [isMonsterNewValue, setIsMonsterNew] = useRecoilState(isMonsterNew);
  const setMonsterStatusElement = useSetRecoilState(monsterStatusElement);

  const element = useRef(null);

  const createMonster = useCreateMonster();

  useEffect(() => {
    setMonsterStatusElement(element.current);

    return () => setMonsterStatusElement(null);
  }, [element, setMonsterStatusElement]);

  useEffect(() => {
    if (isMonsterNewValue) {
      createMonster();

      animateElement({
        element: element.current,
        speed: AnimationSpeed.Faster,
        type: AnimationType.ZoomInRight,
      });

      setIsMonsterNew(false);
    }
  }, [createMonster, element, isMonsterNewValue, setIsMonsterNew]);

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

          <Row>
            <Col>
              <MonsterDamage />
            </Col>

            <Col>
              <MonsterBleed />
            </Col>
          </Row>
        </Stack>
      </Card.Body>
    </Card>
  );
}
