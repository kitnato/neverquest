import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Stack from "react-bootstrap/Stack";
import { useRecoilValue } from "recoil";

import ImageIcon from "components/ImageIcon";
import MonsterAttackMeter from "components/Monster/MonsterAttackMeter";
import MonsterDamage from "components/Monster/MonsterDamage";
import attackIcon from "icons/tron-arrow.svg";
import { level } from "state/global";
import { getFromRange } from "utilities/helpers";

export default function MonsterOffense() {
  const levelValue = useRecoilValue(level);

  const attackRate =
    4510 - 10 * getFromRange({ min: levelValue, max: levelValue * 2 });
  const damagePerHit = { min: levelValue + 1, max: levelValue + 2 };

  return (
    <Row>
      <Col>
        <MonsterDamage damagePerHit={damagePerHit} />
      </Col>

      <Col>
        <Stack direction="horizontal" gap={3}>
          <ImageIcon icon={attackIcon} tooltip="Monster attack rate" />

          <MonsterAttackMeter
            attackRate={attackRate}
            damagePerHit={damagePerHit}
          />
        </Stack>
      </Col>
    </Row>
  );
}
