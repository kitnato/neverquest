import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Stack from "react-bootstrap/Stack";

import ImageIcon from "components/ImageIcon";
import MonsterAttackMeter from "components/Monster/MonsterAttackMeter";
import MonsterDamage from "components/Monster/MonsterDamage";
import icon from "icons/tron-arrow.svg";

export default function MonsterOffense() {
  return (
    <Row>
      <Col>
        <Stack direction="horizontal" gap={3}>
          <ImageIcon icon={icon} tooltip="Monster attack rate" />

          <MonsterAttackMeter />
        </Stack>
      </Col>

      <Col>
        <MonsterDamage />
      </Col>
    </Row>
  );
}
