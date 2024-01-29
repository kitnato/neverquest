import { useRecoilCallback } from "recoil";

import { attackDuration, name, recoveryDuration } from "@neverquest/state/character";
import { isStageStarted, location, progress, stage } from "@neverquest/state/encounter";
import { isWeaving } from "@neverquest/state/items";
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
      () => {
        reset(attackDuration);
        reset(blight);
        reset(essence);
        reset(health);
        reset(isWeaving);
        reset(isStageStarted);
        reset(poisonDuration);
        reset(progress);
        reset(location);
        reset(name);
        reset(recoveryDuration);
        reset(regenerationDuration("health"));
        reset(regenerationDuration("stamina"));
        reset(stage);
        reset(stamina);
      },
    [],
  );
}
