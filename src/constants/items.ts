import { ReactComponent as IconCompass } from "@neverquest/icons/compass.svg";
import { ReactComponent as IconCrystal } from "@neverquest/icons/crystal-eye.svg";
import { ReactComponent as IconKnapsack } from "@neverquest/icons/knapsack.svg";
import { ReactComponent as IconStone } from "@neverquest/icons/stone-wheel.svg";
import { Item } from "@neverquest/types";

// TODO
export const ITEM_COMPASS: Item = {
  description: "Return to locations previously visited.",
  Icon: IconCompass,
  isPortable: true,
  name: "Compass",
  price: 30,
  weight: 1,
};

// TODO
export const ITEM_HEARTHSTONE: Item = {
  description: "Travel back to the caravan even if there are still lurking monsters.",
  Icon: IconStone,
  isPortable: true,
  name: "Hearthstone",
  price: 55,
  weight: 1,
};

export const ITEM_KNAPSACK: Item = {
  description: "Carry more items and manage gear.",
  Icon: IconKnapsack,
  isPortable: false,
  name: "Knapsack",
  price: 12,
  weight: 0,
};

// TODO
export const ITEM_LODESTONE: Item = {
  description: "Attract more monsters even when everything's dead.",
  Icon: IconCrystal,
  isPortable: true,
  name: "Lodestone",
  price: 25,
  weight: 1,
};
