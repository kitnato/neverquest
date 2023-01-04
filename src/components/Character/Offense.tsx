import { Col, Row } from "react-bootstrap";

import Bleed from "@neverquest/components/Character/Bleed";
import CriticalRating from "@neverquest/components/Character/CriticalRating";
import Damage from "@neverquest/components/Character/Damage";
import Stagger from "@neverquest/components/Character/Stagger";

export default function () {
  return (
    <Row>
      <Col>
        <Damage />
      </Col>

      <Col>
        <Stagger />
      </Col>

      <Col>
        <CriticalRating />
      </Col>

      <Col>
        <Bleed />
      </Col>
    </Row>
  );
}
