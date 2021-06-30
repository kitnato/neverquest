import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import Character from "components/Character";
import Encounter from "components/Encounter";
import Header from "components/Header";
import LevelProgress from "components/LevelProgress";
import Location from "components/Location";
import Reset from "components/Reset";

import { gameOver, seed } from "state/atoms";

export default function App() {
  const gameOverValue = useRecoilValue(gameOver);
  const seedValue = useRecoilValue(seed);
  const [resetShow, setGameOverShow] = useState(true);

  return (
    <div data-seed={seedValue}>
      <Header />

      <Container>
        <Row className="align-items-center">
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
          setShow={setGameOverShow}
          title="You are dead."
          message="Try again?"
        />
      </Container>
    </div>
  );
}
