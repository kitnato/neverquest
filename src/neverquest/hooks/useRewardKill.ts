import { useAtom, useAtomValue, useSetAtom } from "jotai";

import { experience } from "neverquest/state/character";
import { deltaAetherLoot, deltaExperience, deltaScrapLoot } from "neverquest/state/deltas";
import { progress } from "neverquest/state/global";
import { aetherLoot, scrapLoot } from "neverquest/state/resources";
import { monsterLoot } from "neverquest/state/monster";
import { showAttributes } from "neverquest/state/show";
import { FloatingTextType } from "neverquest/types/ui";

export default function useRewardKill() {
  const setAetherLoot = useSetAtom(aetherLoot);
  const setDeltaAetherLoot = useSetAtom(deltaAetherLoot);
  const setDeltaExperience = useSetAtom(deltaExperience);
  const setDeltaScrapLoot = useSetAtom(deltaScrapLoot);
  const setExperience = useSetAtom(experience);
  const setProgress = useSetAtom(progress);
  const setScrapLoot = useSetAtom(scrapLoot);
  const [showAttributesValue, setShowAttributes] = useAtom(showAttributes);
  const { aether, experience: xp, scrap } = useAtomValue(monsterLoot);

  return () => {
    if (aether > 0) {
      setAetherLoot((current) => current + aether);
      setDeltaAetherLoot({
        color: FloatingTextType.Positive,
        value: `+${aether}`,
      });
    }

    if (scrap > 0) {
      setScrapLoot((current) => current + scrap);
      setDeltaScrapLoot({
        color: FloatingTextType.Positive,
        value: `+${scrap}`,
      });
    }

    setExperience((currentHealthMonster) => currentHealthMonster + xp);
    setDeltaExperience({ color: FloatingTextType.Positive, value: `+${xp}` });
    setProgress((current) => current + 1);

    if (xp > 0 && !showAttributesValue) {
      setShowAttributes(true);
    }
  };
}
