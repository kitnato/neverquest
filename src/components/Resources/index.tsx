import { Card, Col, Row } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { Resource } from "@neverquest/components/Resources/Resource";
import { isShowing } from "@neverquest/state/isShowing";
import { getAnimationClass } from "@neverquest/utilities/getters";

export function Resources() {
  const isShowingCoins = useRecoilValue(isShowing("coins"));
  const isShowingEssence = useRecoilValue(isShowing("essence"));
  const isShowingScrap = useRecoilValue(isShowing("scrap"));

  if (!isShowingEssence && !isShowingCoins && !isShowingScrap) {
    return null;
  }

  return (
    <Card className={getAnimationClass({ type: "flipInX" })}>
      <Card.Body>
        <Row>
          <Col>
            <Resource type="essence" />
          </Col>

          <Col>
            <Resource type="scrap" />
          </Col>

          <Col>
            <Resource type="coins" />
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}
