import { atomFamily } from "recoil";

import { ShowingType } from "@neverquest/types/enums";

export const isShowing = atomFamily<boolean, ShowingType>({
  default: false,
  key: "isShowing",
});
