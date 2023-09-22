import { ARTIFACTS } from "@neverquest/LOCRAN/data/artifacts";
import { generate } from "@neverquest/LOCRAN/generate";
import type { AffixTag, ArtifactQuery } from "@neverquest/LOCRAN/types";

export function generateArtifact({
  allowNSFW = false,
  hasPrefix = false,
  hasSuffix = false,
  query,
  tags = [],
}: {
  allowNSFW?: boolean;
  hasPrefix?: boolean;
  hasSuffix?: boolean;
  query: ArtifactQuery;
  tags?: AffixTag[];
}) {
  const filteredArtifacts = ARTIFACTS.filter((current) => {
    const isNSFW = Boolean(current.isNSFW);

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
      (allowNSFW ? isNSFW || !isNSFW : !isNSFW)
    );
  });
  const filteredArtifact = filteredArtifacts[Math.floor(Math.random() * filteredArtifacts.length)];

  if (filteredArtifact === undefined) {
    throw Error("Invalid artifact.");
  }

  return generate({
    category: "artifact",
    name: filteredArtifact.name,
    parameters: {
      allowNSFW,
      hasPrefix,
      hasSuffix,
      prefixTags: tags,
      suffixTags: tags,
    },
  });
}