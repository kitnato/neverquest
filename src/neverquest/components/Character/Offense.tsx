import { Col, Row } from "react-bootstrap";

import CritChance from "neverquest/components/Character/CritChance";
import CritDamage from "neverquest/components/Character/CritDamage";
import DamagePerSecond from "neverquest/components/Character/DamagePerSecond";
import TotalDamage from "neverquest/components/Character/TotalDamage";

export default function Offense() {
  return (
    <Row>
      <Col>
        <TotalDamage />
      </Col>

      <Col>
        <CritChance />
      </Col>

      <Col>
        <CritDamage />
      </Col>

      <Col>
        <DamagePerSecond />
      </Col>
    </Row>
  );
}
