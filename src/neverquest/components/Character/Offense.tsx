import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import Damage from "neverquest/components/Character/Damage";
import CritChance from "neverquest/components/Character/CritChance";
import CritDamage from "neverquest/components/Character/CritDamage";

export default function Offense() {
  return (
    <Row>
      <Col>
        <Damage />
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
