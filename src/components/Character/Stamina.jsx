import React, { useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import Progress from "components/Progress";
import WithIcon from "components/WithIcon";
import useAnimation from "hooks/useAnimation";
import { stamina, staminaRegen } from "state/character/atoms";
import { currentStamina } from "state/character/selectors";
import staminaIcon from "icons/lungs.svg";
import formatCountdown from "utilities/formatCountdown";

export default function Stamina() {
  const staminaValue = useRecoilValue(stamina);
  const recovering = staminaValue.current < staminaValue.max;
  const setStamina = useSetRecoilState(currentStamina);
  const { rate: staminaRegenRate, amount: staminaRegenAmount } =
    useRecoilValue(staminaRegen);
  const [elapsedStaminaRegen, setStaminaRegen] = useState(0);
  const displayStaminaRegen = recovering
    ? elapsedStaminaRegen
    : staminaRegenRate;

  useAnimation((deltaTime) => {
    if (elapsedStaminaRegen >= staminaRegenRate) {
      setStamina(staminaRegenAmount);
      setStaminaRegen(0);
    } else if (recovering) {
      setStaminaRegen(elapsedStaminaRegen + deltaTime);
    }
  }, !recovering);

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
        <Progress
          variant="warning"
          value={(displayStaminaRegen / staminaRegenRate) * 100}
          label={formatCountdown(staminaRegenRate - displayStaminaRegen)}
        />
      </Col>
    </Row>
  );
}
