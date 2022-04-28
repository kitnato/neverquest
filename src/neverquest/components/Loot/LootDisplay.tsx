import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import Aether from "neverquest/components/Loot/Aether";
import Coins from "neverquest/components/Loot/Coins";
import Reserve from "neverquest/components/Loot/Reserve";
import Lootable from "neverquest/components/Loot/Lootable";
import Scrap from "neverquest/components/Loot/Scrap";
import {
  deltaAether,
  deltaAetherLoot,
  deltaCoins,
  deltaCoinsLoot,
  deltaScrap,
  deltaScrapLoot,
} from "neverquest/state/deltas";
import { aether, aetherLoot, coins, coinsLoot, scrap, scrapLoot } from "neverquest/state/loot";
import { showAether, showCoins, showScrap } from "neverquest/state/show";

export default function LootDisplay({ isLoot }: { isLoot?: boolean }) {
  return (
    <Row>
      {isLoot ? (
        <>
          <Col>
            <Lootable atom={scrapLoot} Component={Scrap} deltaAtom={deltaScrapLoot} />
          </Col>

          <Col>
            <Lootable atom={coinsLoot} Component={Coins} deltaAtom={deltaCoinsLoot} />
          </Col>

          <Col>
            <Lootable atom={aetherLoot} Component={Aether} deltaAtom={deltaAetherLoot} />
          </Col>
        </>
      ) : (
        <>
          <Col>
            <Reserve atom={scrap} Component={Scrap} deltaAtom={deltaScrap} showAtom={showScrap} />
          </Col>

          <Col>
            <Reserve atom={coins} Component={Coins} deltaAtom={deltaCoins} showAtom={showCoins} />
          </Col>

          <Col>
            <Reserve
              atom={aether}
              Component={Aether}
              deltaAtom={deltaAether}
              showAtom={showAether}
            />
          </Col>
        </>
      )}
    </Row>
  );
}
