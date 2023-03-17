import { ReactComponent as IconCompass } from "@neverquest/icons/compass.svg";
import { ReactComponent as IconKnapsack } from "@neverquest/icons/knapsack.svg";
import { ReactComponent as IconStone } from "@neverquest/icons/stone-wheel.svg";
import { Trinket } from "@neverquest/types";

export const TRINKET_COMPASS: Trinket = {
  coinPrice: 20,
  description: "Navigate the wilderness to return to previous locations.",
  Icon: IconCompass,
  isPortable: true,
  name: "Compass",
  weight: 1,
};

export const TRINKET_HEARTHSTONE: Trinket = {
  coinPrice: 50,
  description: "Travel back to the caravan even if there are still lurking monsters.",
  Icon: IconStone,
  isPortable: true,
  name: "Hearthstone",
  weight: 1,
};

export const TRINKET_KNAPSACK: Trinket = {
  coinPrice: 15,
  description: "Carry more possessions and manage gear.",
  Icon: IconKnapsack,
  isPortable: false,
  name: "Knapsack",
  weight: 0,
};
