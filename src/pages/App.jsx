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
import Travel from "components/Travel";

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
          <Col xs={12} md={6}>
            <Location />
          </Col>

          <Col xs={6} md={4}>
            <LevelProgress />
          </Col>

          <Col xs={6} md={2}>
            <Travel />
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
