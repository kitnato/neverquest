import { useRecoilValue, useSetRecoilState } from "recoil";

import useNewMonster from "neverquest/hooks/useNewMonster";
import { experience } from "neverquest/state/character";
import { progress } from "neverquest/state/global";
import { aetherLoot, coinsLoot, scrapLoot } from "neverquest/state/loot";
import { monsterLoot } from "neverquest/state/monster";

export default function useRewardKill() {
  const newMonster = useNewMonster();
  const setAetherLoot = useSetRecoilState(aetherLoot);
  const setCoinsLoot = useSetRecoilState(coinsLoot);
  const setExperience = useSetRecoilState(experience);
  const setProgress = useSetRecoilState(progress);
  const setScrapLoot = useSetRecoilState(scrapLoot);
  const { aether, coins, experience: xp, scrap } = useRecoilValue(monsterLoot);

  return () => {
    if (aether > 0) {
      setAetherLoot((currentAetherLoot) => currentAetherLoot + aether);
    }

    if (coins > 0) {
      setCoinsLoot((currentCoinsLoot) => currentCoinsLoot + coins);
    }

    if (scrap > 0) {
      setScrapLoot((currentScrapLoot) => currentScrapLoot + scrap);
    }

    setExperience((currentExperience) => currentExperience + xp);
    setProgress((currentProgress) => currentProgress + 1);

    newMonster();
  };
}
