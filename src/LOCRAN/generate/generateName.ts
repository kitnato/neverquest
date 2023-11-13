import { AFFIXES } from "@neverquest/LOCRAN/data/affixes";
import { CREATURES } from "@neverquest/LOCRAN/data/creatures";
import { NAMES } from "@neverquest/LOCRAN/data/names";
import { capitalizeAll } from "@neverquest/utilities/formatters";

export function generateName({
  allowProfanity = false,
  hasTitle = false,
}: {
  allowProfanity?: boolean;
  hasTitle?: boolean;
}) {
  const filteredNames = NAMES.filter((current) => {
    const isProfanity = Boolean(current.isProfanity);

    return allowProfanity ? isProfanity || !isProfanity : !isProfanity;
  });
  const prefixes = filteredNames.filter(({ affix }) => affix.includes("prefix"));
  const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
  const suffixes = filteredNames.filter(({ affix }) => affix.includes("suffix"));
  const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];

  if (prefix === undefined || suffix === undefined) {
    throw new Error("Invalid name.");
  }

  const connector = prefix.name.at(-1) === suffix.name[0] ? "-" : "";

  let title;

  if (hasTitle) {
    const filteredAffixes = AFFIXES.filter(({ creature, isProfanity, name }) =>
      name === prefix.name || name === suffix.name || name.slice(-3) === "ing"
        ? false
        : (creature?.includes("prefix") || creature?.includes("suffix")) &&
          (allowProfanity ? Boolean(isProfanity) || !isProfanity : !isProfanity),
    );
    const filteredCreatures = CREATURES.filter(({ isProfanity }) =>
      allowProfanity ? Boolean(isProfanity) || !isProfanity : !isProfanity,
    );
    const filteredTitles = [...filteredAffixes, ...filteredCreatures];
    title = filteredTitles[Math.floor(Math.random() * filteredTitles.length)];

    if (title === undefined) {
      throw new Error("Invalid title.");
    }
  }

  return `${capitalizeAll(prefix.name)}${connector}${suffix.name}${
    title === undefined ? "" : `, the ${capitalizeAll(title.name)}`
  }`;
}
