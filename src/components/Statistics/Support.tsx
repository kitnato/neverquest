import { Col, Row } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { Deflection } from "@neverquest/components/Statistics/Deflection";
import { LootBonus } from "@neverquest/components/Statistics/LootBonus";
import { Stability } from "@neverquest/components/Statistics/Stability";
import { isShowing } from "@neverquest/state/isShowing";

export function Support() {
  const isShowingDeflection = useRecoilValue(isShowing("deflection"));
  const isShowingLootBonus = useRecoilValue(isShowing("lootBonus"));
  const isShowingStability = useRecoilValue(isShowing("stability"));

  if (!isShowingDeflection && !isShowingLootBonus && !isShowingStability) {
    return null;
  }

  return (
    <Row>
      <Col>
        <Deflection />
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
