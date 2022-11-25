import CompassUseButton from "@neverquest/components/Inventory/Item/CompassUseButton";
import HearthstoneUseButton from "@neverquest/components/Inventory/Item/HearthstoneUseButton";
import LodestoneUseButton from "@neverquest/components/Inventory/Item/LodestoneUseButton";
import { ReactComponent as IconCompass } from "@neverquest/icons/compass.svg";
import { ReactComponent as IconCrystal } from "@neverquest/icons/crystal-eye.svg";
import { ReactComponent as IconKnapsack } from "@neverquest/icons/knapsack.svg";
import { ReactComponent as IconStone } from "@neverquest/icons/stone-wheel.svg";
import { Item } from "@neverquest/types";

export const ITEM_COMPASS: Item = {
  Action: CompassUseButton,
  description: "Navigate the wilderness to return to previous locations.",
  Icon: IconCompass,
  isPortable: true,
  name: "Compass",
  price: 35,
  weight: 1,
};

// TODO
export const ITEM_HEARTHSTONE: Item = {
  Action: HearthstoneUseButton,
  description: "Travel back to the caravan even if there are still lurking monsters.",
  Icon: IconStone,
  isPortable: true,
  name: "Hearthstone",
  price: 50,
  weight: 1,
};

export const ITEM_KNAPSACK: Item = {
  description: "Carry more items and manage gear.",
  Icon: IconKnapsack,
  isPortable: false,
  name: "Knapsack",
  price: 15,
  weight: 0,
};

export const ITEM_LODESTONE: Item = {
  Action: LodestoneUseButton,
  description: "Lure more monsters in the wilderness when everything's dead.",
  Icon: IconCrystal,
  isPortable: true,
  name: "Lodestone",
  price: 25,
  weight: 1,
};
