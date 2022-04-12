import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useRecoilValue } from "recoil";

import Armor from "neverquest/components/Inventory/Armor";
import Shield from "neverquest/components/Inventory/Shield";
import WeaponEquipped from "neverquest/components/Inventory/WeaponEquipped";
import { showArmor, showShield, showWeapon } from "neverquest/state/show";

export default function Equipment() {
  const showArmorValue = useRecoilValue(showArmor);
  const showShieldValue = useRecoilValue(showShield);
  const showWeaponValue = useRecoilValue(showWeapon);

  if (!showArmorValue && !showShieldValue && !showWeaponValue) {
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
