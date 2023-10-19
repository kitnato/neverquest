import { AFFIXES } from "@neverquest/LOCRAN/data/affixes";
import type { Category, GeneratorParameters } from "@neverquest/LOCRAN/types";
import { capitalizeAll } from "@neverquest/utilities/formatters";

export const PLURALIZE_CHANCE = 0.5;

export function generate({
  allowNSFW = false,
  category,
  name,
  nameStructure = "none",
  prefixTags = [],
  suffixTags = [],
}: GeneratorParameters & {
  category: Category;
  name: string;
}) {
  const finalName = [capitalizeAll(name)];

  if (nameStructure === "prefix" || nameStructure === "prefixAndSuffix") {
    const filteredPrefixes = AFFIXES.filter(({ isNSFW, name: affixName, tags, ...categories }) => {
      // Discard prefix if it's the same as the main name (e.g. "Fungus Fungus").
      if (affixName === name) {
        return false;
      }

      // Filter out only prefixes with NSFW filter.
      const filteredPrefix =
        (allowNSFW ? Boolean(isNSFW) || !isNSFW : !isNSFW) &&
        categories[category]?.includes("prefix");

      // If we want a tagged prefix, check if the current affix has all of them, otherwise discard it.
      if (prefixTags.length > 0 && tags !== undefined) {
        return filteredPrefix && prefixTags.every((current) => tags?.includes(current));
      }

      // Otherwise, return any prefix.
      return filteredPrefix;
    });

    const prefix = filteredPrefixes[Math.floor(Math.random() * filteredPrefixes.length)];

    if (prefix === undefined) {
      throw Error("Invalid prefix.");
    }

    finalName.unshift(capitalizeAll(prefix.name));
  }

  if (nameStructure === "suffix" || nameStructure === "prefixAndSuffix") {
    const filteredSuffixes = AFFIXES.filter(({ isNSFW, name: affixName, tags, ...categories }) => {
      if (affixName === name) {
        return false;
      }

      // Filter out only suffixes with NSFW filter.
      const filteredSuffix =
        (allowNSFW ? Boolean(isNSFW) || !isNSFW : !isNSFW) &&
        (categories[category]?.includes("articledSuffix") ||
          categories[category]?.includes("suffix"));

      // If suffix is tagged, check if the current affix has all of them (with NSFW filter).
      if (suffixTags.length > 0 && tags !== undefined) {
        return filteredSuffix && suffixTags.every((current) => tags?.includes(current));
      }

      // Otherwise, return any suffix.
      return filteredSuffix;
    });

    const suffix = filteredSuffixes[Math.floor(Math.random() * filteredSuffixes.length)];

    if (suffix === undefined) {
      throw Error("Invalid suffix.");
    }

    finalName.push(
      "of",
      `${
        suffix[category]?.includes("articledSuffix")
          ? suffix[category]?.includes("suffix") && Math.random() < 0.5
            ? ""
            : "the "
          : ""
      }${capitalizeAll(suffix.name)}`,
    );
  }

  return finalName.join(" ");
}
