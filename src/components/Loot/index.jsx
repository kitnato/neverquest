import { useRecoilState, useRecoilValue } from "recoil";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import LootDisplay from "components/Loot/LootDisplay";
import { isLooting } from "state/resources";
import { levelCompleted, show } from "state/global";

export default function Loot() {
  const isLevelCompleted = useRecoilValue(levelCompleted);
  const [isLootPresent, setLooting] = useRecoilState(isLooting);
  const [showValue, setShow] = useRecoilState(show);

  const handleCollect = () => {
    setShow({ ...showValue, resources: true });
    setLooting();
  };

  return (
    isLootPresent && (
      <Card>
        <Card.Body>
          <Row>
            <LootDisplay />

            <Col>
              <Button
                className={!isLevelCompleted && "d-none"}
                variant="outline-dark"
                onClick={handleCollect}
              >
                Collect
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    )
  );
}
