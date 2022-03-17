import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Stack from "react-bootstrap/Stack";

import Attack from "neverquest/components/Character/Attack";
import Defence from "neverquest/components/Character/Defence";
import Health from "neverquest/components/Character/Health";
import Name from "neverquest/components/Character/Name";
import Offense from "neverquest/components/Character/Offense";
import Recovery from "neverquest/components/Character/Recovery";
import Stamina from "neverquest/components/Character/Stamina";

export default function Status() {
  return (
    <Card>
      <Card.Body>
        <Stack gap={3}>
          <Name />

          <Health />

          <Stamina />

          <Row>
            <Col>
              <Attack />
            </Col>

            <Col>
              <Recovery />
            </Col>
          </Row>

          <Offense />

          <Defence />
        </Stack>
      </Card.Body>
    </Card>
  );
}