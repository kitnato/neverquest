import { ReactComponent as IconCompass } from "@neverquest/icons/compass.svg";
import { ReactComponent as IconStone } from "@neverquest/icons/hearthstone.svg";
import { ReactComponent as IconKnapsack } from "@neverquest/icons/knapsack.svg";
import type { Trinket, TrinketName } from "@neverquest/types";
import type { SVGIcon } from "@neverquest/types/props";

export const TRINKETS: Record<TrinketName, { Icon: SVGIcon; item: Trinket }> = {
  Compass: {
    Icon: IconCompass,
    item: {
      coinPrice: 20,
      description: "Navigate the wilderness to hunt in previous locations.",
      name: "Compass",
      weight: 1,
    },
  },
  Hearthstone: {
    Icon: IconStone,
    item: {
      coinPrice: 40,
      description: "Travel back to the caravan even if there are still lurking monsters.",
      name: "Hearthstone",
      weight: 1,
    },
  },
  Knapsack: {
    Icon: IconKnapsack,
    item: {
      coinPrice: 10,
      description: "Carry more items and manage gear.",
      name: "Knapsack",
      weight: 0,
    },
  },
};

export const KNAPSACK_SIZE = 3;
