import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import Armor from "neverquest/components/Inventory/Armor";
import Shield from "neverquest/components/Inventory/Shield";
import WeaponEquipped from "neverquest/components/Inventory/WeaponEquipped";

export default function Equipment() {
  return (
    <Row>
      <Col>
        <WeaponEquipped />
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
