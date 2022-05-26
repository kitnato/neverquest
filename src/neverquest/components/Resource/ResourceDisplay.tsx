import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import Aether from "neverquest/components/Resource/Aether";
import Coins from "neverquest/components/Resource/Coins";
import Resource from "neverquest/components/Resource";
import Lootable from "neverquest/components/Resource/Lootable";
import Scrap from "neverquest/components/Resource/Scrap";
import {
  deltaAether,
  deltaAetherLoot,
  deltaCoins,
  deltaCoinsLoot,
  deltaScrap,
  deltaScrapLoot,
} from "neverquest/state/deltas";
import { aether, aetherLoot, coins, coinsLoot, scrap, scrapLoot } from "neverquest/state/resources";
import { showAether, showCoins, showScrap } from "neverquest/state/show";

export default function ResourceDisplay({ isLoot }: { isLoot?: boolean }) {
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
            <Resource atom={scrap} Component={Scrap} deltaAtom={deltaScrap} showAtom={showScrap} />
          </Col>

          <Col>
            <Resource atom={coins} Component={Coins} deltaAtom={deltaCoins} showAtom={showCoins} />
          </Col>

          <Col>
            <Resource
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
