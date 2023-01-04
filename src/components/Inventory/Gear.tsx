import { Card, Col, Row } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import ArmorEquipped from "@neverquest/components/Inventory/Armor/ArmorEquipped";
import ShieldEquipped from "@neverquest/components/Inventory/Shield/ShieldEquipped";
import WeaponEquipped from "@neverquest/components/Inventory/Weapon/WeaponEquipped";
import { isShowing } from "@neverquest/state/isShowing";
import { ShowingType } from "@neverquest/types/enums";
import { AnimationType } from "@neverquest/types/ui";
import { getAnimationClass } from "@neverquest/utilities/getters";

export default function () {
  const isShowingArmor = useRecoilValue(isShowing(ShowingType.Armor));
  const isShowingShield = useRecoilValue(isShowing(ShowingType.Shield));
  const isShowingWeapon = useRecoilValue(isShowing(ShowingType.Weapon));

  if (!isShowingArmor && !isShowingShield && !isShowingWeapon) {
    return null;
  }

  return (
    <Card className={getAnimationClass({ type: AnimationType.FlipInX })}>
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
