import { useState } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Stack from "react-bootstrap/Stack";
import { useRecoilValue } from "recoil";

import Character from "components/Character";
import Control from "components/Control";
import Encounter from "components/Encounter";
import LevelProgress from "components/LevelProgress";
import Location from "components/Location";
import Reset from "components/Reset";
import { gameOver } from "state/global";

export default function Layout({ resetSeed }) {
  const gameOverValue = useRecoilValue(gameOver);
  const [isGameOverShowing, setGameOverShowing] = useState(true);

  return (
    <Stack gap={3}>
      <Row>
        <Col>
          <Location />
        </Col>

        <Col>
          <LevelProgress />
        </Col>
      </Row>

      <Row>
        <Col>
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
        resetSeed={resetSeed}
        setHide={() => setGameOverShowing(false)}
        show={isGameOverShowing && gameOverValue}
        title="You are dead."
      />
    </Stack>
  );
}
