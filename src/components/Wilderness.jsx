import { useEffect, useRef } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { v4 as uuidv4 } from "uuid";

import Monster from "components/Monster";
import { activeMonster, progress, progressMax } from "state/global";

export default function Wilderness() {
  const [activeMonsterValue, setActiveMonster] = useRecoilState(activeMonster);
  const progressMaxValue = useRecoilValue(progressMax);
  const progressValue = useRecoilValue(progress);
  const monsterQueue = useRef(
    Array.from(new Array(progressMaxValue), () => uuidv4())
  );

  useEffect(() => {
    const monsterId = monsterQueue.current[progressValue];

    if (activeMonsterValue === null && monsterId) {
      setActiveMonster(monsterId);
    }
  }, [activeMonsterValue, progressValue, setActiveMonster]);

  return (
    <div className="spaced-vertical">
      {monsterQueue.current.map((id) => (
        <Monster id={id} key={id} />
      ))}
    </div>
  );
}
