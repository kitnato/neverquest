import knapsackIcon from "neverquest/icons/knapsack.svg";
import { Item } from "neverquest/types/core";

// TODO
export const ITEM_COMPASS: Item = {
  description: "Seek out more monsters in the wilderness.",
  icon: knapsackIcon,
  isCarriable: true,
  name: "Compass",
  price: 30,
  weight: 1,
};

// TODO
export const ITEM_HEARTHSTONE: Item = {
  description: "Travel back to the caravan even if there are still lurking monsters.",
  icon: knapsackIcon,
  isCarriable: true,
  name: "Hearthstone",
  price: 55,
  weight: 1,
};

export const ITEM_KNAPSACK: Item = {
  description: "Carry more items and manage gear.",
  icon: knapsackIcon,
  isCarriable: false,
  name: "Knapsack",
  price: 12,
  weight: 0,
};
