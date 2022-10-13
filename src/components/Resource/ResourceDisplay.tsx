import { Col, Row } from "react-bootstrap";

import Resource from "@neverquest/components/Resource";
import Coins from "@neverquest/components/Resource/Coins";
import Essence from "@neverquest/components/Resource/Essence";
import Lootable from "@neverquest/components/Resource/Lootable";
import Scrap from "@neverquest/components/Resource/Scrap";
import { deltas } from "@neverquest/state/deltas";
import { isShowing } from "@neverquest/state/isShowing";
import {
  coins,
  coinsLoot,
  essence,
  essenceLoot,
  scrap,
  scrapLoot,
} from "@neverquest/state/resources";
import { DeltaType, ShowingType } from "@neverquest/types/enums";

export default function ({ isLoot }: { isLoot?: boolean }) {
  return (
    <Row>
      {isLoot ? (
        <>
          <Col>
            <Lootable
              Component={Essence}
              atom={essenceLoot}
              deltaAtom={deltas(DeltaType.EssenceLoot)}
              tooltip={"Looted essence"}
            />
          </Col>

          <Col>
            <Lootable
              Component={Scrap}
              atom={scrapLoot}
              deltaAtom={deltas(DeltaType.ScrapLoot)}
              tooltip={"Looted scrap"}
            />
          </Col>

          <Col>
            <Lootable
              Component={Coins}
              atom={coinsLoot}
              deltaAtom={deltas(DeltaType.CoinsLoot)}
              tooltip={"Looted coins"}
            />
          </Col>
        </>
      ) : (
        <>
          <Col>
            <Resource
              Component={Essence}
              atom={essence}
              deltaAtom={deltas(DeltaType.Essence)}
              showAtom={isShowing(ShowingType.Essence)}
            />
          </Col>

          <Col>
            <Resource
              Component={Scrap}
              atom={scrap}
              deltaAtom={deltas(DeltaType.Scrap)}
              showAtom={isShowing(ShowingType.Scrap)}
            />
          </Col>

          <Col>
            <Resource
              Component={Coins}
              atom={coins}
              deltaAtom={deltas(DeltaType.Coins)}
              showAtom={isShowing(ShowingType.Coins)}
            />
          </Col>
        </>
      )}
    </Row>
  );
}
