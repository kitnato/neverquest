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
  const canIncludeCreatureName =
    ["artifact", "location"].includes(category) && Math.random() <= CREATURE_NAME_AFFIX_CHANCE;
  const filteredCreatureNamePrefixes: string[] = [];

  let prefix = "";
  let suffix = "";

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
      if (prefixTags.length > 0) {
        return filteredPrefix && prefixTags.every((current) => tags?.includes(current));
      }

      // Otherwise, return any prefix.
      return filteredPrefix;
    }).map((current) => current.name);

    // Artifacts and locations can also have a creature name prefix.
    if (canIncludeCreatureName) {
      filteredCreatureNamePrefixes.push(
        ...CREATURES.filter(({ isNSFW }) => (allowNSFW ? Boolean(isNSFW) || !isNSFW : !isNSFW)).map(
          (current) => {
            const apostrophe = Math.random() <= APOSTROPHE_CHANCE;

            return `${current.name}${apostrophe ? "'s" : ""}`;
          },
        ),
      );
    }

    const prefixes = [...filteredPrefixes, ...filteredCreatureNamePrefixes];

    prefix = capitalizeAll(prefixes[Math.floor(Math.random() * prefixes.length)] ?? "");
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
      if (suffixTags.length > 0) {
        return filteredSuffix && suffixTags.every((current) => tags?.includes(current));
      }

      // Otherwise, return any suffix.
      return filteredSuffix;
    });

    const filteredCreatureNameSuffixes = [];

    // Artifacts and locations can also have a creature name suffix, but only if the prefix isn't already one.
    if (canIncludeCreatureName && !filteredCreatureNamePrefixes.includes(prefix)) {
      filteredCreatureNameSuffixes.push(
        ...CREATURES.filter(({ isNSFW }) => (allowNSFW ? Boolean(isNSFW) || !isNSFW : !isNSFW)).map(
          (current) => current.name,
        ),
      );
    }

    const suffixes = [...filteredSuffixes, ...filteredCreatureNameSuffixes];
    const suffixChoice = suffixes[Math.floor(Math.random() * suffixes.length)] ?? "";
    let formattedSuffix = "";

    // If the chosen suffix is a creature name is can be plural alongside an article.
    if (typeof suffixChoice === "string") {
      if (Math.random() <= PLURALIZE_CHANCE) {
        formattedSuffix = `${Math.random() <= ARTICLE_CHANCE ? "the " : ""}${capitalizeAll(
          pluralize(suffixChoice),
        )}`;
      } else {
        formattedSuffix = `the ${capitalizeAll(suffixChoice)}`;
      }
    } else {
      formattedSuffix = `${
        suffixChoice[category]?.includes("articledSuffix")
          ? suffixChoice[category]?.includes("suffix") && Math.random() >= ARTICLE_CHANCE
            ? ""
            : "the "
          : ""
      }${capitalizeAll(suffixChoice.name)}`;
    }

    if (formattedSuffix !== "") {
      suffix = `of ${formattedSuffix}`;
    }
  }

  return `${prefix !== "" ? `${prefix} ` : ""}${capitalizeAll(name)}${
    suffix !== "" ? ` ${suffix}` : ""
  }`;
}
