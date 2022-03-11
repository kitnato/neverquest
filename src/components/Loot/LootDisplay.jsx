import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import LootedResource from "components/Loot/LootedResource";
import UnlootedResource from "components/Loot/UnlootedResource";
import {
  aether,
  aetherLoot,
  coins,
  coinsLoot,
  scrap,
  scrapLoot,
} from "state/loot";

export default function LootDisplay({ isLoot }) {
  return (
    <Row>
      {isLoot ? (
        <>
          <Col>
            <UnlootedResource atom={scrapLoot} name="scrap" />
          </Col>

          <Col>
            <UnlootedResource atom={coinsLoot} name="coins" />
          </Col>

          <Col>
            <UnlootedResource atom={aetherLoot} name="aether" />
          </Col>
        </>
      ) : (
        <>
          <Col>
            <LootedResource atom={scrap} name="scrap" />
          </Col>

          <Col>
            <LootedResource atom={coins} name="coins" />
          </Col>

          <Col>
            <LootedResource atom={aether} name="aether" />
          </Col>
        </>
      )}
    </Row>
  );
}
