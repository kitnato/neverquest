import { Col, Row } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { Deflection } from "@neverquest/components/Statistics/Deflection";
import { LootBonus } from "@neverquest/components/Statistics/LootBonus";
import { Stability } from "@neverquest/components/Statistics/Stability";
import { Tenacity } from "@neverquest/components/Statistics/Tenacity";
import { isShowing } from "@neverquest/state/isShowing";

export function Support() {
  const isShowingDeflection = useRecoilValue(isShowing("deflection"));
  const isShowingLootBonus = useRecoilValue(isShowing("lootBonus"));
  const isShowingStability = useRecoilValue(isShowing("stability"));
  const isShowingTenacity = useRecoilValue(isShowing("tenacity"));

  if (!isShowingDeflection && !isShowingLootBonus && !isShowingStability && !isShowingTenacity) {
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
        <LootBonus />
      </Col>
    </Row>
  );
}
