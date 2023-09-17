import { useEffect, useRef } from "react";
import { Card, Stack } from "react-bootstrap";
import { useRecoilState } from "recoil";

import { MonsterAilments } from "@neverquest/components/Monster/MonsterAilments";
import { MonsterAttack } from "@neverquest/components/Monster/MonsterAttack";
import { MonsterDistance } from "@neverquest/components/Monster/MonsterDistance";
import { MonsterHealth } from "@neverquest/components/Monster/MonsterHealth";
import { MonsterName } from "@neverquest/components/Monster/MonsterName";
import { MonsterOffense } from "@neverquest/components/Monster/MonsterOffense";
import { isMonsterNew, monsterElement } from "@neverquest/state/monster";
import { animateElement } from "@neverquest/utilities/helpers";

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
    <Stack gap={3}>
      <Card ref={element}>
        <Card.Body>
          <Stack gap={3}>
            <MonsterName />

            <MonsterHealth />

            <MonsterAttack />

            <MonsterOffense />
          </Stack>
        </Card.Body>
      </Card>

      <MonsterDistance />

      <MonsterAilments />
    </Stack>
  );
}
