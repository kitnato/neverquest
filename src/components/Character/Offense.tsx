import { Col, Row } from "react-bootstrap";

import Bleed from "@neverquest/components/Character/Bleed";
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

      <Col>
        <Bleed />
      </Col>
    </Row>
  );
}
