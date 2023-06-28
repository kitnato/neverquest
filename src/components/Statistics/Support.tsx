import { Col, Row } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { Deflection } from "@neverquest/components/Statistics/Deflection";
import { Luck } from "@neverquest/components/Statistics/Luck";
import { Stability } from "@neverquest/components/Statistics/Stability";
import { Tenacity } from "@neverquest/components/Statistics/Tenacity";
import { isShowing } from "@neverquest/state/isShowing";

export function Support() {
  const isShowingDeflection = useRecoilValue(isShowing("deflection"));
  const isShowingLuck = useRecoilValue(isShowing("luck"));
  const isShowingStability = useRecoilValue(isShowing("stability"));
  const isShowingTenacity = useRecoilValue(isShowing("tenacity"));

  if (!isShowingDeflection && !isShowingLuck && !isShowingStability && !isShowingTenacity) {
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

      <Col>
        <Luck />
      </Col>
    </Row>
  );
}
