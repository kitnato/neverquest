import { Col, Row } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { Deflection } from "@neverquest/components/Statistics/Deflection";
import { Execution } from "@neverquest/components/Statistics/Execution";
import { FreeBlock } from "@neverquest/components/Statistics/FreeBlock";
import { LootBonus } from "@neverquest/components/Statistics/LootBonus";
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
        <Execution />
      </Col>

      <Col>
        <Deflection />
      </Col>

      <Col>
        <FreeBlock />
      </Col>

      <Col>
        <LootBonus />
      </Col>
    </Row>
  );
}
