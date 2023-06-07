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

export function ResourceDisplay({ isLoot = false }: { isLoot?: boolean }) {
  return (
    <Row>
      {isLoot ? (
        <>
          <Col>
            <Lootable
              atom={essenceLoot}
              Component={Essence}
              deltaType="essenceLoot"
              tooltip="Looted essence"
            />
          </Col>

          <Col>
            <Lootable
              atom={scrapLoot}
              Component={Scrap}
              deltaType="scrapLoot"
              tooltip="Looted scrap"
            />
          </Col>

          <Col>
            <Lootable
              atom={coinsLoot}
              Component={Coins}
              deltaType="coinsLoot"
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
              deltaType="essence"
              showAtom={isShowing("essence")}
            />
          </Col>

          <Col>
            <Resource
              atom={scrap}
              Component={Scrap}
              deltaType="scrap"
              showAtom={isShowing("scrap")}
            />
          </Col>

          <Col>
            <Resource
              atom={coins}
              Component={Coins}
              deltaType="coins"
              showAtom={isShowing("coins")}
            />
          </Col>
        </>
      )}
    </Row>
  );
}
