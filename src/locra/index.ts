import affixes from "@neverquest/locra/db-affixes.json";
import artifacts from "@neverquest/locra/db-artifacts.json";
import creatures from "@neverquest/locra/db-creatures.json";
import locations from "@neverquest/locra/db-locations.json";
import {
  AffixTag,
  AffixType,
  ArtifactQuery,
  Category,
  CreatureType,
  GeneratorParameters,
} from "@neverquest/locra/types";
import { capitalizeAll } from "@neverquest/utilities/helpers";

export default class LOCRA {
  static generate({
    category,
    name,
    parameters,
  }: {
    category: Category;
    name: string;
    parameters: GeneratorParameters;
  }) {
    const finalName = [capitalizeAll(name)];
    const { hasPrefix, hasSuffix, isNSFW, prefixTags, suffixTags } = parameters;

    if (hasPrefix) {
      const filteredPrefixes = affixes.filter((affix) => {
        // If we want a tagged prefix, check if the current affix has all of them, otherwise discard it.
        if (prefixTags.length > 0) {
          if (affix.tags) {
            return (
              affix[category] === AffixType.Prefix &&
              prefixTags.every((tag) => affix.tags.includes(tag)) &&
              (isNSFW
                ? !!affix.isNSFW === true || !!affix.isNSFW === false
                : !!affix.isNSFW === false)
            );
          }
          return false;
        }

        // Return any prefix (with NSFW filter).
        return (
          affix[category] === AffixType.Prefix &&
          (isNSFW ? !!affix.isNSFW === true || !!affix.isNSFW === false : !!affix.isNSFW === false)
        );
      });
      const prefix = filteredPrefixes[Math.floor(Math.random() * filteredPrefixes.length)];

      finalName.unshift(capitalizeAll(prefix.name));
    }

    if (hasSuffix) {
      const filteredSuffixes = affixes.filter((affix) => {
        // If we want a tagged suffix, check if the current affix has all of them, otherwise discard it.
        if (suffixTags.length > 0) {
          if (affix.tags) {
            return (
              affix[category] === AffixType.Suffix &&
              suffixTags.every((tag) => affix.tags.includes(tag)) &&
              (isNSFW
                ? !!affix.isNSFW === true || !!affix.isNSFW === false
                : !!affix.isNSFW === false)
            );
          }
          return false;
        }

        // Return any prefix (with NSFW filter).
        return (
          affix[category] === AffixType.Suffix &&
          (isNSFW ? !!affix.isNSFW === true || !!affix.isNSFW === false : !!affix.isNSFW === false)
        );
      });
      const suffix = filteredSuffixes[Math.floor(Math.random() * filteredSuffixes.length)];

      finalName.push("of", capitalizeAll(suffix.name));
    }

    return finalName.join(" ");
  }

  static generateArtifact({
    isNSFW = false,
    hasPrefix = false,
    hasSuffix = false,
    tags = [],
    query,
  }: {
    isNSFW?: boolean;
    hasPrefix?: boolean;
    hasSuffix?: boolean;
    tags?: AffixTag[];
    query: ArtifactQuery;
  }) {
    const { subtype, type } = query;
    const filteredArtifacts = artifacts.filter(
      (artifact) =>
        (subtype ? artifact.subtype === subtype : true) &&
        artifact.type === type &&
        (isNSFW
          ? !!artifact.isNSFW === true || !!artifact.isNSFW === false
          : !!artifact.isNSFW === false)
    );
    const { name } = filteredArtifacts[Math.floor(Math.random() * filteredArtifacts.length)];

    return this.generate({
      category: Category.Artifact,
      name,
      parameters: { isNSFW, hasPrefix, hasSuffix, prefixTags: tags, suffixTags: tags },
    });
  }

  static generateCreature({
    isNSFW = false,
    hasPrefix = false,
    hasSuffix = false,
    tags = [],
    type,
  }: {
    isNSFW?: boolean;
    hasPrefix?: boolean;
    hasSuffix?: boolean;
    tags?: AffixTag[];
    type: CreatureType;
  }) {
    const filteredCreatures = creatures.filter(
      (creature) =>
        creature.type === type &&
        (isNSFW
          ? !!creature.isNSFW === true || !!creature.isNSFW === false
          : !!creature.isNSFW === false)
    );
    const { name } = filteredCreatures[Math.floor(Math.random() * filteredCreatures.length)];

    return this.generate({
      category: Category.Creature,
      name,
      parameters: { isNSFW, hasPrefix, hasSuffix, prefixTags: tags, suffixTags: tags },
    });
  }

  static generateLocation({
    isNSFW = false,
    hasPrefix = false,
    hasSuffix = false,
    tags = [],
  }: {
    isNSFW?: boolean;
    hasPrefix?: boolean;
    hasSuffix?: boolean;
    tags?: AffixTag[];
  }) {
    const filteredLocations = locations.filter((location) =>
      isNSFW
        ? !!location.isNSFW === true || !!location.isNSFW === false
        : !!location.isNSFW === false
    );
    const { name } = filteredLocations[Math.floor(Math.random() * filteredLocations.length)];

    return this.generate({
      category: Category.Location,
      name,
      parameters: { isNSFW, hasPrefix, hasSuffix, prefixTags: tags, suffixTags: tags },
    });
  }
}
