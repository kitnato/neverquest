import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import LootedResource from "neverquest/components/Loot/LootedResource";
import UnlootedResource from "neverquest/components/Loot/UnlootedResource";
import { LootType } from "neverquest/env";
import { aether, aetherLoot, coins, coinsLoot, scrap, scrapLoot } from "neverquest/state/loot";
import { showAether, showCoins, showScrap } from "neverquest/state/show";

export default function LootDisplay({ isLoot }: { isLoot?: boolean }) {
  return (
    <Row>
      {isLoot ? (
        <>
          <Col>
            <UnlootedResource atom={scrapLoot} name={LootType.Scrap} />
          </Col>

          <Col>
            <UnlootedResource atom={coinsLoot} name={LootType.Coins} />
          </Col>

          <Col>
            <UnlootedResource atom={aetherLoot} name={LootType.Aether} />
          </Col>
        </>
      ) : (
        <>
          <Col>
            <LootedResource atom={scrap} name={LootType.Scrap} showAtom={showScrap} />
          </Col>

          <Col>
            <LootedResource atom={coins} name={LootType.Coins} showAtom={showCoins} />
          </Col>

          <Col>
            <LootedResource atom={aether} name={LootType.Aether} showAtom={showAether} />
          </Col>
        </>
      )}
    </Row>
  );
}
