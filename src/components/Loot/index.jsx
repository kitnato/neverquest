import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Stack from "react-bootstrap/Stack";
import { useRecoilValue } from "recoil";

import LootDisplay from "components/Loot/LootDisplay";
import ImageIcon from "components/ImageIcon";
import lootIcon from "icons/locked-chest.svg";
import lootedIcon from "icons/open-chest.svg";
import { progress } from "state/global";
import { aetherLoot, coinsLoot, hasLooted, scrapLoot } from "state/loot";

export default function Loot() {
  const aetherLootValue = useRecoilValue(aetherLoot);
  const coinsLootValue = useRecoilValue(coinsLoot);
  const hasLootedValue = useRecoilValue(hasLooted);
  const progressValue = useRecoilValue(progress);
  const scrapLootValue = useRecoilValue(scrapLoot);

  return (
    progressValue > 0 && (
      <>
        <hr />

        <Card>
          <Card.Body>
            <Row>
              <Col>
                <Stack direction="horizontal" gap={3}>
                  <ImageIcon
                    icon={hasLootedValue ? lootedIcon : lootIcon}
                    tooltip="Loot"
                  />

                  {hasLootedValue && (
                    <span style={{ fontStyle: "italic" }}>Looted.</span>
                  )}
                </Stack>
              </Col>

              {!hasLootedValue && (
                <Col>
                  <LootDisplay
                    aether={aetherLootValue}
                    coins={coinsLootValue}
                    scrap={scrapLootValue}
                  />
                </Col>
              )}
            </Row>
          </Card.Body>
        </Card>
      </>
    )
  );
}
