import {
  LABEL_EMPTY,
  MILLISECONDS_IN_HOUR,
  MILLISECONDS_IN_MINUTE,
  MILLISECONDS_IN_SECOND,
} from "@neverquest/utilities/constants";

export function capitalizeAll(string: string) {
  // ^\w{1} matches the first letter of the word, or (|) \s+ matches any amount of whitespace between the words.
  return string.replace(/(^\w{1})|(\s+\w{1})/g, (letter) => letter.toUpperCase());
}

// Correctly does the rounding as opposed to .toFixed().
export function formatFloat(number: number, decimals = 2) {
  const multiplier = 10 ** decimals;
  const result = parseFloat((number * multiplier).toFixed(11));

  return (Math.round(result) / multiplier).toFixed(decimals);
}

export function formatPercentage(number: number, decimals?: number) {
  return `${formatFloat(number * 100, decimals)}%`;
}

export function formatSlug(string: string) {
  return string
    .replace(/^\s+|\s+$/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export function formatTime(milliseconds: number) {
  if (milliseconds < 0 || Number.isNaN(milliseconds)) {
    return LABEL_EMPTY;
  }

  const hours = Math.floor(milliseconds / MILLISECONDS_IN_HOUR);
  const minutes = Math.floor((milliseconds % MILLISECONDS_IN_HOUR) / MILLISECONDS_IN_MINUTE);
  const seconds = Math.floor((milliseconds % MILLISECONDS_IN_MINUTE) / MILLISECONDS_IN_SECOND);

  return (
    (hours > 0 ? `${hours}h` : "") +
    (hours > 0 || minutes > 0 ? `${minutes}m` : "") +
    (minutes > 0 || seconds >= 10 ? `${seconds}s` : "") +
    (hours === 0 && minutes === 0 && seconds < 10
      ? `${formatFloat(milliseconds / MILLISECONDS_IN_SECOND)}s`
      : "")
  );
}
