import { useRecoilValue, useResetRecoilState, useSetRecoilState } from "recoil";

import { experience } from "state/character";
import { progress } from "state/global";
import { aetherLoot, coinsLoot, scrapLoot } from "state/loot";
import { currentHealthMonster, monsterLoot } from "state/monster";

export default function useKill() {
  const { aether, coins, experience: xp, scrap } = useRecoilValue(monsterLoot);
  const resetCurrentMonsterHealth = useResetRecoilState(currentHealthMonster);
  const setAetherLoot = useSetRecoilState(aetherLoot);
  const setCoinsLoot = useSetRecoilState(coinsLoot);
  const setExperience = useSetRecoilState(experience);
  const setProgress = useSetRecoilState(progress);
  const setScrapLoot = useSetRecoilState(scrapLoot);

  return () => {
    setAetherLoot((currentAetherLoot) => currentAetherLoot + aether);
    setCoinsLoot((currentCoinsLoot) => currentCoinsLoot + coins);
    setScrapLoot((currentScrapLoot) => currentScrapLoot + scrap);

    setExperience((currentExperience) => currentExperience + xp);
    setProgress((currentProgress) => currentProgress + 1);

    resetCurrentMonsterHealth();
  };
}
