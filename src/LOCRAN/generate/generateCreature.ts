import { CREATURES } from "@neverquest/LOCRAN/data/creatures";
import { generate } from "@neverquest/LOCRAN/generate";
import type { GeneratorParameters } from "@neverquest/LOCRAN/types";

export function generateCreature({
  allowProfanity,
  nameStructure,
  prefixTags,
  suffixTags,
}: GeneratorParameters) {
  const filteredCreatures = CREATURES.filter(({ isProfanity }) =>
    allowProfanity ? isProfanity === true || !isProfanity : !isProfanity,
  );

  const filteredCreature = filteredCreatures[Math.floor(Math.random() * filteredCreatures.length)];

  if (filteredCreature === undefined) {
    throw new Error("Invalid creature.");
  }

  return generate({
    allowProfanity,
    category: "creature",
    name: filteredCreature.name,
    nameStructure,
    prefixTags,
    suffixTags,
  });
}
