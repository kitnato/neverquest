import { selector } from "recoil";

import { isShowing } from "../isShowing";
import { essenceLoot, scrapLoot } from "../resources";
import LOCRA from "@neverquest/locra";
import { CreatureType } from "@neverquest/locra/types";
import { deltas } from "@neverquest/state/deltas";
import { level, progress } from "@neverquest/state/encounter";
import {
  currentHealthMonster,
  isMonsterEngaged,
  isMonsterNew,
  maximumHealthMonster,
  monsterLoot,
  monsterName,
} from "@neverquest/state/monster";
import { isNSFW } from "@neverquest/state/settings";
import { DeltaType, ShowingType } from "@neverquest/types/enums";
import { FloatingText } from "@neverquest/types/ui";

// TODO - better file name

export const lootDrop = selector({
  get: () => null,
  key: "lootDrop",
  set: ({ get, set }) => {
    const { essence, scrap } = get(monsterLoot);

    if (essence > 0) {
      set(essenceLoot, (current) => current + essence);
    }

    if (scrap > 0) {
      set(scrapLoot, (current) => current + scrap);
    }

    set(progress, (current) => current + 1);

    if (!get(isShowing(ShowingType.Attributes))) {
      set(isShowing(ShowingType.Attributes), true);
    }
  },
});

export const monsterCreate = selector({
  get: () => null,
  key: "monsterCreate",
  set: ({ get, set }) => {
    set(
      monsterName,
      LOCRA.generateCreature({
        hasPrefix: Math.random() < 0.8,
        hasSuffix: Math.random() < 0.1 * Math.ceil(get(level) / 2),
        isNSFW: get(isNSFW),
        type: CreatureType.Monster,
      })
    );

    set(isMonsterEngaged, false);
    set(currentHealthMonster, get(maximumHealthMonster));
    set(isMonsterNew, true);
  },
});

export const monsterRegenerate = selector({
  get: () => null,
  key: "monsterRegenerate",
  set: ({ get, set }) => {
    const maximumHealthMonsterValue = get(maximumHealthMonster);
    const difference = maximumHealthMonsterValue - get(currentHealthMonster);

    if (difference > 0) {
      set(deltas(DeltaType.HealthMonster), {
        color: FloatingText.Positive,
        value: `+${difference}`,
      });
    }

    set(currentHealthMonster, maximumHealthMonsterValue);
  },
});
