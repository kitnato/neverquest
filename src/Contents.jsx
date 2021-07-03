import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import Character from "components/Character";
import Encounter from "components/Encounter";
import LevelProgress from "components/LevelProgress";
import Location from "components/Location";
import Reset from "components/Reset";

import { gameOver } from "state/atoms";

export default function Contents({ resetSeed }) {
  const gameOverValue = useRecoilValue(gameOver);
  const [resetShow, setGameOverShow] = useState(true);

  return (
    <>
      <Row className="align-items-center mb-3">
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

        <Col>
          <Encounter />
        </Col>
      </Row>

      <Reset
        show={resetShow && gameOverValue}
        setHide={() => setGameOverShow(false)}
        resetSeed={resetSeed}
        title="You are dead."
        message="Try again?"
      />
    </>
  );
}
