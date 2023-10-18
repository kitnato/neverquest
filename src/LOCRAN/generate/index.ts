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
    const filteredPrefixes = AFFIXES.filter((currentAffix) => {
      const filterNSFW = allowNSFW
        ? Boolean(currentAffix.isNSFW) || !currentAffix.isNSFW
        : !currentAffix.isNSFW;

      // Discard prefix if it's the same as the main name (e.g. "Fungus Fungus").
      if (currentAffix.name === name) {
        return false;
      }

      // If we want a tagged prefix, check if the current affix has all of them (with NSFW filter), otherwise discard it.
      if (prefixTags.length > 0) {
        if (currentAffix.tags === undefined) {
          return false;
        }

        return (
          currentAffix[category] === "prefix" &&
          prefixTags.every((currentPrefixTag) => currentAffix.tags?.includes(currentPrefixTag)) &&
          filterNSFW
        );
      }

      // Otherwise, return any prefix (with NSFW filter).
      return currentAffix[category] === "prefix" && filterNSFW;
    });

    const prefix = filteredPrefixes[Math.floor(Math.random() * filteredPrefixes.length)];

    if (prefix === undefined) {
      throw Error("Invalid prefix.");
    }

    finalName.unshift(capitalizeAll(prefix.name));
  }

  if (nameStructure === "suffix" || nameStructure === "prefixAndSuffix") {
    const filteredSuffixes = AFFIXES.filter((currentAffix) => {
      const filterNSFW = allowNSFW
        ? Boolean(currentAffix.isNSFW) || !currentAffix.isNSFW
        : !currentAffix.isNSFW;

      // If we want a tagged suffix, check if the current affix has all of them (with NSFW filter).
      if (suffixTags.length > 0) {
        if (currentAffix.tags !== undefined) {
          return (
            currentAffix[category] === "suffix" &&
            suffixTags.every((currentSuffix) => currentAffix.tags?.includes(currentSuffix)) &&
            filterNSFW
          );
        }
      }

      // Otherwise, return any suffix (with NSFW filter).
      return currentAffix[category] === "suffix" && filterNSFW;
    });

    const suffix = filteredSuffixes[Math.floor(Math.random() * filteredSuffixes.length)];

    if (suffix === undefined) {
      throw Error("Invalid suffix.");
    }

    finalName.push("of", capitalizeAll(suffix.name));
  }

  return finalName.join(" ");
}
