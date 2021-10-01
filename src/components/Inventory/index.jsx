import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import Equipment from "components/Inventory/Equipment";
import Resources from "components/Inventory/Resources";

export default function Inventory() {
  return (
    <Card>
      <Card.Body>
        <Row>
          <Col xs={4}>
            <Equipment />
          </Col>

          <Col>
            <Resources />
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}
