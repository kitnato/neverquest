import { atomFamily } from "recoil";

import { DeltaType } from "@neverquest/types/enums";
import { DeltaDisplay } from "@neverquest/types/ui";
import { DELTA_DEFAULT } from "@neverquest/utilities/constants";

export const deltas = atomFamily<DeltaDisplay, DeltaType>({
  default: DELTA_DEFAULT,
  key: "deltas",
});
