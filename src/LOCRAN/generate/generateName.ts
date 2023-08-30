import { AFFIXES } from "@neverquest/LOCRAN/data/affixes";
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
  const filteredTitles = AFFIXES.filter((current) => {
    const filterNSFW = allowNSFW ? Boolean(current.isNSFW) || !current.isNSFW : !current.isNSFW;

    if (
      current.name === prefix.name ||
      current.name === suffix.name ||
      current.name.slice(-3) === "ing"
    ) {
      return false;
    }

    return current.creature === "prefix" && filterNSFW;
  });
  const title = hasTitle && filteredTitles[Math.floor(Math.random() * filteredTitles.length)];

  if (title === undefined) {
    throw Error("Invalid title.");
  }

  return `${capitalizeAll(prefix.name)}${connector}${suffix.name}${
    title === false ? "" : `, the ${capitalizeAll(title.name)}`
  }`;
}
