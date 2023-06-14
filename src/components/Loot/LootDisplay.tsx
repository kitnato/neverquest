import { Card, Col, Row, Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { IconDisplay } from "@neverquest/components/IconDisplay";
import { Loot } from "@neverquest/components/Loot";
import { Looting } from "@neverquest/components/Loot/Looting";
import { ReactComponent as IconLooted } from "@neverquest/icons/loot.svg";
import { progress } from "@neverquest/state/encounter";
import { hasLooted } from "@neverquest/state/resources";
import { getAnimationClass } from "@neverquest/utilities/getters";

export function LootDisplay() {
  const hasLootedValue = useRecoilValue(hasLooted);
  const progressValue = useRecoilValue(progress);

  return (
    <Stack gap={3}>
      <Looting />

      {progressValue > 0 && (
        <Card className={getAnimationClass({ type: "flipInX" })}>
          <Card.Body>
            {hasLootedValue ? (
              <IconDisplay
                contents={<span className="fst-italic">Nothing remains.</span>}
                Icon={IconLooted}
                isSpaced
                tooltip="Loot"
              />
            ) : (
              <Row>
                <Col>
                  <Loot type="essence" />
                </Col>

                <Col>
                  <Loot type="scrap" />
                </Col>

                <Col>
                  <Loot type="coins" />
                </Col>
              </Row>
            )}
          </Card.Body>
        </Card>
      )}
    </Stack>
  );
}
