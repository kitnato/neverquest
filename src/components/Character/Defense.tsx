import { Col, Row } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import Block from "@neverquest/components/Character/Block";
import Dodge from "@neverquest/components/Character/Dodge";
import TotalProtection from "@neverquest/components/Character/TotalProtection";
import { isShowing } from "@neverquest/state/isShowing";
import { AnimationType } from "@neverquest/types/ui";
import { ShowingType } from "@neverquest/types/enums";
import { getAnimationClass } from "@neverquest/utilities/helpers";

export default function () {
  const showBlockChanceValue = useRecoilValue(isShowing(ShowingType.BlockChance));
  const showDodgeChanceValue = useRecoilValue(isShowing(ShowingType.DodgeChance));
  const showTotalProtectionValue = useRecoilValue(isShowing(ShowingType.TotalProtection));

  if (!showBlockChanceValue && !showDodgeChanceValue && !showTotalProtectionValue) {
    return null;
  }

  return (
    <Row className={getAnimationClass({ type: AnimationType.FlipInX })}>
      <Col>
        <TotalProtection />
      </Col>

      <Col>
        <Block />
      </Col>

      <Col>
        <Dodge />
      </Col>
    </Row>
  );
}
