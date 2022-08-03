import compassIcon from "@neverquest/icons/compass.svg";
import knapsackIcon from "@neverquest/icons/knapsack.svg";
import stoneIcon from "@neverquest/icons/stone-wheel.svg";
import { Item } from "@neverquest/types";

// TODO
export const ITEM_COMPASS: Item = {
  description: "Seek out more monsters in the wilderness.",
  icon: compassIcon,
  isPortable: true,
  name: "Compass",
  price: 30,
  weight: 1,
};

// TODO
export const ITEM_HEARTHSTONE: Item = {
  description: "Travel back to the caravan even if there are still lurking monsters.",
  icon: stoneIcon,
  isPortable: true,
  name: "Hearthstone",
  price: 55,
  weight: 1,
};

export const ITEM_KNAPSACK: Item = {
  description: "Carry more items and manage gear.",
  icon: knapsackIcon,
  isPortable: false,
  name: "Knapsack",
  price: 12,
  weight: 0,
};
