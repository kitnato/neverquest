import {
  MILLISECONDS_IN_HOUR,
  MILLISECONDS_IN_MINUTE,
  MILLISECONDS_IN_SECOND,
} from "@neverquest/data/general";
import type { NumberFormat } from "@neverquest/types/unions";

export function capitalizeAll(string: string) {
  // ^\w{1} matches the first letter of the word, or (|) \s+ matches any amount of whitespace between the words.
  return string.replace(/(^\w{1})|(\s+\w{1})/g, (letter) => letter.toUpperCase());
}

export function formatEnumeration(list: string[]) {
  const formatter = new Intl.ListFormat("en", { style: "short" });

  return formatter.format(list).replace(", &", " &");
}

// Correctly does the rounding as opposed to .toFixed().
function formatFloat({ decimals = 2, value }: { decimals?: number; value: number }) {
  const multiplier = 10 ** decimals;
  const result = parseFloat((value * multiplier).toFixed(12));

  return (Math.round(result) / multiplier).toFixed(decimals).toLocaleString();
}

export function formatNumber({
  decimals,
  format = "integer",
  value,
}: {
  decimals?: number;
  format?: NumberFormat;
  value: number;
}) {
  switch (format) {
    case "abbreviated": {
      return Math.abs(value) > 999
        ? // Truncate all floats to 2 decimal places maximum.
          `${(Math.trunc((value / 1000) * Math.pow(10, 2)) / Math.pow(10, 2)).toLocaleString()}k`
        : Math.round(value).toLocaleString();
    }

    case "float": {
      return formatFloat({ decimals, value });
    }

    case "percentage": {
      return `${formatFloat({ decimals, value: value * 100 })}%`;
    }

    case "integer": {
      return Math.round(value).toLocaleString();
    }

    case "time": {
      const absoluteValue = Math.abs(value);
      const hours = Math.floor(absoluteValue / MILLISECONDS_IN_HOUR);
      const minutes = Math.floor((absoluteValue % MILLISECONDS_IN_HOUR) / MILLISECONDS_IN_MINUTE);
      const seconds = Math.floor((absoluteValue % MILLISECONDS_IN_MINUTE) / MILLISECONDS_IN_SECOND);

      return `${value < 0 ? "-" : ""}${hours > 0 ? `${hours}h` : ""}${
        hours > 0 || minutes > 0 ? `${minutes}m` : ""
      }${minutes > 0 || seconds >= 10 ? `${seconds}s` : ""}${
        hours === 0 && minutes === 0 && seconds < 10
          ? `${formatFloat({ decimals, value: absoluteValue / MILLISECONDS_IN_SECOND })}s`
          : ""
      }`;
    }
  }
}

export function formatSlug(string: string) {
  return string
    .replace(/^\s+|\s+$/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}
