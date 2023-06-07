import { Col, Row } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { Deflection } from "@neverquest/components/Statistics/Deflection";
import { Stability } from "@neverquest/components/Statistics/Stability";
import { Tenacity } from "@neverquest/components/Statistics/Tenacity";
import { isShowing } from "@neverquest/state/isShowing";

export function Support() {
  const isShowingSupport = useRecoilValue(isShowing("support"));

  if (!isShowingSupport) {
    return null;
  }

  return (
    <Row>
      <Col>
        <Deflection />
      </Col>

      <Col>
        <Tenacity />
      </Col>

      <Col>
        <Stability />
      </Col>
    </Row>
  );
}
