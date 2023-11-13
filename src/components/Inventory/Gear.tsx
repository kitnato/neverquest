import { Card, Col, Row } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { ArmorEquipped } from "@neverquest/components/Inventory/Armor/ArmorEquipped";
import { OffhandEquipped } from "@neverquest/components/Inventory/Offhand/OffhandEquipped";
import { WeaponEquipped } from "@neverquest/components/Inventory/Weapon/WeaponEquipped";
import { isShowing } from "@neverquest/state/isShowing";

import { getAnimationClass } from "@neverquest/utilities/getters";

export function Gear() {
  const isShowingArmor = useRecoilValue(isShowing("armor"));
  const isShowingOffhand = useRecoilValue(isShowing("offhand"));
  const isShowingWeapon = useRecoilValue(isShowing("weapon"));

  if (!isShowingArmor && !isShowingOffhand && !isShowingWeapon) {
    return;
  }

  return (
    <Card className={getAnimationClass({ name: "flipInX" })}>
      <Card.Body>
        <Row className="align-items-center">
          <Col>
            <WeaponEquipped />
          </Col>

          <Col>
            <ArmorEquipped />
          </Col>

          <Col>
            <OffhandEquipped />
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}
