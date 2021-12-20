import { useEffect, useRef } from "react";
import Stack from "react-bootstrap/Stack";
import { useRecoilState, useRecoilValue } from "recoil";
import { v4 as uuidv4 } from "uuid";

import Monster from "components/Monster";
import { activeMonster, progress, progressMax } from "state/global";

export default function Wilderness() {
  const [activeMonsterValue, setActiveMonster] = useRecoilState(activeMonster);
  const progressValue = useRecoilValue(progress);
  const progressMaxValue = useRecoilValue(progressMax);
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
    <Stack gap={3}>
      {monsterQueue.current.map((id) => (
        <Monster id={id} key={id} />
      ))}
    </Stack>
  );
}
