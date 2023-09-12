import { nanoid } from "nanoid";

import {
  ARMOR_SPECIFICATIONS,
  SHIELD_SPECIFICATIONS,
  WEAPON_BASE,
} from "@neverquest/data/inventory";
import { LOCATION_NAME } from "@neverquest/data/location";
import { generateArtifact } from "@neverquest/LOCRAN/generate/generateArtifact";
import { generateLocation } from "@neverquest/LOCRAN/generate/generateLocation";
import type {
  AffixTag,
  ArmorClass,
  ShieldClass,
  WeaponClass,
  WeaponModality,
} from "@neverquest/LOCRAN/types";
import type { Armor, Shield, Weapon } from "@neverquest/types";
import type { WeaponGrip } from "@neverquest/types/unions";
import {
  getArmorRanges,
  getFromRange,
  getGearPrices,
  getGrowthSigmoid,
  getShieldRanges,
  getWeaponRanges,
} from "@neverquest/utilities/getters";

export function generateArmor({
  allowNSFW,
  gearClass,
  hasPrefix,
  hasSuffix,
  level,
  name,
  tags,
}: {
  allowNSFW: boolean;
  gearClass: ArmorClass;
  hasPrefix?: boolean;
  hasSuffix?: boolean;
  level: number;
  name?: string;
  tags?: AffixTag[];
}): Armor {
  const factor = getGrowthSigmoid(level);
  const { coinPrice, scrapPrice } = getGearPrices({
    factor,
    ...ARMOR_SPECIFICATIONS[gearClass],
  });
  const { deflection, protection, staminaCost, weight } = getArmorRanges({
    factor,
    gearClass,
  });

  return {
    coinPrice,
    deflection: deflection === null ? 0 : getFromRange(deflection),
    gearClass,
    gems: [],
    id: nanoid(),
    isEquipped: false,
    level,
    name:
      name ??
      generateArtifact({
        allowNSFW,
        hasPrefix,
        hasSuffix,
        query: {
          type: "armor",
        },
        tags,
      }),
    protection: getFromRange(protection),
    scrapPrice,
    staminaCost:
      staminaCost === null
        ? Infinity
        : typeof staminaCost === "number"
        ? staminaCost
        : getFromRange(staminaCost),
    weight: getFromRange(weight),
  };
}

export function generateShield({
  allowNSFW,
  gearClass,
  hasPrefix,
  hasSuffix,
  level,
  name,
  tags,
}: {
  allowNSFW: boolean;
  gearClass: ShieldClass;
  hasPrefix?: boolean;
  hasSuffix?: boolean;
  level: number;
  name?: string;
  tags?: AffixTag[];
}): Shield {
  const factor = getGrowthSigmoid(level);
  const { coinPrice, scrapPrice } = getGearPrices({
    factor,
    ...SHIELD_SPECIFICATIONS[gearClass],
  });
  const { block, stagger, staminaCost, weight } = getShieldRanges({
    factor,
    gearClass,
  });

  return {
    block: getFromRange(block),
    coinPrice,
    gearClass,
    gems: [],
    id: nanoid(),
    isEquipped: false,
    level,
    name:
      name ??
      generateArtifact({
        allowNSFW,
        hasPrefix,
        hasSuffix,
        query: {
          subtype: gearClass,
          type: "shield",
        },
        tags,
      }),
    scrapPrice,
    stagger: stagger === null ? 0 : getFromRange(stagger),
    staminaCost: getFromRange(staminaCost),
    weight: getFromRange(weight),
  };
}

export function generateWeapon({
  allowNSFW,
  gearClass,
  grip,
  hasPrefix,
  hasSuffix,
  level,
  modality,
  tags,
}: {
  allowNSFW: boolean;
  gearClass: WeaponClass;
  grip: WeaponGrip;
  hasPrefix?: boolean;
  hasSuffix?: boolean;
  level: number;
  modality: WeaponModality;
  tags?: AffixTag[];
}): Weapon {
  const factor = getGrowthSigmoid(level);
  const { coinPrice, scrapPrice } = getGearPrices({ factor, ...WEAPON_BASE });
  const { abilityChance, damage, range, rate, staminaCost, weight } = getWeaponRanges({
    factor,
    gearClass,
    grip,
    modality,
  });

  return {
    abilityChance: getFromRange(abilityChance),
    coinPrice,
    damage: getFromRange(damage),
    gearClass,
    gems: [],
    grip,
    id: nanoid(),
    isEquipped: false,
    level,
    modality,
    name: generateArtifact({
      allowNSFW,
      hasPrefix,
      hasSuffix,
      query: {
        artifactClass: gearClass,
        subtype: modality,
        type: "weapon",
      },
      tags,
    }),
    range: modality === "melee" ? 0 : getFromRange(range),
    rate: getFromRange(rate),
    scrapPrice,
    staminaCost: getFromRange(staminaCost),
    weight: getFromRange(weight),
  };
}

export function generateWilderness({ allowNSFW, stage }: { allowNSFW: boolean; stage: number }) {
  const { prefix, suffix } = LOCATION_NAME;
  const factor = getGrowthSigmoid(stage);

  return generateLocation({
    allowNSFW,
    hasPrefix: Math.random() <= prefix.minimum + (prefix.maximum - prefix.minimum) * factor,
    hasSuffix: Math.random() <= suffix.minimum + (suffix.maximum - suffix.minimum) * factor,
  });
}
