import React from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useRecoilValue } from "recoil";

import Attack from "components/Monster/Attack";
import Damage from "components/Monster/Damage";
import Health from "components/Monster/Health";
import Name from "components/Monster/Name";

import { activeMonster, level } from "state/atoms";

export default function Monster({ id }) {
  const activeMonsterId = useRecoilValue(activeMonster);
  const levelValue = useRecoilValue(level);

  if (id !== activeMonsterId) {
    return null;
  }

  const damagePerHit = { min: levelValue, max: levelValue + 1 };

  return (
    <Card>
      <Card.Body>
        <Name />

        <div className="mt-3">
          <Health />

          <Row className="align-items-center mt-2">
            <Col>
              <Damage damagePerHit={damagePerHit} />
            </Col>

            <Col>
              <Attack damagePerHit={damagePerHit} />
            </Col>
          </Row>
        </div>
      </Card.Body>
    </Card>
  );
}
