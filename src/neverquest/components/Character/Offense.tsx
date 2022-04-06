import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import Damage from "neverquest/components/Character/Damage";
import CritChance from "neverquest/components/Character/CritChance";
import CritDamage from "neverquest/components/Character/CritDamage";
import DamagePerSecond from "neverquest/components/Character/DamagePerSecond";

export default function Offense() {
  return (
    <Row>
      <Col>
        <Damage />
      </Col>

      <Col>
        <DamagePerSecond />
      </Col>

      <Col>
        <CritChance />
      </Col>

      <Col>
        <CritDamage />
      </Col>
    </Row>
  );
}
