import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import Attack from "components/Character/Attack";
import AttackButton from "components/Character/AttackButton";
import Defense from "components/Character/Defense";
import Experience from "components/Character/Experience";
import Health from "components/Character/Health";
import Name from "components/Character/Name";
import Offense from "components/Character/Offense";
import Resources from "components/Character/Resources";
import Stamina from "components/Character/Stamina";

export default function Character() {
  return (
    <Card>
      <Card.Body className="spaced">
        <Name />

        <Health />

        <Stamina />

        <Offense />

        <Defense />

        <Row>
          <Col>
            <Attack />
          </Col>

          <Col>
            <AttackButton />
          </Col>
        </Row>

        <Row>
          <Col>
            <Experience />
          </Col>

          <Resources />
        </Row>
      </Card.Body>
    </Card>
  );
}
