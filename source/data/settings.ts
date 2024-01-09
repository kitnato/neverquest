import type { Setting } from "@neverquest/types/unions";

export const SETTINGS: Record<Setting, { isActive: boolean; label: string }> = {
  autoEquip: {
    isActive: true,
    label: "Auto-equip new gear",
  },
  damagePerSecond: {
    isActive: false,
    label: "Show damage per second",
  },
  gearComparison: {
    isActive: true,
    label: "Show gear comparisons",
  },
  gearLevel: {
    isActive: false,
    label: "Show gear level",
  },
  lowHealthWarning: {
    isActive: true,
    label: "Low-health warning",
  },
};
