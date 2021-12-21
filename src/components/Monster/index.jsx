import { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Stack from "react-bootstrap/Stack";
import { useSetRecoilState, useRecoilState, useRecoilValue } from "recoil";

import LootDisplay from "components/Loot/LootDisplay";
import MonsterHealthMeter from "components/Monster/MonsterHealthMeter";
import MonsterName from "components/Monster/MonsterName";
import MonsterOffense from "components/Monster/MonsterOffense";
import ImageIcon from "components/ImageIcon";
import deadIcon from "icons/crossed-bones.svg";
import lurkingIcon from "icons/evil-eyes.svg";
import healthIcon from "icons/hospital-cross.svg";
import { experience, isAttacking } from "state/character";
import { activeMonster, level, progress } from "state/global";
import { aetherLoot, coinsLoot, hasLooted, scrapLoot } from "state/loot";
import { getFromRange } from "utilities/helpers";

export default function Monster({ id }) {
  const [activeMonsterValue, setActiveMonster] = useRecoilState(activeMonster);
  const setAetherLoot = useSetRecoilState(aetherLoot);
  const setCoinsLoot = useSetRecoilState(coinsLoot);
  const setExperience = useSetRecoilState(experience);
  const setProgress = useSetRecoilState(progress);
  const setScrapLoot = useSetRecoilState(scrapLoot);
  const hasLootedValue = useRecoilValue(hasLooted);
  const isAttackingValue = useRecoilValue(isAttacking);
  const levelValue = useRecoilValue(level);
  const [isEngaged, setEngaged] = useState(false);
  const [isDead, setDead] = useState(false);
  const [loot, setLoot] = useState({});

  useEffect(() => {
    if (isAttackingValue && !isEngaged) {
      setEngaged(true);
    }
  }, [isAttackingValue, isEngaged]);

  const onDeath = () => {
    const range = Math.ceil(levelValue / 2);
    const rewards = {
      aether: getFromRange({
        min: levelValue > 5 ? levelValue - range : 0,
        max: levelValue > 5 ? levelValue + range - 2 : 0,
      }),
      coins: getFromRange({
        min: levelValue - range + 1,
        max: levelValue + 1 + Math.ceil(range * 1.5),
      }),
      experience: getFromRange({
        min: (levelValue + 1) * 2,
        max: (levelValue + 1) * 2 + Math.ceil(range * 2),
      }),
      scrap: getFromRange({
        min: levelValue - range + 1,
        max: levelValue + Math.ceil(range * 1.5),
      }),
    };

    setActiveMonster(null);
    setAetherLoot((currentAetherLoot) => currentAetherLoot + rewards.aether);
    setCoinsLoot((currentCoinsLoot) => currentCoinsLoot + rewards.coins);
    setDead(true);
    setExperience(
      (currentExperience) => currentExperience + rewards.experience
    );
    setLoot({ ...rewards });
    setProgress((currentProgress) => currentProgress + 1);
    setScrapLoot((currentScrapLoot) => currentScrapLoot + rewards.scrap);
  };

  return (
    <Card>
      <Card.Body>
        {isDead && (
          <Row>
            <Col xs={4}>
              <ImageIcon
                icon={deadIcon}
                tooltip={`${hasLootedValue ? "Looted remains" : "Remains"}`}
              />
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
        )}

        {!isDead &&
          (id === activeMonsterValue && isEngaged ? (
            <>
              <MonsterName />

              <Stack direction="horizontal" gap={3}>
                <ImageIcon icon={healthIcon} tooltip="Monster health" />

                <MonsterHealthMeter onDeath={onDeath} />
              </Stack>

              <MonsterOffense />
            </>
          ) : (
            <ImageIcon icon={lurkingIcon} tooltip="???" />
          ))}
      </Card.Body>
    </Card>
  );
}
