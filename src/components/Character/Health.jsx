import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import Progress from "components/Progress";
import WithIcon from "components/WithIcon";
import useAnimation from "hooks/useAnimation";
import { gameOver } from "state/atoms";
import { damageTaken, health, healthRegen } from "state/character/atoms";
import { currentHealth } from "state/character/selectors";
import healthIcon from "icons/hospital-cross.svg";
import formatCountdown from "utilities/formatCountdown";

export default function Health() {
  const healthValue = useRecoilValue(health);
  const setGameOver = useSetRecoilState(gameOver);
  const setHealth = useSetRecoilState(currentHealth);
  const { rate: healthRegenRate, amount: healthRegenAmount } =
    useRecoilValue(healthRegen);
  const [deltaHealthRegen, setDeltaHealthRegen] = useState(0);
  const [damageTakenValue, setDamageTaken] = useRecoilState(damageTaken);
  const displayHealthRegen =
    healthValue.current < healthValue.max ? deltaHealthRegen : healthRegenRate;

  useAnimation((deltaTime) => {
    if (deltaHealthRegen >= healthRegenRate) {
      setHealth(healthRegenAmount);
      setDeltaHealthRegen(0);
    } else {
      setDeltaHealthRegen(deltaHealthRegen + deltaTime);
    }
  }, healthValue.current === healthValue.max);

  useEffect(() => {
    if (damageTakenValue !== null) {
      setHealth(-damageTakenValue);
      setDamageTaken(null);
    }
  }, [damageTakenValue, setDamageTaken, setHealth]);

  useEffect(() => {
    if (healthValue.current === 0) {
      setGameOver(true);
    }
  }, [healthValue, setGameOver]);

  return (
    <Row className="align-items-center mb-2" noGutters>
      <Col xs={8}>
        <WithIcon icon={healthIcon} alt="Health" className="mr-2">
          <Progress
            variant="danger"
            value={(healthValue.current / healthValue.max) * 100}
            label={`${healthValue.current}/${healthValue.max}`}
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
