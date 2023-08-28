import { nanoid } from "nanoid";

import { ATTACK_RATE_ATTENUATION } from "@neverquest/data/combat";
import {
  ARMOR_BASE,
  ARMOR_SPECIFICATIONS,
  SHIELD_BASE,
  SHIELD_SPECIFICATIONS,
  WEAPON_BASE,
  WEAPON_SPECIFICATIONS,
} from "@neverquest/data/inventory";
import { LOCATION_AFFIX_BASE } from "@neverquest/data/location";
import { LOCRA } from "@neverquest/LOCRA";
import type {
  AffixTag,
  ArmorClass,
  ShieldClass,
  WeaponClass,
  WeaponModality,
} from "@neverquest/LOCRA/types";
import type { Armor, Shield, Weapon } from "@neverquest/types";
import { getFromRange, getGrowthSigmoid } from "@neverquest/utilities/getters";

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
  const { coinPrice, protection, scrapPrice, staminaCost, weight } = ARMOR_BASE;
  const { deflectionRange, dodgeCostModifier, priceModifier, protectionModifier, weightModifier } =
    ARMOR_SPECIFICATIONS[gearClass];
  const growthFactor = getGrowthSigmoid(level);
  const ranges =
    deflectionRange === undefined
      ? null
      : {
          deflection: {
            maximum:
              deflectionRange[0].maximum +
              (deflectionRange[1].maximum - deflectionRange[0].maximum) * growthFactor,
            minimum:
              deflectionRange[0].minimum +
              (deflectionRange[1].minimum - deflectionRange[0].minimum) * growthFactor,
          },
        };

  return {
    coinPrice: Math.round(coinPrice * growthFactor * priceModifier),
    deflection: ranges === null ? 0 : getFromRange(ranges.deflection),
    gearClass,
    gems: [],
    id: nanoid(),
    isEquipped: false,
    level,
    name:
      name ??
      LOCRA.generateArtifact({
        allowNSFW,
        hasPrefix,
        hasSuffix,
        query: {
          type: "armor",
        },
        tags,
      }),
    protection: Math.round(protection * growthFactor * protectionModifier),
    ranges,
    scrapPrice: Math.round(scrapPrice * growthFactor * priceModifier),
    staminaCost: Math.ceil(staminaCost * growthFactor * dodgeCostModifier),
    weight: Math.ceil(weight * growthFactor * weightModifier),
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
  const { coinPrice, scrapPrice, stagger, staminaCost, weight } = SHIELD_BASE;
  const { blockRange, staggerModifier, staminaCostModifier, weightModifier } =
    SHIELD_SPECIFICATIONS[gearClass];
  const growthFactor = getGrowthSigmoid(level);
  const ranges = {
    block: {
      maximum:
        blockRange[0].maximum + (blockRange[1].maximum - blockRange[0].maximum) * growthFactor,
      minimum:
        blockRange[0].minimum + (blockRange[1].minimum - blockRange[0].minimum) * growthFactor,
    },
  };

  return {
    block: getFromRange(ranges.block),
    coinPrice: Math.round(coinPrice * growthFactor),
    gearClass,
    gems: [],
    id: nanoid(),
    isEquipped: false,
    level,
    name:
      name ??
      LOCRA.generateArtifact({
        allowNSFW,
        hasPrefix,
        hasSuffix,
        query: {
          subtype: gearClass,
          type: "shield",
        },
        tags,
      }),
    ranges,
    scrapPrice: Math.round(scrapPrice * growthFactor),
    stagger: (stagger.minimum + stagger.attenuation * growthFactor) * staggerModifier,
    staminaCost: Math.ceil(staminaCost * growthFactor * staminaCostModifier),
    weight: Math.ceil(weight * growthFactor * weightModifier),
  };
}

export function generateWeapon({
  allowNSFW,
  gearClass,
  hasPrefix,
  hasSuffix,
  level,
  modality,
  tags,
}: {
  allowNSFW: boolean;
  gearClass: WeaponClass;
  hasPrefix?: boolean;
  hasSuffix?: boolean;
  level: number;
  modality: WeaponModality;
  tags?: AffixTag[];
}): Weapon {
  const { coinPrice, damage, rate, scrapPrice, staminaCost, weight } = WEAPON_BASE;
  const { abilityChance } = WEAPON_SPECIFICATIONS[gearClass];
  const growthFactor = getGrowthSigmoid(level);
  const ranges = {
    ability: {
      maximum:
        abilityChance[0].maximum +
        (abilityChance[1].maximum - abilityChance[0].maximum) * growthFactor,
      minimum:
        abilityChance[0].minimum +
        (abilityChance[1].minimum - abilityChance[0].minimum) * growthFactor,
    },
    damage: {
      maximum: Math.round(damage.maximum * growthFactor),
      minimum: Math.round(damage.minimum * growthFactor),
    },
    rate: {
      maximum: rate.maximum - Math.round(ATTACK_RATE_ATTENUATION * growthFactor),
      minimum: rate.minimum - Math.round(ATTACK_RATE_ATTENUATION * growthFactor),
    },
  };

  return {
    abilityChance: getFromRange(ranges.ability),
    coinPrice: Math.round(coinPrice * growthFactor),
    damage: getFromRange(ranges.damage),
    gearClass,
    gems: [],
    grip: "one-handed",
    id: nanoid(),
    isEquipped: false,
    level,
    modality,
    name: LOCRA.generateArtifact({
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
    ranges,
    rate: getFromRange(ranges.rate),
    scrapPrice: Math.round(scrapPrice * growthFactor),
    staminaCost: Math.ceil(staminaCost * growthFactor),
    weight: Math.ceil(weight * growthFactor),
  };
}

export function generateWilderness({ allowNSFW, stage }: { allowNSFW: boolean; stage: number }) {
  const { prefix, suffix } = LOCATION_AFFIX_BASE;
  const growthFactor = getGrowthSigmoid(stage);

  return LOCRA.generateLocation({
    allowNSFW,
    hasPrefix: Math.random() <= prefix.minimum + prefix.attenuation * growthFactor,
    hasSuffix: Math.random() <= suffix.minimum + suffix.attenuation * growthFactor,
  });
}
