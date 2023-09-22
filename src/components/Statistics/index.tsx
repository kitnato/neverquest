import { Card, Col, Row, Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { Conditional } from "@neverquest/components/Statistics/Conditional";
import { CriticalRating } from "@neverquest/components/Statistics/CriticalRating";
import { Damage } from "@neverquest/components/Statistics/Damage";
import { Dodge } from "@neverquest/components/Statistics/Dodge";
import { Protection } from "@neverquest/components/Statistics/Protection";
import { isShowing } from "@neverquest/state/isShowing";
import { getAnimationClass } from "@neverquest/utilities/getters";

export function Statistics() {
  const isShowingStatistics = useRecoilValue(isShowing("statistics"));

  if (!isShowingStatistics) {
    return null;
  }

  return (
    <Card className={getAnimationClass({ type: "flipInX" })}>
      <Card.Body>
        <Stack gap={3}>
          <Row>
            <Col>
              <Damage />
            </Col>

            <Col>
              <CriticalRating />
            </Col>

            <Col>
              <Protection />
            </Col>

            <Col>
              <Dodge />
            </Col>
          </Row>

          <Conditional />
        </Stack>
      </Card.Body>
    </Card>
  );
}
