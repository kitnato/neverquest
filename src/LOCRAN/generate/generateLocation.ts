import { plural } from "pluralize";

import { PLURALIZE_CHANCE } from "@neverquest/LOCRAN/constants";
import { LOCATIONS } from "@neverquest/LOCRAN/data/locations";
import { generate } from "@neverquest/LOCRAN/generate";
import type { GeneratorParameters } from "@neverquest/LOCRAN/types";

export function generateLocation({
  allowProfanity,
  nameStructure,
  prefixTags,
  suffixTags,
}: GeneratorParameters) {
  const filteredLocations = LOCATIONS.filter((location) => {
    const isProfanity = Boolean(location.isProfanity);

    return allowProfanity ? isProfanity || !isProfanity : !isProfanity;
  });
  const filteredLocation = filteredLocations[Math.floor(Math.random() * filteredLocations.length)];

  if (filteredLocation === undefined) {
    throw new Error("Invalid location.");
  }

  const { canPluralize, name } = filteredLocation;
  const isPluralized = Math.random() <= PLURALIZE_CHANCE;
  const location = generate({
    allowProfanity,
    category: "location",
    name,
    nameStructure,
    prefixTags,
    suffixTags,
  });

  if (canPluralize && isPluralized) {
    return plural(location);
  }

  return location;
}
