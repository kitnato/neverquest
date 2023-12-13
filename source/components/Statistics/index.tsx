import { Card, CardBody, Col, Row, Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { BleedRating } from "@neverquest/components/Statistics/BleedRating";
import { Block } from "@neverquest/components/Statistics/Block";
import { CombatRange } from "@neverquest/components/Statistics/CombatRange";
import { CriticalRating } from "@neverquest/components/Statistics/CriticalRating";
import { Damage } from "@neverquest/components/Statistics/Damage";
import { Deflection } from "@neverquest/components/Statistics/Deflection";
import { DodgeChance } from "@neverquest/components/Statistics/DodgeChance";
import { ExecutionThreshold } from "@neverquest/components/Statistics/ExecutionThreshold";
import { ParryRating } from "@neverquest/components/Statistics/ParryRating";
import { Protection } from "@neverquest/components/Statistics/Protection";
import { StaggerRating } from "@neverquest/components/Statistics/StaggerRating";
import { StunRating } from "@neverquest/components/Statistics/StunRating";
import { Thorns } from "@neverquest/components/Statistics/Thorns";
import { isShowing } from "@neverquest/state/isShowing";
import { getAnimationClass } from "@neverquest/utilities/getters";

export function Statistics() {
  const isShowingStatistics = useRecoilValue(isShowing("statistics"));

  if (isShowingStatistics) {
    return (
      <Card className={getAnimationClass({ animation: "flipInX" })}>
        <CardBody>
          <Row>
            <Col>
              <Stack gap={3}>
                <Damage />

                <CriticalRating />

                <StunRating />

                <BleedRating />

                <ParryRating />

                <ExecutionThreshold />

                <CombatRange />
              </Stack>
            </Col>

            <Col>
              <Stack gap={3}>
                <Protection />

                <Thorns />

                <Deflection />

                <DodgeChance />
              </Stack>
            </Col>

            <Col>
              <Stack gap={3}>
                <Block />

                <StaggerRating />
              </Stack>
            </Col>
          </Row>
        </CardBody>
      </Card>
    );
  }
}