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
    baseAmount: 80,
    baseRegenerationAmount: 4,
    baseRegenerationRate: 4000,
    label: "Health",
    regenerationDelta: "healthRegenerationRate",
  },
  stamina: {
    baseAmount: 10,
    baseRegenerationAmount: 1,
    baseRegenerationRate: 3500,
    label: "Stamina",
    regenerationDelta: "staminaRegenerationRate",
  },
};
