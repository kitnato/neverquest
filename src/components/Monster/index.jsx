import React, { useEffect, useRef, useState } from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import { v4 as uuidv4 } from "uuid";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import Attack from "components/Monster/Attack";
import Loot from "components/Monster/Loot";
import Progress from "components/Progress";
import WithIcon from "components/WithIcon";
import { activeMonster, level } from "state/atoms";
import { damageDealt } from "state/character/atoms";

import damageIcon from "icons/wolverine-claws.svg";
import deadIcon from "icons/crossed-bones.svg";
import healthIcon from "icons/hospital-cross.svg";
import monsterIcon from "icons/carnivore-mouth.svg";

export default function Monster({ activeIndex, onDeath }) {
  const levelValue = useRecoilValue(level);
  const activeMonsterValue = useRecoilValue(activeMonster);
  const [damageDealtValue, setDamageDealt] = useRecoilState(damageDealt);
  const damagePerHit = { min: levelValue, max: levelValue + 1 };
  const name = useRef(uuidv4());
  const [health, setHealth] = useState({
    current: levelValue + 4,
    max: levelValue + 4,
  });
  const isDead = health.current === 0;
  const isActive = activeIndex === activeMonsterValue;

  useEffect(() => {
    if (isActive && damageDealtValue !== null) {
      setHealth((h) => {
        let newHealth = h.current - damageDealtValue;

        if (newHealth < 0) {
          newHealth = 0;
        }

        return { ...h, current: newHealth };
      });
      setDamageDealt(null);
    }
  }, [damageDealtValue, isActive, setDamageDealt]);

  useEffect(() => {
    if (isDead) {
      onDeath();
    }
  }, [health, isDead, onDeath]);

  return (
    <Card className="mb-2">
      <Card.Body>
        <WithIcon icon={isDead ? deadIcon : monsterIcon} alt="Monster">
          {name.current}
        </WithIcon>

        <div className="mt-3">
          <>
            {isDead && <Loot />}

            {isActive && !isDead && (
              <>
                <WithIcon icon={healthIcon} alt="Monster health">
                  <Progress
                    variant="danger"
                    value={(health.current / health.max) * 100}
                    label={`${health.current}/${health.max}`}
                  />
                </WithIcon>

                <Row className="align-items-center mt-2">
                  <Col>
                    <WithIcon icon={damageIcon} alt="Monster damage">
                      {damagePerHit.min}-{damagePerHit.max}
                    </WithIcon>
                  </Col>

                  <Col>
                    <Attack />
                  </Col>
                </Row>
              </>
            )}
          </>
        </div>
      </Card.Body>
    </Card>
  );
}
