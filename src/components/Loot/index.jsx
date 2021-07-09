import React from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import Display from "components/Loot/Display";

import { looted } from "state/atoms";
import { levelCompleted, looting } from "state/selectors";

export default function Loot() {
  const isLevelCompleted = useRecoilValue(levelCompleted);
  const [isLootPresent, setLooting] = useRecoilState(looting);
  const setLooted = useSetRecoilState(looted);

  const handleCollect = () => {
    setLooted(true);
    setLooting();
  };

  return (
    isLootPresent && (
      <Card>
        <Card.Body>
          <Row>
            <Display />

            <Col>
              <Button
                className={!isLevelCompleted && "d-none"}
                variant="outline-dark"
                onClick={handleCollect}
              >
                Collect
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    )
  );
}
