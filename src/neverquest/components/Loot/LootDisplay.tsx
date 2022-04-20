import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import Looted from "neverquest/components/Loot/Looted";
import Lootable from "neverquest/components/Loot/Lootable";
import { LootType } from "neverquest/env";
import { aether, aetherLoot, coins, coinsLoot, scrap, scrapLoot } from "neverquest/state/loot";
import { showAether, showCoins, showScrap } from "neverquest/state/show";

export default function LootDisplay({ isLoot }: { isLoot?: boolean }) {
  return (
    <Row>
      {isLoot ? (
        <>
          <Col>
            <Lootable atom={scrapLoot} name={LootType.Scrap} />
          </Col>

          <Col>
            <Lootable atom={coinsLoot} name={LootType.Coins} />
          </Col>

          <Col>
            <Lootable atom={aetherLoot} name={LootType.Aether} />
          </Col>
        </>
      ) : (
        <>
          <Col>
            <Looted atom={scrap} name={LootType.Scrap} showAtom={showScrap} />
          </Col>

          <Col>
            <Looted atom={coins} name={LootType.Coins} showAtom={showCoins} />
          </Col>

          <Col>
            <Looted atom={aether} name={LootType.Aether} showAtom={showAether} />
          </Col>
        </>
      )}
    </Row>
  );
}
