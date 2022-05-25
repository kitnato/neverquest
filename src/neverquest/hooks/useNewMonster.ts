import { useAtom, useAtomValue, useSetAtom } from "jotai";

import LOCRA from "locra";
import { CreatureType } from "locra/types";
import { deltaHealthMonster } from "neverquest/state/deltas";
import { level, nsfw } from "neverquest/state/global";
import {
  currentHealthMonster,
  isMonsterEngaged,
  maximumHealthMonster,
  monsterName,
} from "neverquest/state/monster";
import { FloatingTextType } from "neverquest/types/ui";

export default function useNewMonster() {
  const [currentMonsterHeathValue, setCurrentMonsterHealth] = useAtom(currentHealthMonster);
  const levelValue = useAtomValue(level);
  const maximumHealthMonsterValue = useAtomValue(maximumHealthMonster);
  const nsfwValue = useAtomValue(nsfw);
  const setMonsterEngaged = useSetAtom(isMonsterEngaged);
  const setMonsterName = useSetAtom(monsterName);
  const setDeltaHealthMonster = useSetAtom(deltaHealthMonster);

  return (onlyRegenerate = false) => {
    setCurrentMonsterHealth(maximumHealthMonsterValue);

    if (onlyRegenerate) {
      const difference = maximumHealthMonsterValue - currentMonsterHeathValue;

      if (difference > 0) {
        setDeltaHealthMonster({
          color: FloatingTextType.Positive,
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
