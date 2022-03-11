import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useRecoilValue } from "recoil";

import Block from "components/Character/Block";
import Dodge from "components/Character/Dodge";
import TotalArmor from "components/Character/TotalArmor";
import { show } from "state/global";

export default function Defence() {
  const { defence } = useRecoilValue(show);

  if (!defence) {
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
