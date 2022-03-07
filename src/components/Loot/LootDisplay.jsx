import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import Aether from "components/Loot/Aether";
import Coins from "components/Loot/Coins";
import Scrap from "components/Loot/Scrap";

export default function LootDisplay({ aether, coins, scrap }) {
  return (
    <Row>
      <Col>
        <Scrap value={scrap} />
      </Col>

      <Col>
        <Coins value={coins} />
      </Col>

      <Col>
        <Aether value={aether} />
      </Col>
    </Row>
  );
}
