import { useRecoilCallback } from "recoil";

import {
  blacksmithInventory,
  expandedBuyback,
  fletcherInventory,
  merchantInventory,
} from "@neverquest/state/caravan";
import { attackDuration, name, recoveryDuration } from "@neverquest/state/character";
import { isStageStarted, location, progress, stage } from "@neverquest/state/encounter";
import { armor, shield, weapon } from "@neverquest/state/gear";
import { ammunition, isSpinning } from "@neverquest/state/items";
import { expandedMasteries } from "@neverquest/state/masteries";
import { questProgress } from "@neverquest/state/quests";
import {
  blight,
  health,
  poisonDuration,
  regenerationDuration,
  stamina,
} from "@neverquest/state/reserves";
import { essence } from "@neverquest/state/resources";

export function useResetCharacter() {
  return useRecoilCallback(
    ({ reset }) =>
      (resetGear?: boolean) => {
        reset(attackDuration);
        reset(blacksmithInventory);
        reset(blight);
        reset(expandedBuyback);
        reset(expandedMasteries);
        reset(essence);
        reset(fletcherInventory);
        reset(health);
        reset(isSpinning);
        reset(isStageStarted);
        reset(poisonDuration);
        reset(progress);
        reset(location);
        reset(merchantInventory);
        reset(name);
        reset(questProgress("stages"));
        reset(questProgress("stagesEnd"));
        reset(questProgress("survivingNoAttributes"));
        reset(questProgress("survivingNoGear"));
        reset(recoveryDuration);
        reset(regenerationDuration("health"));
        reset(regenerationDuration("stamina"));
        reset(stage);
        reset(stamina);

        if (resetGear) {
          reset(ammunition);
          reset(armor);
          reset(shield);
          reset(weapon);
        }
      },
    [],
  );
}
