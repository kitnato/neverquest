import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Stack from "react-bootstrap/Stack";

import ImageIcon from "neverquest/components/ImageIcon";
import MonsterAttackMeter from "neverquest/components/Monster/MonsterAttackMeter";
import MonsterDamage from "neverquest/components/Monster/MonsterDamage";
import icon from "neverquest/icons/striking-splinter.svg";

export default function MonsterOffense({ isEngaged }: { isEngaged: boolean }) {
  return (
    <>
      <Row>
        <Col>
          <Stack direction="horizontal" gap={3}>
            <ImageIcon icon={icon} tooltip="Monster attack rate" />

            <MonsterAttackMeter isEngaged={isEngaged} />
          </Stack>
        </Col>
      </Row>

      <Row>
        <Col>
          <MonsterDamage />
        </Col>
      </Row>
    </>
  );
}
