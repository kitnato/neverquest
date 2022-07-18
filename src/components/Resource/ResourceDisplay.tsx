import { Col, Row } from "react-bootstrap";

import Essence from "@neverquest/components/Resource/Essence";
import Coins from "@neverquest/components/Resource/Coins";
import Resource from "@neverquest/components/Resource";
import Lootable from "@neverquest/components/Resource/Lootable";
import Scrap from "@neverquest/components/Resource/Scrap";
import {
  deltaEssence,
  deltaEssenceLoot,
  deltaCoins,
  deltaCoinsLoot,
  deltaScrap,
  deltaScrapLoot,
} from "@neverquest/state/deltas";
import {
  essence,
  essenceLoot,
  coins,
  coinsLoot,
  scrap,
  scrapLoot,
} from "@neverquest/state/resources";
import { showEssence, showCoins, showScrap } from "@neverquest/state/show";

export default function ResourceDisplay({ isLoot }: { isLoot?: boolean }) {
  return (
    <Row>
      {isLoot ? (
        <>
          <Col>
            <Lootable
              atom={essenceLoot}
              Component={Essence}
              deltaAtom={deltaEssenceLoot}
              tooltip={"Looted essence"}
            />
          </Col>

          <Col>
            <Lootable
              atom={scrapLoot}
              Component={Scrap}
              deltaAtom={deltaScrapLoot}
              tooltip={"Looted scrap"}
            />
          </Col>

          <Col>
            <Lootable
              atom={coinsLoot}
              Component={Coins}
              deltaAtom={deltaCoinsLoot}
              tooltip={"Looted coins"}
            />
          </Col>
        </>
      ) : (
        <>
          <Col>
            <Resource
              atom={essence}
              Component={Essence}
              deltaAtom={deltaEssence}
              showAtom={showEssence}
            />
          </Col>

          <Col>
            <Resource atom={scrap} Component={Scrap} deltaAtom={deltaScrap} showAtom={showScrap} />
          </Col>

          <Col>
            <Resource atom={coins} Component={Coins} deltaAtom={deltaCoins} showAtom={showCoins} />
          </Col>
        </>
      )}
    </Row>
  );
}
