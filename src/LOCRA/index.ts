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
    const { hasPrefix, hasSuffix, isNSFW, prefixTags, suffixTags } = parameters;

    if (hasPrefix) {
      const filteredPrefixes = AFFIXES.filter((affix) => {
        // Discard prefix if it's the same as the main name (e.g. "Fungus Fungus").
        if (affix.name === name) {
          return false;
        }

        // If we want a tagged prefix, check if the current affix has all of them, otherwise discard it.
        if (prefixTags.length > 0) {
          if (affix.tags) {
            return (
              affix[category] === "prefix" &&
              prefixTags.every((tag) => affix.tags?.includes(tag)) &&
              (isNSFW ? !!affix.isNSFW || !affix.isNSFW : !affix.isNSFW)
            );
          }
          return false;
        }

        // Otherwise, return any prefix (with NSFW filter).
        return (
          affix[category] === "prefix" && (isNSFW ? !!affix.isNSFW || !affix.isNSFW : !affix.isNSFW)
        );
      });

      const prefix = filteredPrefixes[Math.round(Math.random() * filteredPrefixes.length)];

      finalName.unshift(capitalizeAll(prefix.name));
    }

    if (hasSuffix) {
      const filteredSuffixes = AFFIXES.filter((affix) => {
        // If we want a tagged suffix, check if the current affix has all of them.
        if (suffixTags.length > 0) {
          if (affix.tags) {
            return (
              affix[category] === "suffix" &&
              suffixTags.every((tag) => affix.tags?.includes(tag)) &&
              (isNSFW ? !!affix.isNSFW || !affix.isNSFW : !affix.isNSFW)
            );
          }
        }

        // Otherwise, return any suffix (with NSFW filter).
        return (
          affix[category] === "suffix" && (isNSFW ? !!affix.isNSFW || !affix.isNSFW : !affix.isNSFW)
        );
      });

      const suffix = filteredSuffixes[Math.round(Math.random() * filteredSuffixes.length)];

      finalName.push("of", capitalizeAll(suffix.name));
    }

    return finalName.join(" ");
  },

  generateArtifact: ({
    hasPrefix = false,
    hasSuffix = false,
    isNSFW = false,
    query,
    tags = [],
  }: {
    hasPrefix?: boolean;
    hasSuffix?: boolean;
    isNSFW?: boolean;
    query: ArtifactQuery;
    tags?: AffixTag[];
  }) => {
    const filteredArtifacts = ARTIFACTS.filter(
      (artifact) =>
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
        (isNSFW ? !!artifact.isNSFW || !artifact.isNSFW : !artifact.isNSFW)
    );
    const { name } = filteredArtifacts[Math.floor(Math.random() * filteredArtifacts.length)];

    return LOCRA.generate({
      category: "artifact",
      name,
      parameters: {
        hasPrefix,
        hasSuffix,
        isNSFW,
        prefixTags: tags,
        suffixTags: tags,
      },
    });
  },

  generateCreature: ({
    hasPrefix = false,
    hasSuffix = false,
    isNSFW = false,
    tags = [],
    type,
  }: {
    hasPrefix?: boolean;
    hasSuffix?: boolean;
    isNSFW?: boolean;
    tags?: AffixTag[];
    type: Creature;
  }) => {
    const filteredCreatures = CREATURES.filter(
      (creature) =>
        creature.type === type &&
        (isNSFW ? !!creature.isNSFW || !creature.isNSFW : !creature.isNSFW)
    );
    const { name } = filteredCreatures[Math.floor(Math.random() * filteredCreatures.length)];

    return LOCRA.generate({
      category: "creature",
      name,
      parameters: {
        hasPrefix,
        hasSuffix,
        isNSFW,
        prefixTags: tags,
        suffixTags: tags,
      },
    });
  },

  generateLocation: ({
    hasPrefix = false,
    hasSuffix = false,
    isNSFW = false,
    tags = [],
  }: {
    hasPrefix?: boolean;
    hasSuffix?: boolean;
    isNSFW?: boolean;
    tags?: AffixTag[];
  }) => {
    const filteredLocations = LOCATIONS.filter((location) =>
      isNSFW ? !!location.isNSFW || !location.isNSFW : !location.isNSFW
    );
    const { name } = filteredLocations[Math.floor(Math.random() * filteredLocations.length)];

    return LOCRA.generate({
      category: "location",
      name,
      parameters: {
        hasPrefix,
        hasSuffix,
        isNSFW,
        prefixTags: tags,
        suffixTags: tags,
      },
    });
  },
};
