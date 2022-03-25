import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useRecoilValue } from "recoil";

import Armor from "neverquest/components/Inventory/Armor";
import Shield from "neverquest/components/Inventory/Shield";
import WeaponEquipped from "neverquest/components/Inventory/WeaponEquipped";
import { show } from "neverquest/state/global";

export default function Equipment() {
  const { armor, shield, weapon } = useRecoilValue(show);

  if (!armor && !shield && !weapon) {
    return null;
  }

  return (
    <Card>
      <Card.Body>
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
      </Card.Body>
    </Card>
  );
}
