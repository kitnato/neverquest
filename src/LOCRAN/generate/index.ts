import { AFFIXES } from "@neverquest/LOCRAN/data/affixes";
import type { Category, GeneratorParameters } from "@neverquest/LOCRAN/types";
import { capitalizeAll } from "@neverquest/utilities/formatters";

export function generate({
  category,
  name,
  parameters,
}: {
  category: Category;
  name: string;
  parameters: GeneratorParameters;
}) {
  const finalName = [capitalizeAll(name)];
  const { allowNSFW, hasPrefix, hasSuffix, prefixTags, suffixTags } = parameters;

  if (hasPrefix) {
    const filteredPrefixes = AFFIXES.filter((current) => {
      const filterNSFW = allowNSFW ? Boolean(current.isNSFW) || !current.isNSFW : !current.isNSFW;

      // Discard prefix if it's the same as the main name (e.g. "Fungus Fungus").
      if (current.name === name) {
        return false;
      }

      // If we want a tagged prefix, check if the current affix has all of them (with NSFW filter), otherwise discard it.
      if (prefixTags.length > 0) {
        if (current.tags === undefined) {
          return false;
        }

        return (
          current[category] === "prefix" &&
          prefixTags.every((tag) => current.tags?.includes(tag)) &&
          filterNSFW
        );
      }

      // Otherwise, return any prefix (with NSFW filter).
      return current[category] === "prefix" && filterNSFW;
    });

    const prefix = filteredPrefixes[Math.floor(Math.random() * filteredPrefixes.length)];

    if (prefix === undefined) {
      throw Error("Invalid prefix.");
    }

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

    if (suffix === undefined) {
      throw Error("Invalid suffix.");
    }

    finalName.push("of", capitalizeAll(suffix.name));
  }

  return finalName.join(" ");
}
