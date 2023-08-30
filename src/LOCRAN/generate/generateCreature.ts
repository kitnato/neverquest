import { CREATURES } from "@neverquest/LOCRAN/data/creatures";
import { generate } from "@neverquest/LOCRAN/generate";
import type { AffixTag, Creature } from "@neverquest/LOCRAN/types";

export function generateCreature({
  allowNSFW = false,
  hasPrefix = false,
  hasSuffix = false,
  tags = [],
  type,
}: {
  allowNSFW?: boolean;
  hasPrefix?: boolean;
  hasSuffix?: boolean;
  tags?: AffixTag[];
  type: Creature[];
}) {
  const filteredCreatures = CREATURES.filter((current) => {
    const isNSFW = Boolean(current.isNSFW);

    return type.includes(current.type) && (allowNSFW ? isNSFW || !isNSFW : !isNSFW);
  });

  const filteredCreature = filteredCreatures[Math.floor(Math.random() * filteredCreatures.length)];

  if (filteredCreature === undefined) {
    throw Error("Invalid creature.");
  }

  return generate({
    category: "creature",
    name: filteredCreature.name,
    parameters: {
      allowNSFW,
      hasPrefix,
      hasSuffix,
      prefixTags: tags,
      suffixTags: tags,
    },
  });
}
