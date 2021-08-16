import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useRecoilValue } from "recoil";

import MonsterAttack from "components/Monster/MonsterAttack";
import MonsterDamage from "components/Monster/MonsterDamage";
import { level } from "state/global";

export default function MonsterOffense() {
  const levelValue = useRecoilValue(level);

  const damagePerHit = { min: levelValue, max: levelValue + 1 };

  return (
    <Row>
      <Col>
        <MonsterDamage damagePerHit={damagePerHit} />
      </Col>

      <Col>
        <MonsterAttack damagePerHit={damagePerHit} />
      </Col>
    </Row>
  );
}
