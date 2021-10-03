import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useRecoilValue } from "recoil";

import Equipment from "components/Inventory/Equipment";
import Resources from "components/Inventory/Resources";
import { show } from "state/global";

export default function Inventory() {
  const showValue = useRecoilValue(show);

  if (!showValue.inventory) {
    return null;
  }

  return (
    <Card>
      <Card.Body>
        <Row>
          <Col>
            <Resources />
          </Col>

          <Col>
            <Equipment />
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}
