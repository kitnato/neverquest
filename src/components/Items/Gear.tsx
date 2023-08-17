import { Card, Col, Row } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { ArmorEquipped } from "@neverquest/components/Items/Armor/ArmorEquipped";
import { ShieldEquipped } from "@neverquest/components/Items/Shield/ShieldEquipped";
import { WeaponEquipped } from "@neverquest/components/Items/Weapon/WeaponEquipped";
import { isShowing } from "@neverquest/state/isShowing";

import { getAnimationClass } from "@neverquest/utilities/getters";

export function Gear() {
  const isShowingArmor = useRecoilValue(isShowing("armor"));
  const isShowingShield = useRecoilValue(isShowing("shield"));
  const isShowingWeapon = useRecoilValue(isShowing("weapon"));

  if (!isShowingArmor && !isShowingShield && !isShowingWeapon) {
    return null;
  }

  return (
    <Card className={getAnimationClass({ type: "flipInX" })}>
      <Card.Body>
        <Row className="align-items-center">
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
