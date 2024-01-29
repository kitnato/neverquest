import { Col, Row } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { BlightRating } from "@neverquest/components/Monster/BlightRating";
import { MonsterDamage } from "@neverquest/components/Monster/MonsterDamage";
import { PoisonRating } from "@neverquest/components/Monster/PoisonRating";
import { isShowing } from "@neverquest/state/ui";

export function MonsterOffense() {
  const isShowingMonsterOffense = useRecoilValue(isShowing("monsterOffense"));

  if (isShowingMonsterOffense) {
    return (
      <Row>
        <Col>
          <MonsterDamage />
        </Col>

        <Col>
          <PoisonRating />
        </Col>

        <Col>
          <BlightRating />
        </Col>
      </Row>
    );
  }
}
