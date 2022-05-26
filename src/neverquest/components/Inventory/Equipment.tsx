import { useAtomValue } from "jotai";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import ArmorEquipped from "neverquest/components/Inventory/Armor/ArmorEquipped";
import ShieldEquipped from "neverquest/components/Inventory/Shield/ShieldEquipped";
import WeaponEquipped from "neverquest/components/Inventory/Weapon/WeaponEquipped";
import { showArmor, showShield, showWeapon } from "neverquest/state/show";
import { AnimationType } from "neverquest/types/ui";
import { getAnimationClass } from "neverquest/utilities/helpers";

export default function Equipment() {
  const showArmorValue = useAtomValue(showArmor);
  const showShieldValue = useAtomValue(showShield);
  const showWeaponValue = useAtomValue(showWeapon);

  if (!showArmorValue && !showShieldValue && !showWeaponValue) {
    return null;
  }

  return (
    <Card className={getAnimationClass(AnimationType.FlipInX)}>
      <Card.Body>
        <Row>
          <Col>
            <WeaponEquipped />
          </Col>

          <Col>
            <ArmorEquipped />
          </Col>

          <Col>
            <ShieldEquipped />
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}
