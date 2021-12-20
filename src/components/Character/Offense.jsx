import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import DamagePerSecond from "components/Character/DamagePerSecond";
import CritChance from "components/Character/CritChance";
import CritDamage from "components/Character/CritDamage";

export default function Offense() {
  return (
    <Row>
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
