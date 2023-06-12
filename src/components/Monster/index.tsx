import { useEffect, useRef } from "react";
import { Card, Stack } from "react-bootstrap";
import { useRecoilState } from "recoil";

import { MonsterAttack } from "@neverquest/components/Monster/MonsterAttack";
import { MonsterBleeding } from "@neverquest/components/Monster/MonsterBleeding";
import { MonsterHealth } from "@neverquest/components/Monster/MonsterHealth";
import { MonsterName } from "@neverquest/components/Monster/MonsterName";
import { MonsterOffense } from "@neverquest/components/Monster/MonsterOffense";
import { MonsterStaggered } from "@neverquest/components/Monster/MonsterStaggered";
import { isMonsterNew, monsterElement } from "@neverquest/state/monster";
import { animateElement } from "@neverquest/utilities/animateElement";

export function Monster() {
  const [isMonsterNewValue, setMonsterNew] = useRecoilState(isMonsterNew);
  const [monsterElementValue, setMonsterElement] = useRecoilState(monsterElement);

  const element = useRef(null);

  useEffect(() => {
    const { current } = element;

    setMonsterElement(current);

    return () => setMonsterElement(null);
  }, [element, setMonsterElement]);

  useEffect(() => {
    if (isMonsterNewValue && monsterElementValue !== null) {
      animateElement({
        element: monsterElementValue,
        speed: "faster",
        type: "zoomInRight",
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

          <MonsterOffense />

          <MonsterStaggered />

          <MonsterBleeding />
        </Stack>
      </Card.Body>
    </Card>
  );
}
