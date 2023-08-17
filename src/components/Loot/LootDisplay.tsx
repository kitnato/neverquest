import { Card, Col, Row, Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { IconDisplay } from "@neverquest/components/IconDisplay";
import { ItemDisplay } from "@neverquest/components/Items/ItemDisplay";
import { Loot } from "@neverquest/components/Loot";
import { Looting } from "@neverquest/components/Loot/Looting";
import { ReactComponent as IconLooted } from "@neverquest/icons/loot.svg";
import { progress } from "@neverquest/state/encounter";
import { hasLooted, itemsLoot } from "@neverquest/state/resources";
import { getAnimationClass } from "@neverquest/utilities/getters";

export function LootDisplay() {
  const hasLootedValue = useRecoilValue(hasLooted);
  const itemsLootValue = useRecoilValue(itemsLoot);
  const progressValue = useRecoilValue(progress);

  return (
    <Stack gap={3}>
      <Looting />

      {progressValue > 0 && (
        <Card className={getAnimationClass({ type: "flipInX" })}>
          <Card.Body>
            {hasLootedValue && itemsLootValue.length === 0 ? (
              <IconDisplay
                contents={<span className="fst-italic">Nothing remains.</span>}
                Icon={IconLooted}
                isSpaced
                tooltip="Loot"
              />
            ) : (
              <Stack gap={3}>
                {!hasLootedValue && (
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

                {itemsLootValue.map((item) => (
                  <ItemDisplay item={item} key={item.id} />
                ))}
              </Stack>
            )}
          </Card.Body>
        </Card>
      )}
    </Stack>
  );
}
