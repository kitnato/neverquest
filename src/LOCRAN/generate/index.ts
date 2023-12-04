import pluralize from "pluralize";

import {
  APOSTROPHE_CHANCE,
  ARTICLE_CHANCE,
  CREATURE_NAME_AFFIX_CHANCE,
  PLURALIZE_CHANCE,
} from "@neverquest/LOCRAN/constants";
import { AFFIXES } from "@neverquest/LOCRAN/data/affixes";
import { CREATURES } from "@neverquest/LOCRAN/data/creatures";
import type { Category, GeneratorParameters } from "@neverquest/LOCRAN/types";
import { capitalizeAll } from "@neverquest/utilities/formatters";

export function generate({
  allowProfanity = false,
  category,
  name,
  nameStructure = "none",
  prefixTags = [],
  suffixTags = [],
}: GeneratorParameters & {
  category: Category;
  name: string;
}) {
  const canHaveCreatureAffix =
    prefixTags.length === 0 &&
    suffixTags.length === 0 &&
    ["artifact", "location"].includes(category) &&
    Math.random() <= CREATURE_NAME_AFFIX_CHANCE;
  const filteredCreatureNamePrefixes: string[] = [];

  let prefix = "";
  let suffix = "";

  if (nameStructure === "prefix" || nameStructure === "prefixAndSuffix") {
    const filteredPrefixes = AFFIXES.filter(
      ({ isProfanity, name: affixName, tags, ...categories }) => {
        // Discard prefix if it's the same as the main name (e.g. "Fungus Fungus").
        if (affixName === name) {
          return false;
        }

        // Filter out only prefixes with Profanity filter.
        const isValidPrefix =
          (allowProfanity ? Boolean(isProfanity) || !isProfanity : !isProfanity) &&
          categories[category]?.includes("prefix");

        // If we want a tagged prefix, check if the current affix has all of them, otherwise discard it.
        if (prefixTags.length > 0) {
          return isValidPrefix && prefixTags.every((prefixTag) => tags?.includes(prefixTag));
        }

        // Otherwise, return any prefix.
        return isValidPrefix;
      },
    ).map(({ name }) => name);

    // Artifacts and locations can also have a creature name prefix.
    if (canHaveCreatureAffix) {
      filteredCreatureNamePrefixes.push(
        ...CREATURES.filter(({ isProfanity }) =>
          allowProfanity ? Boolean(isProfanity) || !isProfanity : !isProfanity,
        ).map(({ name }) => `${name}${Math.random() <= APOSTROPHE_CHANCE ? "'s" : ""}`),
      );
    }

    const prefixes = [...filteredPrefixes, ...filteredCreatureNamePrefixes];

    prefix = capitalizeAll(prefixes[Math.floor(Math.random() * prefixes.length)] ?? "");
  }

  if (nameStructure === "suffix" || nameStructure === "prefixAndSuffix") {
    const filteredSuffixes = AFFIXES.filter(
      ({ isProfanity, name: affixName, tags, ...categories }) => {
        if (affixName === name) {
          return false;
        }

        // Filter out only suffixes with Profanity filter.
        const isValidSuffix =
          (allowProfanity ? Boolean(isProfanity) || !isProfanity : !isProfanity) &&
          Boolean(
            categories[category]?.includes("articledSuffix") ??
              categories[category]?.includes("suffix"),
          );

        // If suffix is tagged, check if the current affix has all of them (with Profanity filter).
        if (suffixTags.length > 0) {
          return isValidSuffix && suffixTags.every((suffixTag) => tags?.includes(suffixTag));
        }

        // Otherwise, return any valid suffix.
        return isValidSuffix;
      },
    );

    const filteredCreatureNameSuffixes = [];

    // Artifacts and locations can also have a creature name suffix, but only if the prefix isn't already one.
    if (canHaveCreatureAffix && !filteredCreatureNamePrefixes.includes(prefix)) {
      filteredCreatureNameSuffixes.push(
        ...CREATURES.filter(({ isProfanity }) =>
          allowProfanity ? Boolean(isProfanity) || !isProfanity : !isProfanity,
        ).map(({ name }) => name),
      );
    }

    const suffixes = [...filteredSuffixes, ...filteredCreatureNameSuffixes];
    const suffixChoice = suffixes[Math.floor(Math.random() * suffixes.length)];

    let formattedSuffix = "";

    if (suffixChoice !== undefined) {
      // If the chosen suffix is a creature name is can be plural alongside a potential article.
      if (typeof suffixChoice === "string") {
        formattedSuffix =
          Math.random() <= PLURALIZE_CHANCE
            ? `${Math.random() <= ARTICLE_CHANCE ? "the " : ""}${capitalizeAll(
                pluralize(suffixChoice),
              )}`
            : `the ${capitalizeAll(suffixChoice)}`;
      } else {
        formattedSuffix = `${
          suffixChoice[category]?.includes("articledSuffix") ? "the " : ""
        }${capitalizeAll(suffixChoice.name)}`;
      }
    }

    if (formattedSuffix !== "") {
      suffix = `of ${formattedSuffix}`;
    }
  }

  return `${prefix === "" ? "" : `${prefix} `}${capitalizeAll(name)}${
    suffix === "" ? "" : ` ${suffix}`
  }`;
}
