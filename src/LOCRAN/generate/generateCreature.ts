import { CREATURES } from "@neverquest/LOCRAN/data/creatures";
import { generate } from "@neverquest/LOCRAN/generate";
import type { GeneratorParameters } from "@neverquest/LOCRAN/types";

export function generateCreature({
  allowNSFW,
  nameStructure,
  prefixTags,
  suffixTags,
}: GeneratorParameters) {
  const filteredCreatures = CREATURES.filter(({ isNSFW }) =>
    allowNSFW ? isNSFW || !isNSFW : !isNSFW,
  );

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
