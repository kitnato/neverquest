import { plural } from "pluralize";

import { PLURALIZE_CHANCE } from "@neverquest/LOCRAN/constants";
import { LOCATIONS } from "@neverquest/LOCRAN/data/locations";
import { generate } from "@neverquest/LOCRAN/generate";
import type { GeneratorParameters } from "@neverquest/LOCRAN/types";

export function generateLocation({
  allowNSFW,
  nameStructure,
  prefixTags,
  suffixTags,
}: GeneratorParameters) {
  const filteredLocations = LOCATIONS.filter((current) => {
    const isNSFW = Boolean(current.isNSFW);

    return allowNSFW ? isNSFW || !isNSFW : !isNSFW;
  });
  const filteredLocation = filteredLocations[Math.floor(Math.random() * filteredLocations.length)];

  if (filteredLocation === undefined) {
    throw Error("Invalid location.");
  }

  const { canPluralize, name } = filteredLocation;
  const isPluralized = Math.random() <= PLURALIZE_CHANCE;
  const location = generate({
    allowNSFW,
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
