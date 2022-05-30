import { useAtomValue, useSetAtom } from "jotai";
import { useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Stack from "react-bootstrap/Stack";

import Character from "neverquest/components/Character";
import Control from "neverquest/components/Control";
import Encounter from "neverquest/components/Encounter";
import LevelProgress from "neverquest/components/LevelProgress";
import Location from "neverquest/components/Location";
import Reset from "neverquest/components/Reset";
import { gameOver } from "neverquest/state/global";
import { reservesInitial } from "neverquest/state/reserves";

export default function Main() {
  const gameOverValue = useAtomValue(gameOver);
  const [isGameOverShowing, setGameOverShowing] = useState(true);
  const initializeReserves = useSetAtom(reservesInitial);

  useEffect(() => {
    initializeReserves();
  }, []);

  return (
    <Stack gap={3}>
      <Row>
        <Col>
          <Location />
        </Col>

        <Col style={{ width: 80 }} xs="auto" />

        <Col>
          <LevelProgress />
        </Col>
      </Row>

      <Row>
        <Col style={{ zIndex: 1050 }}>
          <Character />
        </Col>

        <Col xs="auto">
          <Control />
        </Col>

        <Col>
          <Encounter />
        </Col>
      </Row>

      <Reset
        message="Try again?"
        setHide={() => setGameOverShowing(false)}
        show={isGameOverShowing && gameOverValue}
        title="You are dead."
      />
    </Stack>
  );
}
