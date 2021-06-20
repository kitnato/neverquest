import React from "react";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import Character from "components/Character";
import Encounter from "components/Encounter";
import Header from "components/Header";
import LevelProgress from "components/LevelProgress";
import Location from "components/Location";
import Travel from "components/Travel";

export default function App() {
  return (
    <>
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
      </Container>
    </>
  );
}
