import { Col, Row } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { MonsterBleeding } from "@neverquest/components/Monster/MonsterBleeding";
import { MonsterStaggered } from "@neverquest/components/Monster/MonsterStaggered";
import { isShowing } from "@neverquest/state/isShowing";

export function MonsterAilments() {
  const isShowingMonsterAilments = useRecoilValue(isShowing("monsterAilments"));

  if (!isShowingMonsterAilments) {
    return null;
  }

  return (
    <Row>
      <Col>
        <MonsterStaggered />
      </Col>

      <Col>
        <MonsterBleeding />
      </Col>
    </Row>
  );
}
