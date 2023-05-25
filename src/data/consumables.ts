import { ReactComponent as IconBandages } from "@neverquest/icons/bandages.svg";
import { ReactComponent as IconStone } from "@neverquest/icons/hearthstone.svg";
import { ReactComponent as IconKnapsack } from "@neverquest/icons/knapsack.svg";
import type { Consumable, ConsumableName } from "@neverquest/types";
import type { SVGIcon } from "@neverquest/types/props";

export const CONSUMABLES: Record<ConsumableName, { Icon: SVGIcon; item: Consumable }> = {
  Bandages: {
    Icon: IconBandages,
    item: {
      coinPrice: 10,
      description: "Restores all health when used.",
      name: "Bandages",
      weight: 1,
    },
  },
  Elixir: {
    Icon: IconStone,
    item: {
      coinPrice: 40,
      description: "Restores all stamina.",
      name: "Elixir",
      weight: 1,
    },
  },
  Salve: {
    Icon: IconKnapsack,
    item: {
      coinPrice: 10,
      description: "Cures poison and blight.",
      name: "Salve",
      weight: 1,
    },
  },
};
