import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import Damage from "components/Character/Damage";
import CritChance from "components/Character/CritChance";
import CritDamage from "components/Character/CritDamage";

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
