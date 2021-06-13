import React from "react";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import Header from "components/Header";
import Location from "components/Location";
import Progress from "components/Progress";
import Character from "components/Character";
import Encounter from "components/Encounter";

export default function App() {
  return (
    <>
      <Header />

      <Container>
        <Location />

        <Progress />

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
