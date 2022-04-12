import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useRecoilValue } from "recoil";

import Block from "neverquest/components/Character/Block";
import Dodge from "neverquest/components/Character/Dodge";
import TotalArmor from "neverquest/components/Character/TotalArmor";
import { showDefense } from "neverquest/state/show";

export default function Defense() {
  const showDefenseValue = useRecoilValue(showDefense);

  if (!showDefenseValue) {
    return null;
  }

  return (
    <Row>
      <Col>
        <TotalArmor />
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
