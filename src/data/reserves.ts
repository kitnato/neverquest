import type { Delta, Reserve } from "@neverquest/types/unions";

export const RESERVES: Record<
  Reserve,
  {
    baseAmount: number;
    baseRegenerationAmount: number;
    baseRegenerationRate: number;
    label: string;
    regenerationDelta: Delta;
  }
> = {
  health: {
    baseAmount: 10,
    baseRegenerationAmount: 4,
    baseRegenerationRate: 5000,
    label: "Health",
    regenerationDelta: "healthRegenerationRate",
  },
  stamina: {
    baseAmount: 100,
    baseRegenerationAmount: 1,
    baseRegenerationRate: 4500,
    label: "Stamina",
    regenerationDelta: "staminaRegenerationRate",
  },
};
