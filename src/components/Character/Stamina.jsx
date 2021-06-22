import React from "react";
import { useRecoilValue } from "recoil";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import Progress from "components/Progress";
import WithIcon from "components/WithIcon";
import StaminaRegen from "components/Character/StaminaRegen";
import { stamina } from "state/character/atoms";
import staminaIcon from "icons/lungs.svg";

export default function Stamina() {
  const staminaValue = useRecoilValue(stamina);

  return (
    <Row className="align-items-center mb-2" noGutters>
      <Col xs={8}>
        <WithIcon icon={staminaIcon} alt="Stamina" className="mr-2">
          <Progress
            variant="success"
            value={(staminaValue.current / staminaValue.max) * 100}
            label={`${staminaValue.current}/${staminaValue.max}`}
          />
        </WithIcon>
      </Col>

      <Col xs={4}>
        <StaminaRegen />
      </Col>
    </Row>
  );
}
