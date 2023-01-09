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
              atom={essenceLoot}
              atomDelta={deltas(DeltaType.EssenceLoot)}
              Component={Essence}
              tooltip="Looted essence"
            />
          </Col>

          <Col>
            <Lootable
              atom={scrapLoot}
              atomDelta={deltas(DeltaType.ScrapLoot)}
              Component={Scrap}
              tooltip="Looted scrap"
            />
          </Col>

          <Col>
            <Lootable
              atom={coinsLoot}
              atomDelta={deltas(DeltaType.CoinsLoot)}
              Component={Coins}
              tooltip="Looted coins"
            />
          </Col>
        </>
      ) : (
        <>
          <Col>
            <Resource
              atom={essence}
              atomDelta={deltas(DeltaType.Essence)}
              Component={Essence}
              showAtom={isShowing(ShowingType.Essence)}
            />
          </Col>

          <Col>
            <Resource
              atom={scrap}
              atomDelta={deltas(DeltaType.Scrap)}
              Component={Scrap}
              showAtom={isShowing(ShowingType.Scrap)}
            />
          </Col>

          <Col>
            <Resource
              atom={coins}
              atomDelta={deltas(DeltaType.Coins)}
              Component={Coins}
              showAtom={isShowing(ShowingType.Coins)}
            />
          </Col>
        </>
      )}
    </Row>
  );
}
