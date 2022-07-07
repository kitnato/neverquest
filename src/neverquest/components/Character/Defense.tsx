import { useAtomValue } from "jotai";
import { Col, Row } from "react-bootstrap";

import Block from "neverquest/components/Character/Block";
import Dodge from "neverquest/components/Character/Dodge";
import TotalProtection from "neverquest/components/Character/TotalProtection";
import { showBlockChance, showDodgeChance, showTotalProtection } from "neverquest/state/show";
import { AnimationType } from "neverquest/types/ui";
import { getAnimationClass } from "neverquest/utilities/helpers";

export default function Defense() {
  const showBlockChanceValue = useAtomValue(showBlockChance);
  const showDodgeChanceValue = useAtomValue(showDodgeChance);
  const showTotalProtectionValue = useAtomValue(showTotalProtection);

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
