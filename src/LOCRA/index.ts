import affixes from "@neverquest/LOCRA/data/affixes.json";
import artifacts from "@neverquest/LOCRA/data/artifacts.json";
import creatures from "@neverquest/LOCRA/data/creatures.json";
import locations from "@neverquest/LOCRA/data/locations.json";
import {
  AffixTag,
  AffixType,
  ArmorQuery,
  Category,
  CreatureType,
  GeneratorParameters,
  ShieldQuery,
  WeaponQuery,
} from "@neverquest/LOCRA/types";
import { capitalizeAll } from "@neverquest/utilities/formatters";

export class LOCRA {
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
        // Discard prefix if it's the same as the main name (e.g. "Fungus Fungus").
        if (affix.name === name) {
          return false;
        }

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

        // Otherwise, return any prefix (with NSFW filter).
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

        // Otherwise, return any suffix (with NSFW filter).
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
    hasPrefix = false,
    hasSuffix = false,
    isNSFW = false,
    tags = [],
    query,
  }: {
    hasPrefix?: boolean;
    hasSuffix?: boolean;
    isNSFW?: boolean;
    query: ArmorQuery | ShieldQuery | WeaponQuery;
    tags?: AffixTag[];
  }) {
    const { subtype, type, weaponClass } = query as WeaponQuery;
    const filteredArtifacts = artifacts.filter(
      (artifact) =>
        (subtype ? artifact.subtype === subtype : true) &&
        (artifact.class && weaponClass ? artifact.class === weaponClass : true) &&
        artifact.type === type &&
        (isNSFW
          ? !!artifact.isNSFW === true || !!artifact.isNSFW === false
          : !!artifact.isNSFW === false)
    );
    const { name } = filteredArtifacts[Math.floor(Math.random() * filteredArtifacts.length)];

    return this.generate({
      category: Category.Artifact,
      name,
      parameters: {
        hasPrefix,
        hasSuffix,
        isNSFW,
        prefixTags: tags,
        suffixTags: tags,
      },
    });
  }

  static generateCreature({
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
      parameters: {
        hasPrefix,
        hasSuffix,
        isNSFW,
        prefixTags: tags,
        suffixTags: tags,
      },
    });
  }

  static generateLocation({
    hasPrefix = false,
    hasSuffix = false,
    isNSFW = false,
    tags = [],
  }: {
    hasPrefix?: boolean;
    hasSuffix?: boolean;
    isNSFW?: boolean;
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
      parameters: {
        hasPrefix,
        hasSuffix,
        isNSFW,
        prefixTags: tags,
        suffixTags: tags,
      },
    });
  }
}
