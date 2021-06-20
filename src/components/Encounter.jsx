import React from "react";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { v4 as uuidv4 } from "uuid";

import Caravan from "components/Caravan";
import Monster from "components/Monster";
import { activeMonster, mode, progress } from "state/atoms";
import { progressMax } from "state/selectors";

export default function Encounter() {
  const progressMaxValue = useRecoilValue(progressMax);
  const modeValue = useRecoilValue(mode);
  const setProgress = useSetRecoilState(progress);
  const setActiveMonster = useSetRecoilState(activeMonster);
  const monsterQueue = new Array(progressMaxValue)
    .fill(null)
    .map(() => ({ id: uuidv4() }));

  const onMonsterDeath = (index) => {
    const monsterIndex = index + 1;

    setActiveMonster(monsterIndex);
    setProgress(monsterIndex);
  };

  return (
    <>
      {modeValue === "exploration" &&
        monsterQueue.map(({ id }, index) => (
          <Monster
            key={id}
            activeIndex={index}
            onDeath={() => onMonsterDeath(index)}
          />
        ))}

      {modeValue === "caravan" && <Caravan />}
    </>
  );
}
