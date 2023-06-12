import { Col, Row } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { MonsterBlightRating } from "@neverquest/components/Monster/MonsterBlightRating";
import { MonsterDamage } from "@neverquest/components/Monster/MonsterDamage";
import { MonsterPoisonRating } from "@neverquest/components/Monster/MonsterPoisonRating";
import { isShowing } from "@neverquest/state/isShowing";

export function MonsterOffense() {
  const isShowingMonsterOffense = useRecoilValue(isShowing("monsterOffense"));

  if (!isShowingMonsterOffense) {
    return null;
  }

  return (
    <Row>
      <Col>
        <MonsterDamage />
      </Col>

      <Col>
        <MonsterPoisonRating />
      </Col>

      <Col>
        <MonsterBlightRating />
      </Col>
    </Row>
  );
}
