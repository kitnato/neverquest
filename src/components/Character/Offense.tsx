import { Col, Row } from "react-bootstrap";

import Bleed from "@neverquest/components/Character/Bleed";
import CriticalRating from "@neverquest/components/Character/CriticalRating";
import Stagger from "@neverquest/components/Character/Stagger";
import TotalDamage from "@neverquest/components/Character/TotalDamage";

export default function () {
  return (
    <Row>
      <Col>
        <TotalDamage />
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
