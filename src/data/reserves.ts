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
    baseAmount: 40,
    baseRegenerationAmount: 2,
    baseRegenerationRate: 3600,
    label: "Health",
    regenerationDelta: "healthRegenerationRate",
  },
  stamina: {
    baseAmount: 10,
    baseRegenerationAmount: 1,
    baseRegenerationRate: 3300,
    label: "Stamina",
    regenerationDelta: "staminaRegenerationRate",
  },
};
