import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import Armor from "components/Character/Armor";
import Block from "components/Character/Block";
import Dodge from "components/Character/Dodge";

export default function Defense() {
  return (
    <Row>
      <Col>
        <Armor />
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
