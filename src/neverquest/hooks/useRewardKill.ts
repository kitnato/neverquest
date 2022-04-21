import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

import { experience } from "neverquest/state/character";
import { deltaExperience } from "neverquest/state/deltas";
import { progress } from "neverquest/state/global";
import { aetherLoot, coinsLoot, scrapLoot } from "neverquest/state/loot";
import { monsterLoot } from "neverquest/state/monster";
import { showAttributes } from "neverquest/state/show";
import { UIFloatingTextType } from "neverquest/env";

export default function useRewardKill() {
  const setAetherLoot = useSetRecoilState(aetherLoot);
  const setCoinsLoot = useSetRecoilState(coinsLoot);
  const setDeltaExperience = useSetRecoilState(deltaExperience);
  const setExperience = useSetRecoilState(experience);
  const setProgress = useSetRecoilState(progress);
  const setScrapLoot = useSetRecoilState(scrapLoot);
  const [showAttributesValue, setShowAttributes] = useRecoilState(showAttributes);
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
    setDeltaExperience({ color: UIFloatingTextType.Positive, value: `+${xp}` });
    setProgress((currentProgress) => currentProgress + 1);

    if (xp > 0 && !showAttributesValue) {
      setShowAttributes(true);
    }
  };
}
