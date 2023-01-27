import { Col, Row } from "react-bootstrap";

import { BleedRating } from "@neverquest/components/Statistics/BleedRating";
import { CriticalRating } from "@neverquest/components/Statistics/CriticalRating";
import { Damage } from "@neverquest/components/Statistics/Damage";
import { StaggerRating } from "@neverquest/components/Statistics/StaggerRating";

export function Offense() {
  return (
    <Row>
      <Col>
        <Damage />
      </Col>

      <Col>
        <StaggerRating />
      </Col>

      <Col>
        <CriticalRating />
      </Col>

      <Col>
        <BleedRating />
      </Col>
    </Row>
  );
}
