import React, { useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import Progress from "components/Progress";
import WithIcon from "components/WithIcon";
import useAnimation from "hooks/useAnimation";
import { health, healthRegen } from "state/character/atoms";
import { currentHealth } from "state/character/selectors";
import healthIcon from "icons/hospital-cross.svg";
import formatCountdown from "utilities/formatCountdown";

export default function Health() {
  const healthValue = useRecoilValue(health);
  const setHealth = useSetRecoilState(currentHealth);
  const { rate: healthRegenRate, amount: healthRegenAmount } =
    useRecoilValue(healthRegen);
  const [elapsedHealthRegen, setHealthRegen] = useState(-1);
  const displayHealthRegen =
    elapsedHealthRegen > -1 ? elapsedHealthRegen : healthRegenRate;

  useAnimation((deltaTime) => {
    if (elapsedHealthRegen >= healthRegenRate) {
      setHealth(healthRegenAmount);
      setHealthRegen(-1);
    } else if (elapsedHealthRegen > -1) {
      setHealthRegen(elapsedHealthRegen + deltaTime);
    }
  }, elapsedHealthRegen === -1);

  return (
    <Row className="align-items-center" noGutters>
      <Col xs={8}>
        <WithIcon icon={healthIcon} alt="Health" className="mr-2">
          <Progress
            variant="danger"
            value={(healthValue.current / healthValue.maximum) * 100}
            label={`${healthValue.current}/${healthValue.maximum}`}
          />
        </WithIcon>
      </Col>

      <Col xs={4}>
        <Progress
          variant="warning"
          value={(displayHealthRegen / healthRegenRate) * 100}
          label={formatCountdown(healthRegenRate - displayHealthRegen)}
        />
      </Col>
    </Row>
  );
}
