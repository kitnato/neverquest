import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import Attack from "components/Character/Attack";
import AttackButton from "components/Character/AttackButton";
import Defense from "components/Character/Defense";
import Health from "components/Character/Health";
import Name from "components/Character/Name";
import Offense from "components/Character/Offense";
import Stamina from "components/Character/Stamina";

export default function Status() {
  return (
    <Card>
      <Card.Body className="spaced-vertical">
        <Name />

        <Health />

        <Stamina />

        <Row>
          <Col>
            <Attack />
          </Col>

          <Col>
            <AttackButton />
          </Col>
        </Row>

        <Offense />

        <Defense />
      </Card.Body>
    </Card>
  );
}
