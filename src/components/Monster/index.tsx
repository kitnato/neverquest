import { useEffect, useRef } from "react";
import { Card, CardBody, Stack } from "react-bootstrap";
import { useRecoilState, useResetRecoilState } from "recoil";

import { MonsterAilments } from "@neverquest/components/Monster/MonsterAilments";
import { MonsterAttackRate } from "@neverquest/components/Monster/MonsterAttackRate";
import { MonsterDistance } from "@neverquest/components/Monster/MonsterDistance";
import { MonsterHealth } from "@neverquest/components/Monster/MonsterHealth";
import { MonsterName } from "@neverquest/components/Monster/MonsterName";
import { MonsterOffense } from "@neverquest/components/Monster/MonsterOffense";
import { useGenerateMonster } from "@neverquest/hooks/actions/useGenerateMonster";
import { isMonsterNew, monsterElement } from "@neverquest/state/monster";
import { animateElement } from "@neverquest/utilities/helpers";

export function Monster() {
  const [isMonsterNewValue, setMonsterNew] = useRecoilState(isMonsterNew);
  const [monsterElementValue, setMonsterElement] = useRecoilState(monsterElement);
  const resetMonsterElement = useResetRecoilState(monsterElement);

  const element = useRef(null);

  const generateMonster = useGenerateMonster();

  useEffect(() => {
    const { current } = element;

    setMonsterElement(current);

    return resetMonsterElement;
  }, [resetMonsterElement, setMonsterElement]);

  useEffect(() => {
    if (isMonsterNewValue && monsterElementValue !== null) {
      generateMonster();

      animateElement({
        element: monsterElementValue,
        name: "zoomInRight",
        speed: "faster",
      });

      setMonsterNew(false);
    }
  }, [generateMonster, isMonsterNewValue, monsterElementValue, setMonsterNew]);

  return (
    <Stack gap={3}>
      <Card ref={element}>
        <CardBody>
          <Stack gap={3}>
            <MonsterName />

            <MonsterHealth />

            <MonsterAttackRate />

            <MonsterOffense />
          </Stack>
        </CardBody>
      </Card>

      <MonsterDistance />

      <MonsterAilments />
    </Stack>
  );
}
