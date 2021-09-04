import { useState } from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useSetRecoilState, useRecoilState, useRecoilValue } from "recoil";

import LootDisplay from "components/Loot/LootDisplay";
import MonsterHealthMeter from "components/Monster/MonsterHealthMeter";
import MonsterName from "components/Monster/MonsterName";
import MonsterOffense from "components/Monster/MonsterOffense";
import ImageIcon from "components/ImageIcon";
import deadIcon from "icons/crossed-bones.svg";
import lurkingIcon from "icons/evil-eyes.svg";
import healthIcon from "icons/hospital-cross.svg";
import { experience } from "state/character";
import { activeMonster, level, progress } from "state/global";
import { aetherLoot, coinsLoot, hasLooted, scrapLoot } from "state/resources";
import { getFromRange } from "utilities/helpers";

export default function Monster({ id }) {
  const [activeMonsterValue, setActiveMonster] = useRecoilState(activeMonster);
  const hasLootedValue = useRecoilValue(hasLooted);
  const levelValue = useRecoilValue(level);
  const setAetherLoot = useSetRecoilState(aetherLoot);
  const setCoinsLoot = useSetRecoilState(coinsLoot);
  const setExperience = useSetRecoilState(experience);
  const setProgress = useSetRecoilState(progress);
  const setScrapLoot = useSetRecoilState(scrapLoot);
  const [isDead, setDead] = useState(false);
  const [loot, setLoot] = useState({});

  const onDeath = () => {
    const range = Math.floor(levelValue / 2);
    const rewards = {
      aether: getFromRange({
        min: levelValue > 5 ? levelValue - range : 0,
        max: levelValue > 5 ? levelValue + range - 2 : 0,
      }),
      coins: getFromRange({
        min: levelValue - range,
        max: levelValue + range + 1,
      }),
      experience: getFromRange({
        min: levelValue * 2,
        max: levelValue * 2 + range,
      }),
      scrap: getFromRange({
        min: levelValue - range + 1,
        max: levelValue + range,
      }),
    };

    setDead(true);
    setProgress((progressValue) => progressValue + 1);
    setActiveMonster(null);
    setAetherLoot((current) => current + rewards.aether);
    setCoinsLoot((current) => current + rewards.coins);
    setExperience((current) => current + rewards.experience);
    setLoot({ ...rewards });
    setScrapLoot((current) => current + rewards.scrap);
  };

  return (
    <Card>
      <Card.Body className="spaced-vertical">
        {isDead ? (
          <Row>
            <Col xs={4}>
              <ImageIcon icon={deadIcon} />

              <span className="ml-3">Remains</span>
            </Col>

            {!hasLootedValue && (
              <Col>
                <LootDisplay
                  aether={loot.aether}
                  coins={loot.coins}
                  scrap={loot.scrap}
                />
              </Col>
            )}
          </Row>
        ) : (
          <>
            {id === activeMonsterValue ? (
              <>
                <MonsterName />

                <div className="align-items-center d-flex spaced-horizontal">
                  <ImageIcon icon={healthIcon} tooltip="Monster health" />

                  <MonsterHealthMeter onDeath={onDeath} />
                </div>

                <MonsterOffense />
              </>
            ) : (
              <ImageIcon icon={lurkingIcon} tooltip="???" />
            )}
          </>
        )}
      </Card.Body>
    </Card>
  );
}
