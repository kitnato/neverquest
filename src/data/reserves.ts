import type { Delta, Reserve } from "@neverquest/types/unions";

export const HEALTH_LOW_THRESHOLD = 0.33;

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
    baseAmount: 50,
    baseRegenerationAmount: 3,
    baseRegenerationRate: 4000,
    label: "Health",
    regenerationDelta: "healthRegenerationRate",
  },
  stamina: {
    baseAmount: 8,
    baseRegenerationAmount: 1,
    baseRegenerationRate: 3500,
    label: "Stamina",
    regenerationDelta: "staminaRegenerationRate",
  },
};
