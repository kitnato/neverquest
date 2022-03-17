import { useRecoilValue, useResetRecoilState, useSetRecoilState } from "recoil";

import SLIM from "slim";
import { experience } from "neverquest/state/character";
import { progress } from "neverquest/state/global";
import { aetherLoot, coinsLoot, scrapLoot } from "neverquest/state/loot";
import { currentHealthMonster, monsterLoot, monsterName } from "neverquest/state/monster";
import { SLIMCategory } from "slim/env";

export default function useKill() {
  const { aether, coins, experience: xp, scrap } = useRecoilValue(monsterLoot);
  const resetCurrentMonsterHealth = useResetRecoilState(currentHealthMonster);
  const setAetherLoot = useSetRecoilState(aetherLoot);
  const setCoinsLoot = useSetRecoilState(coinsLoot);
  const setExperience = useSetRecoilState(experience);
  const setMonsterName = useSetRecoilState(monsterName);
  const setProgress = useSetRecoilState(progress);
  const setScrapLoot = useSetRecoilState(scrapLoot);

  return () => {
    setAetherLoot((currentAetherLoot) => currentAetherLoot + aether);
    setCoinsLoot((currentCoinsLoot) => currentCoinsLoot + coins);
    setScrapLoot((currentScrapLoot) => currentScrapLoot + scrap);

    setExperience((currentExperience) => currentExperience + xp);
    setProgress((currentProgress) => currentProgress + 1);

    resetCurrentMonsterHealth();
    setMonsterName(SLIM.generate(SLIMCategory.Monster));
  };
}
