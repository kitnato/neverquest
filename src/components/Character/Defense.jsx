import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useRecoilValue } from "recoil";

import Block from "components/Character/Block";
import Dodge from "components/Character/Dodge";
import TotalArmor from "components/Character/TotalArmor";
import { show } from "state/global";

export default function Defense() {
  const showValue = useRecoilValue(show);

  if (!showValue.defense) {
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
