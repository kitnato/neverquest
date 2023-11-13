import { useEffect, useRef } from "react";
import { Card, Stack } from "react-bootstrap";
import { useRecoilState, useResetRecoilState } from "recoil";

import { IconDisplay } from "@neverquest/components/IconDisplay";
import { MonsterAilments } from "@neverquest/components/Monster/MonsterAilments";
import { MonsterAttack } from "@neverquest/components/Monster/MonsterAttack";
import { MonsterDistance } from "@neverquest/components/Monster/MonsterDistance";
import { MonsterHealthMeter } from "@neverquest/components/Monster/MonsterHealthMeter";
import { MonsterName } from "@neverquest/components/Monster/MonsterName";
import { MonsterOffense } from "@neverquest/components/Monster/MonsterOffense";
import IconHealth from "@neverquest/icons/health.svg?react";
import { isMonsterNew, monsterElement } from "@neverquest/state/monster";
import { animateElement } from "@neverquest/utilities/helpers";

export function Monster() {
  const [isMonsterNewValue, setMonsterNew] = useRecoilState(isMonsterNew);
  const [monsterElementValue, setMonsterElement] = useRecoilState(monsterElement);
  const resetMonsterElement = useResetRecoilState(monsterElement);

  const element = useRef(null);

  useEffect(() => {
    const { current } = element;

    setMonsterElement(current);

    return resetMonsterElement;
  }, [resetMonsterElement, setMonsterElement]);

  useEffect(() => {
    if (isMonsterNewValue && monsterElementValue !== null) {
      animateElement({
        element: monsterElementValue,
        name: "zoomInRight",
        speed: "faster",
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

            <IconDisplay Icon={IconHealth} tooltip="Monster health">
              <MonsterHealthMeter />
            </IconDisplay>

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
