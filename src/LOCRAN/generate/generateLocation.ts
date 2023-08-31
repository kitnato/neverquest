import { plural } from "pluralize";

import { LOCATIONS } from "@neverquest/LOCRAN/data/locations";
import { generate } from "@neverquest/LOCRAN/generate";
import type { AffixTag } from "@neverquest/LOCRAN/types";

export function generateLocation({
  allowNSFW = false,
  hasPrefix = false,
  hasSuffix = false,
  tags = [],
}: {
  allowNSFW?: boolean;
  hasPrefix?: boolean;
  hasSuffix?: boolean;
  tags?: AffixTag[];
}) {
  const filteredLocations = LOCATIONS.filter((current) => {
    const isNSFW = Boolean(current.isNSFW);

    return allowNSFW ? isNSFW || !isNSFW : !isNSFW;
  });
  const filteredLocation = filteredLocations[Math.floor(Math.random() * filteredLocations.length)];

  if (filteredLocation === undefined) {
    throw Error("Invalid location.");
  }

  const { canPluralize, name } = filteredLocation;
  const isPluralized = Math.random() <= 0.5;
  const location = generate({
    category: "location",
    name,
    parameters: {
      allowNSFW,
      hasPrefix,
      hasSuffix,
      prefixTags: tags,
      suffixTags: tags,
    },
  });

  if (canPluralize && isPluralized) {
    return plural(location);
  }

  return location;
}
