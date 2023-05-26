import { Col, Row } from "react-bootstrap";

import { Resource } from "@neverquest/components/Resources";
import { Coins } from "@neverquest/components/Resources/Coins";
import { Essence } from "@neverquest/components/Resources/Essence";
import { Lootable } from "@neverquest/components/Resources/Lootable";
import { Scrap } from "@neverquest/components/Resources/Scrap";
import { isShowing } from "@neverquest/state/isShowing";
import {
  coins,
  coinsLoot,
  essence,
  essenceLoot,
  scrap,
  scrapLoot,
} from "@neverquest/state/resources";
import { Delta, Showing } from "@neverquest/types/enums";

export function ResourceDisplay({ isLoot }: { isLoot?: boolean }) {
  return (
    <Row>
      {isLoot ? (
        <>
          <Col>
            <Lootable
              atom={essenceLoot}
              Component={Essence}
              deltaType={Delta.EssenceLoot}
              tooltip="Looted essence"
            />
          </Col>

          <Col>
            <Lootable
              atom={scrapLoot}
              Component={Scrap}
              deltaType={Delta.ScrapLoot}
              tooltip="Looted scrap"
            />
          </Col>

          <Col>
            <Lootable
              atom={coinsLoot}
              Component={Coins}
              deltaType={Delta.CoinsLoot}
              tooltip="Looted coins"
            />
          </Col>
        </>
      ) : (
        <>
          <Col>
            <Resource
              atom={essence}
              Component={Essence}
              deltaType={Delta.Essence}
              showAtom={isShowing(Showing.Essence)}
            />
          </Col>

          <Col>
            <Resource
              atom={scrap}
              Component={Scrap}
              deltaType={Delta.Scrap}
              showAtom={isShowing(Showing.Scrap)}
            />
          </Col>

          <Col>
            <Resource
              atom={coins}
              Component={Coins}
              deltaType={Delta.Coins}
              showAtom={isShowing(Showing.Coins)}
            />
          </Col>
        </>
      )}
    </Row>
  );
}
