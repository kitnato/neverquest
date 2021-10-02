import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
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
    4510 - 10 * getFromRange({ min: levelValue - 1, max: levelValue });
  const damagePerHit = { min: levelValue, max: levelValue + 1 };

  return (
    <Row>
      <Col>
        <MonsterDamage damagePerHit={damagePerHit} />
      </Col>

      <Col>
        <div className="align-items-center d-flex spaced-horizontal">
          <ImageIcon icon={attackIcon} tooltip="Monster attack rate" />

          <MonsterAttackMeter
            attackRate={attackRate}
            damagePerHit={damagePerHit}
          />
        </div>
      </Col>
    </Row>
  );
}
