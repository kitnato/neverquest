import { plural } from "pluralize";
import { PLURALIZE_CHANCE } from "@neverquest/LOCRAN/constants";
import { ARTIFACTS } from "@neverquest/LOCRAN/data/artifacts";
import { generate } from "@neverquest/LOCRAN/generate";
import type { ArtifactQuery, GeneratorParameters } from "@neverquest/LOCRAN/types";

export function generateArtifact({
  allowProfanity,
  nameStructure,
  prefixTags,
  query,
  suffixTags,
}: GeneratorParameters & {
  query: ArtifactQuery;
}) {
  const filteredArtifacts = ARTIFACTS.filter((current) => {
    const isProfanity = Boolean(current.isProfanity);

    return (
      current.type === query.type &&
      ("subtype" in query
        ? "subtype" in current
          ? current.subtype === query.subtype
          : false
        : true) &&
      ("artifactClass" in query
        ? "artifactClass" in current
          ? current.artifactClass === query.artifactClass
          : false
        : true) &&
      (allowProfanity ? isProfanity || !isProfanity : !isProfanity)
    );
  });
  const filteredArtifact = filteredArtifacts[Math.floor(Math.random() * filteredArtifacts.length)];

  if (filteredArtifact === undefined) {
    throw new Error("Invalid artifact.");
  }

  const { canPluralize, name } = filteredArtifact;

  const artifact = generate({
    allowProfanity,
    category: "artifact",
    name,
    nameStructure,
    prefixTags,
    suffixTags,
  });

  if (canPluralize && Math.random() <= PLURALIZE_CHANCE) {
    return plural(artifact);
  }

  return artifact;
}
