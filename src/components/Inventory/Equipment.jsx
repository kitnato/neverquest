import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import Armor from "components/Inventory/Armor";
import Shield from "components/Inventory/Shield";
import Weapon from "components/Inventory/Weapon";

export default function Equipment() {
  return (
    <Row>
      <Col>
        <Weapon />
      </Col>

      <Col>
        <Armor />
      </Col>

      <Col>
        <Shield />
      </Col>
    </Row>
  );
}
