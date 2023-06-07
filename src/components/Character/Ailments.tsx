import { Col, Row } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { Poisoned } from "@neverquest/components/Character/Poisoned";
import { Recovery } from "@neverquest/components/Character/Recovery";
import { isShowing } from "@neverquest/state/isShowing";

export function Ailments() {
  const isShowingAilments = useRecoilValue(isShowing("ailments"));

  if (!isShowingAilments) {
    return null;
  }

  return (
    <Row>
      <Col>
        <Recovery />
      </Col>

      <Col>
        <Poisoned />
      </Col>
    </Row>
  );
}
