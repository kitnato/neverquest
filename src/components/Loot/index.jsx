import { useRecoilValue } from "recoil";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import CollectLoot from "components/Loot/CollectLoot";
import LootDisplay from "components/Loot/LootDisplay";
import ImageIcon from "components/ImageIcon";
import lootIcon from "icons/locked-chest.svg";
import lootedIcon from "icons/open-chest.svg";
import { isLevelCompleted } from "state/global";
import { aetherLoot, coinsLoot, hasLooted, scrapLoot } from "state/loot";

export default function Loot() {
  const aetherLootValue = useRecoilValue(aetherLoot);
  const coinsLootValue = useRecoilValue(coinsLoot);
  const scrapLootValue = useRecoilValue(scrapLoot);
  const isLevelCompletedValue = useRecoilValue(isLevelCompleted);
  const hasLootedValue = useRecoilValue(hasLooted);

  return (
    isLevelCompletedValue && (
      <>
        <hr />

        <Card>
          <Card.Body>
            <Row>
              <Col xs={4}>
                <ImageIcon
                  icon={hasLootedValue ? lootedIcon : lootIcon}
                  tooltip={!hasLootedValue && "Loot"}
                />
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

        <CollectLoot />
      </>
    )
  );
}
