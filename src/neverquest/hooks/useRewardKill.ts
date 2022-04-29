import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

import { experience } from "neverquest/state/character";
import {
  deltaAetherLoot,
  deltaCoinsLoot,
  deltaExperience,
  deltaScrapLoot,
} from "neverquest/state/deltas";
import { progress } from "neverquest/state/global";
import { aetherLoot, coinsLoot, scrapLoot } from "neverquest/state/loot";
import { monsterLoot } from "neverquest/state/monster";
import { showAttributes } from "neverquest/state/show";
import { FloatingTextType } from "neverquest/types/ui";

export default function useRewardKill() {
  const setAetherLoot = useSetRecoilState(aetherLoot);
  const setCoinsLoot = useSetRecoilState(coinsLoot);
  const setDeltaAetherLoot = useSetRecoilState(deltaAetherLoot);
  const setDeltaCoinsLoot = useSetRecoilState(deltaCoinsLoot);
  const setDeltaExperience = useSetRecoilState(deltaExperience);
  const setDeltaScrapLoot = useSetRecoilState(deltaScrapLoot);
  const setExperience = useSetRecoilState(experience);
  const setProgress = useSetRecoilState(progress);
  const setScrapLoot = useSetRecoilState(scrapLoot);
  const [showAttributesValue, setShowAttributes] = useRecoilState(showAttributes);
  const { aether, coins, experience: xp, scrap } = useRecoilValue(monsterLoot);

  return () => {
    if (aether > 0) {
      setAetherLoot((currentAetherLoot) => currentAetherLoot + aether);
      setDeltaAetherLoot({
        color: FloatingTextType.Positive,
        value: `+${aether}`,
      });
    }

    if (coins > 0) {
      setCoinsLoot((currentCoinsLoot) => currentCoinsLoot + coins);
      setDeltaCoinsLoot({
        color: FloatingTextType.Positive,
        value: `+${coins}`,
      });
    }

    if (scrap > 0) {
      setScrapLoot((currentScrapLoot) => currentScrapLoot + scrap);
      setDeltaScrapLoot({
        color: FloatingTextType.Positive,
        value: `+${scrap}`,
      });
    }

    setExperience((currentExperience) => currentExperience + xp);
    setDeltaExperience({ color: FloatingTextType.Positive, value: `+${xp}` });
    setProgress((currentProgress) => currentProgress + 1);

    if (xp > 0 && !showAttributesValue) {
      setShowAttributes(true);
    }
  };
}
