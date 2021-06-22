import React, { useEffect } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import HealthRegen from "components/Character/HealthRegen";
import Progress from "components/Progress";
import WithIcon from "components/WithIcon";
import { gameOver } from "state/atoms";
import { damageTaken, health } from "state/character/atoms";
import { currentHealth } from "state/character/selectors";
import healthIcon from "icons/hospital-cross.svg";

export default function Health() {
  const healthValue = useRecoilValue(health);
  const setGameOver = useSetRecoilState(gameOver);
  const setHealth = useSetRecoilState(currentHealth);
  const [damageTakenValue, setDamageTaken] = useRecoilState(damageTaken);

  useEffect(() => {
    if (damageTakenValue !== null) {
      setHealth(-damageTakenValue);
      setDamageTaken(null);
    }
  }, [damageTakenValue, setDamageTaken, setHealth]);

  useEffect(() => {
    if (healthValue.current <= 0) {
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
        <HealthRegen />
      </Col>
    </Row>
  );
}
