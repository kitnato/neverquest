import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

import LOCRA from "locra";
import { CreatureType } from "locra/env";
import { deltaHealthMonster } from "neverquest/state/deltas";
import { level, nsfw } from "neverquest/state/global";
import {
  currentHealthMonster,
  isMonsterEngaged,
  maximumHealthMonster,
  monsterName,
} from "neverquest/state/monster";
import { UIFloatingTextType } from "neverquest/env";

export default function useNewMonster() {
  const [currentMonsterHeathValue, setCurrentMonsterHealth] = useRecoilState(currentHealthMonster);
  const levelValue = useRecoilValue(level);
  const maximumHealthMonsterValue = useRecoilValue(maximumHealthMonster);
  const nsfwValue = useRecoilValue(nsfw);
  const setMonsterEngaged = useSetRecoilState(isMonsterEngaged);
  const setMonsterName = useSetRecoilState(monsterName);
  const setDeltaHealthMonster = useSetRecoilState(deltaHealthMonster);

  return (onlyRegenerate = false) => {
    setCurrentMonsterHealth(maximumHealthMonsterValue);

    if (onlyRegenerate) {
      const difference = maximumHealthMonsterValue - currentMonsterHeathValue;

      if (difference > 0) {
        setDeltaHealthMonster({
          color: UIFloatingTextType.Positive,
          value: `+${difference}`,
        });
      }
    } else {
      setMonsterName(
        LOCRA.generateCreature({
          isNSFW: nsfwValue,
          hasPrefix: Math.random() < 0.8,
          hasSuffix: Math.random() < 0.1 * Math.ceil(levelValue / 2),
          type: CreatureType.Monster,
        })
      );

      setMonsterEngaged(false);
    }
  };
}
