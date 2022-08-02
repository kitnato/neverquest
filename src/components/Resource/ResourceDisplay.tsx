import { Col, Row } from "react-bootstrap";

import Essence from "@neverquest/components/Resource/Essence";
import Coins from "@neverquest/components/Resource/Coins";
import Resource from "@neverquest/components/Resource";
import Lootable from "@neverquest/components/Resource/Lootable";
import Scrap from "@neverquest/components/Resource/Scrap";
import { deltas } from "@neverquest/state/deltas";
import { isShowing } from "@neverquest/state/isShowing";
import {
  essence,
  essenceLoot,
  coins,
  coinsLoot,
  scrap,
  scrapLoot,
} from "@neverquest/state/resources";
import { DeltaType, ShowingType } from "@neverquest/types/enums";

export default function ResourceDisplay({ isLoot }: { isLoot?: boolean }) {
  return (
    <Row>
      {isLoot ? (
        <>
          <Col>
            <Lootable
              atom={essenceLoot}
              Component={Essence}
              deltaAtom={deltas(DeltaType.EssenceLoot)}
              tooltip={"Looted essence"}
            />
          </Col>

          <Col>
            <Lootable
              atom={scrapLoot}
              Component={Scrap}
              deltaAtom={deltas(DeltaType.ScrapLoot)}
              tooltip={"Looted scrap"}
            />
          </Col>

          <Col>
            <Lootable
              atom={coinsLoot}
              Component={Coins}
              deltaAtom={deltas(DeltaType.CoinsLoot)}
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
              deltaAtom={deltas(DeltaType.Essence)}
              showAtom={isShowing(ShowingType.Essence)}
            />
          </Col>

          <Col>
            <Resource
              atom={scrap}
              Component={Scrap}
              deltaAtom={deltas(DeltaType.Scrap)}
              showAtom={isShowing(ShowingType.Scrap)}
            />
          </Col>

          <Col>
            <Resource
              atom={coins}
              Component={Coins}
              deltaAtom={deltas(DeltaType.Coins)}
              showAtom={isShowing(ShowingType.Coins)}
            />
          </Col>
        </>
      )}
    </Row>
  );
}
