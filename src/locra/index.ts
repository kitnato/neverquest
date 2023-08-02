import { AFFIXES } from "@neverquest/LOCRA/data/affixes";
import { ARTIFACTS } from "@neverquest/LOCRA/data/artifacts";
import { CREATURES } from "@neverquest/LOCRA/data/creatures";
import { LOCATIONS } from "@neverquest/LOCRA/data/locations";
import type {
  AffixTag,
  ArtifactQuery,
  Category,
  Creature,
  GeneratorParameters,
} from "@neverquest/LOCRA/types";
import { capitalizeAll } from "@neverquest/utilities/formatters";

export const LOCRA = {
  generate: ({
    category,
    name,
    parameters,
  }: {
    category: Category;
    name: string;
    parameters: GeneratorParameters;
  }) => {
    const finalName = [capitalizeAll(name)];
    const { allowNSFW, hasPrefix, hasSuffix, prefixTags, suffixTags } = parameters;

    if (hasPrefix) {
      const filteredPrefixes = AFFIXES.filter((affix) => {
        const filterNSFW = allowNSFW ? Boolean(affix.isNSFW) || !affix.isNSFW : !affix.isNSFW;

        // Discard prefix if it's the same as the main name (e.g. "Fungus Fungus").
        if (affix.name === name) {
          return false;
        }

        // If we want a tagged prefix, check if the current affix has all of them (with NSFW filter), otherwise discard it.
        if (prefixTags.length > 0) {
          if (affix.tags === undefined) {
            return false;
          }

          return (
            affix[category] === "prefix" &&
            prefixTags.every((tag) => affix.tags?.includes(tag)) &&
            filterNSFW
          );
        }

        // Otherwise, return any prefix (with NSFW filter).
        return affix[category] === "prefix" && filterNSFW;
      });

      const prefix = filteredPrefixes[Math.floor(Math.random() * filteredPrefixes.length)];

      finalName.unshift(capitalizeAll(prefix.name));
    }

    if (hasSuffix) {
      const filteredSuffixes = AFFIXES.filter((affix) => {
        const filterNSFW = allowNSFW ? Boolean(affix.isNSFW) || !affix.isNSFW : !affix.isNSFW;

        // If we want a tagged suffix, check if the current affix has all of them (with NSFW filter).
        if (suffixTags.length > 0) {
          if (affix.tags !== undefined) {
            return (
              affix[category] === "suffix" &&
              suffixTags.every((tag) => affix.tags?.includes(tag)) &&
              filterNSFW
            );
          }
        }

        // Otherwise, return any suffix (with NSFW filter).
        return affix[category] === "suffix" && filterNSFW;
      });

      const suffix = filteredSuffixes[Math.floor(Math.random() * filteredSuffixes.length)];

      finalName.push("of", capitalizeAll(suffix.name));
    }

    return finalName.join(" ");
  },

  generateArtifact: ({
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
  }) => {
    const filteredArtifacts = ARTIFACTS.filter((artifact) => {
      const isNSFW = Boolean(artifact.isNSFW);

      return (
        artifact.type === query.type &&
        ("subtype" in query
          ? "subtype" in artifact
            ? artifact.subtype === query.subtype
            : false
          : true) &&
        ("artifactClass" in query
          ? "artifactClass" in artifact
            ? artifact.artifactClass === query.artifactClass
            : false
          : true) &&
        (allowNSFW ? isNSFW || !isNSFW : !isNSFW)
      );
    });
    const { name } = filteredArtifacts[Math.floor(Math.random() * filteredArtifacts.length)];

    return LOCRA.generate({
      category: "artifact",
      name,
      parameters: {
        allowNSFW,
        hasPrefix,
        hasSuffix,
        prefixTags: tags,
        suffixTags: tags,
      },
    });
  },

  generateCreature: ({
    allowNSFW = false,
    hasPrefix = false,
    hasSuffix = false,
    tags = [],
    type = ["human", "monster", "name"],
  }: {
    allowNSFW?: boolean;
    hasPrefix?: boolean;
    hasSuffix?: boolean;
    tags?: AffixTag[];
    type?: Creature[];
  }) => {
    const filteredCreatures = CREATURES.filter((creature) => {
      const isNSFW = Boolean(creature.isNSFW);

      return type.includes(creature.type) && (allowNSFW ? isNSFW || !isNSFW : !isNSFW);
    });
    const { name } = filteredCreatures[Math.floor(Math.random() * filteredCreatures.length)];

    return LOCRA.generate({
      category: "creature",
      name,
      parameters: {
        allowNSFW,
        hasPrefix,
        hasSuffix,
        prefixTags: tags,
        suffixTags: tags,
      },
    });
  },

  generateLocation: ({
    allowNSFW = false,
    hasPrefix = false,
    hasSuffix = false,
    tags = [],
  }: {
    allowNSFW?: boolean;
    hasPrefix?: boolean;
    hasSuffix?: boolean;
    tags?: AffixTag[];
  }) => {
    const filteredLocations = LOCATIONS.filter((location) => {
      const isNSFW = Boolean(location.isNSFW);

      return allowNSFW ? isNSFW || !isNSFW : !isNSFW;
    });
    const { name } = filteredLocations[Math.floor(Math.random() * filteredLocations.length)];

    return LOCRA.generate({
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
  },
};
