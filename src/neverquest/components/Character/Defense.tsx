import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useRecoilValue } from "recoil";

import Block from "neverquest/components/Character/Block";
import Dodge from "neverquest/components/Character/Dodge";
import TotalProtection from "neverquest/components/Character/TotalProtection";
import { showBlockChance, showDodgeChance, showTotalProtection } from "neverquest/state/show";

export default function Defense() {
  const showBlockChanceValue = useRecoilValue(showBlockChance);
  const showDodgeChanceValue = useRecoilValue(showDodgeChance);
  const showTotalProtectionValue = useRecoilValue(showTotalProtection);

  if (!showBlockChanceValue && !showDodgeChanceValue && !showTotalProtectionValue) {
    return null;
  }

  return (
    <Row className="animate__animated animate__flipInX">
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
