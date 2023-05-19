import { ReactComponent as IconCompass } from "@neverquest/icons/compass.svg";
import { ReactComponent as IconStone } from "@neverquest/icons/hearthstone.svg";
import { ReactComponent as IconKnapsack } from "@neverquest/icons/knapsack.svg";
import type { Trinket, TrinketName } from "@neverquest/types";
import type { SVGIcon } from "@neverquest/types/props";

export const TRINKET_COMPASS: Readonly<Trinket> = {
  coinPrice: 20,
  description: "Navigate the wilderness to hunt in previous locations.",
  name: "Compass",
  weight: 1,
} as const;

export const TRINKET_HEARTHSTONE: Readonly<Trinket> = {
  coinPrice: 40,
  description: "Travel back to the caravan even if there are still lurking monsters.",
  name: "Hearthstone",
  weight: 1,
};

export const TRINKET_KNAPSACK: Readonly<Trinket> = {
  coinPrice: 10,
  description: "Carry more possessions and manage gear.",
  name: "Knapsack",
  weight: 0,
} as const;

// SVGIcon is not serializable for localStorage, so it needs to be looked up when rendered instead.
export const TRINKET_ICONS: Record<TrinketName, SVGIcon> = {
  Compass: IconCompass,
  Hearthstone: IconStone,
  Knapsack: IconKnapsack,
} as const;
