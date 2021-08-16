import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import Aether from "components/Loot/Aether";
import Coins from "components/Loot/Coins";
import Scrap from "components/Loot/Scrap";
import {
  aether,
  aetherLoot,
  coins,
  coinsLoot,
  scrap,
  scrapLoot,
} from "state/resources";

export default function LootDisplay({ isInventory }) {
  return (
    <Row>
      <Col>
        <Coins atom={isInventory ? coins : coinsLoot} />
      </Col>

      <Col>
        <Scrap atom={isInventory ? scrap : scrapLoot} />
      </Col>

      <Col>
        <Aether atom={isInventory ? aether : aetherLoot} />
      </Col>
    </Row>
  );
}
