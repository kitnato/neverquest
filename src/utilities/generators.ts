import { nanoid } from "nanoid";

import {
  ARMOR_SPECIFICATIONS,
  SHIELD_SPECIFICATIONS,
  WEAPON_BASE,
} from "@neverquest/data/inventory";
import { LOCATION_NAME } from "@neverquest/data/location";
import { generateArtifact } from "@neverquest/LOCRAN/generate/generateArtifact";
import { generateLocation } from "@neverquest/LOCRAN/generate/generateLocation";
import type { AffixTag, ArmorClass, ShieldClass, WeaponClass } from "@neverquest/LOCRAN/types";
import type { Armor, Melee, Ranged, Shield } from "@neverquest/types";
import { isGeneratorRange } from "@neverquest/types/type-guards";
import type { Grip } from "@neverquest/types/unions";
import {
  getArmorRanges,
  getFromRange,
  getGearPrice,
  getGrowthSigmoid,
  getMeleeRanges,
  getRangedRanges,
  getShieldRanges,
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
  const { deflection, protection, staminaCost, weight } = getArmorRanges({
    factor,
    gearClass,
  });

  return {
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
    price: getGearPrice({
      factor,
      ...ARMOR_SPECIFICATIONS[gearClass],
    }),
    protection: getFromRange(protection),
    staminaCost: isGeneratorRange(staminaCost) ? getFromRange(staminaCost) : staminaCost,
    weight: getFromRange(weight),
  };
}

export function generateMeleeWeapon({
  allowNSFW,
  gearClass,
  grip,
  hasPrefix,
  hasSuffix,
  level,
  tags,
}: {
  allowNSFW: boolean;
  gearClass: WeaponClass;
  grip: Grip;
  hasPrefix?: boolean;
  hasSuffix?: boolean;
  level: number;
  tags?: AffixTag[];
}): Melee {
  const factor = getGrowthSigmoid(level);
  const { abilityChance, damage, rate, staminaCost, weight } = getMeleeRanges({
    factor,
    gearClass,
    grip,
  });

  return {
    abilityChance: getFromRange(abilityChance),
    damage: getFromRange(damage),
    gearClass,
    gems: [],
    grip,
    id: nanoid(),
    isEquipped: false,
    level,
    name: generateArtifact({
      allowNSFW,
      hasPrefix,
      hasSuffix,
      query: {
        artifactClass: gearClass,
        subtype: "melee",
        type: "weapon",
      },
      tags,
    }),
    price: getGearPrice({ factor, ...WEAPON_BASE }),
    rate: getFromRange(rate),
    staminaCost: getFromRange(staminaCost),
    weight: getFromRange(weight),
  };
}

export function generateRangedWeapon({
  allowNSFW,
  gearClass,
  hasPrefix,
  hasSuffix,
  level,
  tags,
}: {
  allowNSFW: boolean;
  gearClass: WeaponClass;
  hasPrefix?: boolean;
  hasSuffix?: boolean;
  level: number;
  tags?: AffixTag[];
}): Ranged {
  const factor = getGrowthSigmoid(level);
  const { abilityChance, ammunitionCost, damage, range, rate, staminaCost, weight } =
    getRangedRanges({
      factor,
      gearClass,
    });

  return {
    abilityChance: getFromRange(abilityChance),
    ammunitionCost: getFromRange(ammunitionCost),
    damage: getFromRange(damage),
    gearClass,
    gems: [],
    id: nanoid(),
    isEquipped: false,
    level,
    name: generateArtifact({
      allowNSFW,
      hasPrefix,
      hasSuffix,
      query: {
        artifactClass: gearClass,
        subtype: "ranged",
        type: "weapon",
      },
      tags,
    }),
    price: getGearPrice({ factor, ...WEAPON_BASE }),
    range: getFromRange(range),
    rate: getFromRange(rate),
    staminaCost: getFromRange(staminaCost),
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
  const { block, stagger, staminaCost, weight } = getShieldRanges({
    factor,
    gearClass,
  });

  return {
    block: getFromRange(block),
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
    price: getGearPrice({
      factor,
      ...SHIELD_SPECIFICATIONS[gearClass],
    }),
    stagger: stagger === null ? 0 : getFromRange(stagger),
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
