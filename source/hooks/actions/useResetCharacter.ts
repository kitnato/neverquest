import { useRecoilCallback } from "recoil";

import {
  blacksmithInventory,
  fletcherInventory,
  merchantInventory,
} from "@neverquest/state/caravan";
import { attackDuration, name } from "@neverquest/state/character";
import {
  defeatedFinality,
  isStageStarted,
  location,
  progress,
  stage,
} from "@neverquest/state/encounter";
import { armor, shield, weapon } from "@neverquest/state/gear";
import {
  blight,
  health,
  poisonDuration,
  regenerationDuration,
  stamina,
} from "@neverquest/state/reserves";
import { essence } from "@neverquest/state/resources";
import { expandedBuyback, expandedMasteries } from "@neverquest/state/settings";

export function useResetCharacter() {
  return useRecoilCallback(
    ({ reset }) =>
      () => {
        reset(armor);
        reset(attackDuration);
        reset(blacksmithInventory);
        reset(blight);
        reset(expandedBuyback);
        reset(expandedMasteries);
        reset(essence);
        reset(defeatedFinality);
        reset(fletcherInventory);
        reset(health);
        reset(isStageStarted);
        reset(poisonDuration);
        reset(progress);
        reset(location);
        reset(merchantInventory);
        reset(name);
        reset(regenerationDuration("health"));
        reset(regenerationDuration("stamina"));
        reset(shield);
        reset(stage);
        reset(stamina);
        reset(weapon);
      },
    [],
  );
}
