import { useRecoilValue, useSetRecoilState } from "recoil";

import LOCRA from "locra";
import { CreatureType } from "locra/env.d";
import { level, nsfw } from "neverquest/state/global";
import { currentHealthMonster, maximumHealthMonster, monsterName } from "neverquest/state/monster";

export default function useNewMonster() {
  const setCurrentMonsterHealth = useSetRecoilState(currentHealthMonster);
  const setMonsterName = useSetRecoilState(monsterName);
  const levelValue = useRecoilValue(level);
  const maximumHealthMonsterValue = useRecoilValue(maximumHealthMonster);
  const nsfwValue = useRecoilValue(nsfw);

  return (onlyRegenerate = false) => {
    setCurrentMonsterHealth(maximumHealthMonsterValue);

    if (!onlyRegenerate) {
      setMonsterName(
        LOCRA.generateCreature({
          isNSFW: nsfwValue,
          hasPrefix: Math.random() < 0.9,
          hasSuffix: Math.random() < 0.2 * Math.ceil(levelValue / 2),
          type: CreatureType.Monster,
        })
      );
    }
  };
}
