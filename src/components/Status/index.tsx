import { useEffect, useRef } from "react";
import { Card, Stack } from "react-bootstrap";
import { useSetRecoilState } from "recoil";

import { Health } from "@neverquest/components/Reserves/Health";
import { Stamina } from "@neverquest/components/Reserves/Stamina";
import { Attack } from "@neverquest/components/Status/Attack";
import { Name } from "@neverquest/components/Status/Name";
import { Recovery } from "@neverquest/components/Status/Recovery";
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
