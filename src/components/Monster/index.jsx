import React from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useSetRecoilState, useRecoilState, useRecoilValue } from "recoil";

import Attack from "components/Monster/Attack";
import Damage from "components/Monster/Damage";
import Health from "components/Monster/Health";
import Name from "components/Monster/Name";

import {
  activeMonster,
  aetherLoot,
  coinsLoot,
  experience,
  level,
  progress,
  scrapLoot,
} from "state/atoms";

export default function Monster({ id }) {
  const setAetherLoot = useSetRecoilState(aetherLoot);
  const setCoinsLoot = useSetRecoilState(coinsLoot);
  const setExperience = useSetRecoilState(experience);
  const setProgress = useSetRecoilState(progress);
  const setScrapLoot = useSetRecoilState(scrapLoot);
  const [activeMonsterId, setActiveMonster] = useRecoilState(activeMonster);
  const levelValue = useRecoilValue(level);

  if (id !== activeMonsterId) {
    return null;
  }

  const damagePerHit = { min: levelValue, max: levelValue + 1 };

  const onDeath = () => {
    setProgress((progressValue) => progressValue + 1);
    setActiveMonster(null);
    // TODO - randomize within range
    setAetherLoot((current) => current + (levelValue - 1));
    setCoinsLoot((current) => current + levelValue * 2);
    setScrapLoot((current) => current + (levelValue + 1));
    setExperience((current) => current + levelValue * 3);
  };

  return (
    <Card>
      <Card.Body>
        <Name />

        <div className="mt-3">
          <Health onDeath={onDeath} />

          <Row className="align-items-center mt-2">
            <Col>
              <Damage damagePerHit={damagePerHit} />
            </Col>

            <Col>
              <Attack damagePerHit={damagePerHit} />
            </Col>
          </Row>
        </div>
      </Card.Body>
    </Card>
  );
}
