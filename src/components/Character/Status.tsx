import { useSetAtom } from "jotai";
import { useEffect, useRef } from "react";
import { Card, Col, Row, Stack } from "react-bootstrap";

import Attack from "@neverquest/components/Character/Attack";
import Defense from "@neverquest/components/Character/Defense";
import Health from "@neverquest/components/Character/Health";
import Name from "@neverquest/components/Character/Name";
import Offense from "@neverquest/components/Character/Offense";
import Recovery from "@neverquest/components/Character/Recovery";
import Stamina from "@neverquest/components/Character/Stamina";
import { statusElement } from "@neverquest/state/character";
import { AnimationType } from "@neverquest/types/ui";
import { animateElement } from "@neverquest/utilities/helpers";

export default function Status() {
  const element = useRef(null);
  const setStatusElement = useSetAtom(statusElement);

  useEffect(() => {
    const { current } = element;

    setStatusElement(current);
    animateElement({ type: AnimationType.FlipInX, element: current });
  }, []);

  return (
    <Card ref={element}>
      <Card.Body>
        <Stack gap={3}>
          <Name />

          <Health />

          <Stamina />

          <Row>
            <Col>
              <Attack />
            </Col>

            <Col>
              <Recovery />
            </Col>
          </Row>

          <Offense />

          <Defense />
        </Stack>
      </Card.Body>
    </Card>
  );
}
