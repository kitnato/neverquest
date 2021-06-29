import React from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import Display from "components/Loot/Display";

import { attacking, looted } from "state/atoms";
import { looting } from "state/selectors";

export default function Loot() {
  const isAttacking = useRecoilValue(attacking);
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
                variant="outline-primary"
                disabled={isAttacking}
                onClick={() => handleCollect()}
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
