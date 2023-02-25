import { ReactComponent as IconCompass } from "@neverquest/icons/compass.svg";
import { ReactComponent as IconCrystal } from "@neverquest/icons/crystal-eye.svg";
import { ReactComponent as IconKnapsack } from "@neverquest/icons/knapsack.svg";
import { ReactComponent as IconStone } from "@neverquest/icons/stone-wheel.svg";
import { Trinket } from "@neverquest/types";

export const TRINKET_COMPASS: Trinket = {
  coinPrice: 35,
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

export const TRINKET_LODESTONE: Trinket = {
  coinPrice: 25,
  description: "Lure more monsters in the wilderness when everything's dead.",
  Icon: IconCrystal,
  isPortable: true,
  name: "Lodestone",
  weight: 1,
};
