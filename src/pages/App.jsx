import React from "react";
import { useRecoilValue } from "recoil";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import Header from "components/Header";
import Location from "components/Location";
import Progress from "components/Progress";
import Character from "components/Character";
import Encounter from "components/Encounter";
import WithIcon from "components/WithIcon";
import { progress, progressMaximum } from "state/atoms";

import progressIcon from "icons/stairs.svg";

export default function App() {
  const progressValue = useRecoilValue(progress);
  const progressMaximumValue = useRecoilValue(progressMaximum);

  return (
    <>
      <Header />

      <Container>
        <Row className="align-items-center">
          <Col xs={12} md={6}>
            <Location />
          </Col>

          <Col xs={6} md={4}>
            <WithIcon icon={progressIcon} alt="Progress">
              <Progress
                value={(progressValue / progressMaximumValue) * 100}
                label={`${progressValue}/${progressMaximumValue}`}
              />
            </WithIcon>
          </Col>

          <Col xs={6} md={2}>
            <Button variant="primary" block disabled>
              Go to ???
            </Button>
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
