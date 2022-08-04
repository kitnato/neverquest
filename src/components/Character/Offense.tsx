import { Col, Row } from "react-bootstrap";

import CriticalChance from "@neverquest/components/Character/CriticalChance";
import CriticalDamage from "@neverquest/components/Character/CriticalDamage";
import DamagePerSecond from "@neverquest/components/Character/DamagePerSecond";
import TotalDamage from "@neverquest/components/Character/TotalDamage";

export default function Offense() {
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
        <DamagePerSecond />
      </Col>
    </Row>
  );
}
