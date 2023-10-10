import {
  LABEL_EMPTY,
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
  const result = parseFloat((value * multiplier).toFixed(11));

  return (Math.round(result) / multiplier).toFixed(decimals).toLocaleString();
}

export function formatSlug(string: string) {
  return string
    .replace(/^\s+|\s+$/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export function formatValue({
  decimals,
  format = "integer",
  value,
}: {
  decimals?: number;
  format?: NumberFormat;
  value: number;
}) {
  switch (format) {
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
      if (value < 0 || Number.isNaN(value)) {
        return LABEL_EMPTY;
      }

      const hours = Math.floor(value / MILLISECONDS_IN_HOUR);
      const minutes = Math.floor((value % MILLISECONDS_IN_HOUR) / MILLISECONDS_IN_MINUTE);
      const seconds = Math.floor((value % MILLISECONDS_IN_MINUTE) / MILLISECONDS_IN_SECOND);

      return (
        (hours > 0 ? `${hours}h` : "") +
        (hours > 0 || minutes > 0 ? `${minutes}m` : "") +
        (minutes > 0 || seconds >= 10 ? `${seconds}s` : "") +
        (hours === 0 && minutes === 0 && seconds < 10
          ? `${formatFloat({ decimals, value: value / MILLISECONDS_IN_SECOND })}s`
          : "")
      );
    }
  }
}
