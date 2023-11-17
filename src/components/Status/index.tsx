import { useEffect, useRef } from "react";
import { Card, CardBody, Stack } from "react-bootstrap";
import { useResetRecoilState, useSetRecoilState } from "recoil";

import { Health } from "@neverquest/components/Reserves/Health";
import { Stamina } from "@neverquest/components/Reserves/Stamina";
import { AttackRate } from "@neverquest/components/Status/AttackRate";
import { Name } from "@neverquest/components/Status/Name";
import { Recovery } from "@neverquest/components/Status/Recovery";
import { statusElement } from "@neverquest/state/character";
import { animateElement } from "@neverquest/utilities/helpers";

export function Status() {
  const setStatusElement = useSetRecoilState(statusElement);
  const resetStatusElement = useResetRecoilState(statusElement);

  const element = useRef(null);

  useEffect(() => {
    const { current } = element;

    setStatusElement(current);
    animateElement({ element: current, name: "flipInX" });

    return resetStatusElement;
  }, [resetStatusElement, setStatusElement]);

  return (
    <Card ref={element}>
      <CardBody>
        <Stack gap={3}>
          <Name />

          <Health />

          <Stamina />

          <AttackRate />

          <Recovery />
        </Stack>
      </CardBody>
    </Card>
  );
}
