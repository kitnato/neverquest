import type { Delta, Reserve } from "@neverquest/types/unions";

export const AILING_RESERVE_MINIMUM = 1;

export const HEALTH_LOW_THRESHOLD = 0.33;

export const RESERVES: Record<
  Reserve,
  {
    baseAmount: number;
    baseRegenerationAmount: number;
    baseRegenerationRate: number;
    regenerationDeltaAmount: Delta;
    regenerationDeltaRate: Delta;
  }
> = {
  health: {
    baseAmount: 50,
    baseRegenerationAmount: 4,
    baseRegenerationRate: 2650,
    regenerationDeltaAmount: "healthRegenerationAmount",
    regenerationDeltaRate: "healthRegenerationRate",
  },
  stamina: {
    baseAmount: 20,
    baseRegenerationAmount: 2,
    baseRegenerationRate: 2200,
    regenerationDeltaAmount: "staminaRegenerationAmount",
    regenerationDeltaRate: "staminaRegenerationRate",
  },
};
