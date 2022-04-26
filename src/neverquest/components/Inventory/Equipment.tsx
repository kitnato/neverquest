import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useRecoilValue } from "recoil";

import ArmorEquipped from "neverquest/components/Inventory/Armor/ArmorEquipped";
import Shield from "neverquest/components/Inventory/Shield";
import WeaponEquipped from "neverquest/components/Inventory/Weapon/WeaponEquipped";
import { showArmor, showShield, showWeapon } from "neverquest/state/show";

export default function Equipment() {
  const showArmorValue = useRecoilValue(showArmor);
  const showShieldValue = useRecoilValue(showShield);
  const showWeaponValue = useRecoilValue(showWeapon);

  if (!showArmorValue && !showShieldValue && !showWeaponValue) {
    return null;
  }

  return (
    <Card className="animate__animated animate__flipInX">
      <Card.Body>
        <Row>
          <Col>
            <WeaponEquipped />
          </Col>

          <Col>
            <ArmorEquipped />
          </Col>

          <Col>
            <Shield />
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}
