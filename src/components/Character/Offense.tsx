import { Col, Row } from "react-bootstrap";

import CriticalChance from "@neverquest/components/Character/CriticalChance";
import CriticalDamage from "@neverquest/components/Character/CriticalDamage";
import TotalDamage from "@neverquest/components/Character/TotalDamage";

export default function () {
  return (
    <Row>
      <Col>
        <TotalDamage />
      </Col>

      <Col>
        <CriticalChance />
      </Col>

      <Col>
        <CriticalDamage />
      </Col>
    </Row>
  );
}
