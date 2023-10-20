import { AFFIXES } from "@neverquest/LOCRAN/data/affixes";
import { CREATURES } from "@neverquest/LOCRAN/data/creatures";
import { NAMES } from "@neverquest/LOCRAN/data/names";
import { capitalizeAll } from "@neverquest/utilities/formatters";

export function generateName({
  allowNSFW = false,
  hasTitle = false,
}: {
  allowNSFW?: boolean;
  hasTitle?: boolean;
}) {
  const filteredNames = NAMES.filter((current) => {
    const isNSFW = Boolean(current.isNSFW);

    return allowNSFW ? isNSFW || !isNSFW : !isNSFW;
  });
  const prefixes = filteredNames.filter(({ type }) => type.includes("prefix"));
  const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
  const suffixes = filteredNames.filter(({ type }) => type.includes("suffix"));
  const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];

  if (prefix === undefined || suffix === undefined) {
    throw Error("Invalid name.");
  }

  const connector = prefix.name[prefix.name.length - 1] === suffix.name[0] ? "-" : "";

  let title;

  if (hasTitle) {
    const filteredAffixes = AFFIXES.filter(({ creature, isNSFW, name }) =>
      name === prefix.name || name === suffix.name || name.slice(-3) === "ing"
        ? false
        : (creature?.includes("prefix") || creature?.includes("suffix")) &&
          (allowNSFW ? Boolean(isNSFW) || !isNSFW : !isNSFW),
    );
    const filteredCreatures = CREATURES.filter(
      ({ isNSFW, type }) =>
        type === "monster" && (allowNSFW ? Boolean(isNSFW) || !isNSFW : !isNSFW),
    );
    const filteredTitles = [...filteredAffixes, ...filteredCreatures];
    title = filteredTitles[Math.floor(Math.random() * filteredTitles.length)];

    if (title === undefined) {
      throw Error("Invalid title.");
    }
  }

  return `${capitalizeAll(prefix.name)}${connector}${suffix.name}${
    title === undefined ? "" : `, the ${capitalizeAll(title.name)}`
  }`;
}
