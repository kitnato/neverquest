import { CREATURES } from "@neverquest/LOCRAN/data/creatures";
import { generate } from "@neverquest/LOCRAN/generate";
import type { Creature, GeneratorParameters } from "@neverquest/LOCRAN/types";

export function generateCreature({
  allowNSFW,
  nameStructure,
  prefixTags,
  suffixTags,
  type,
}: GeneratorParameters & {
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
    allowNSFW,
    category: "creature",
    name: filteredCreature.name,
    nameStructure,
    prefixTags,
    suffixTags,
  });
}
