import { Col, Row } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { MonsterDamage } from "@neverquest/components/Monster/MonsterDamage";
import { MonsterPoisonRating } from "@neverquest/components/Monster/MonsterPoisonRating";
import { isShowing } from "@neverquest/state/isShowing";
import { Showing } from "@neverquest/types/enums";

export function MonsterOffense() {
  const isShowingMonsterOffense = useRecoilValue(isShowing(Showing.MonsterOffense));

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
    </Row>
  );
}
