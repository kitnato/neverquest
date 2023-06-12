import { useEffect, useRef } from "react";
import { Card, Stack } from "react-bootstrap";
import { useSetRecoilState } from "recoil";

import { Attack } from "@neverquest/components/Character/Attack";
import { Health } from "@neverquest/components/Character/Health";
import { Name } from "@neverquest/components/Character/Name";
import { Recovery } from "@neverquest/components/Character/Recovery";
import { Stamina } from "@neverquest/components/Character/Stamina";
import { statusElement } from "@neverquest/state/character";
import { animateElement } from "@neverquest/utilities/animateElement";

export function Status() {
  const element = useRef(null);
  const setStatusElement = useSetRecoilState(statusElement);

  useEffect(() => {
    const { current } = element;

    setStatusElement(current);
    animateElement({ element: current, type: "flipInX" });

    return () => setStatusElement(null);
  }, [setStatusElement]);

  return (
    <Card ref={element}>
      <Card.Body>
        <Stack gap={3}>
          <Name />

          <Health />

          <Stamina />

          <Attack />

          <Recovery />
        </Stack>
      </Card.Body>
    </Card>
  );
}
