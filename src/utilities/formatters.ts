import { LABEL_EMPTY } from "@neverquest/utilities/constants";

export function capitalizeAll(string: string) {
  // ^\w{1} matches the first letter of the word, or (|) \s+ matches any amount of whitespace between the words.
  return string.replace(/(^\w{1})|(\s+\w{1})/g, (letter) => letter.toUpperCase());
}

export function formatMilliseconds(milliseconds: number) {
  if (milliseconds < 0 || Number.isNaN(milliseconds)) {
    return LABEL_EMPTY;
  }

  let seconds = milliseconds / 1000;
  let minutes = Math.floor(seconds / 60);
  let hours = 0;
  let hoursDisplay = "";
  let minutesDisplay = "";

  if (minutes > 59) {
    hours = Math.floor(minutes / 60);
    hoursDisplay = hours >= 10 ? `${hours}` : `0${hours}`;
    minutes -= hours * 60;
    minutesDisplay = minutes >= 10 ? `${minutes}` : `0${minutes}`;
  }

  seconds = Math.floor(seconds % 60);
  const secondsDisplay = seconds >= 10 ? seconds : `0${seconds}`;

  if (hours > 0) {
    return `${hoursDisplay}h${minutesDisplay}m${secondsDisplay}s`;
  }
  if (minutes > 0) {
    return `${minutesDisplay}m${secondsDisplay}s`;
  }
  if (seconds > 10) {
    return `${secondsDisplay}s`;
  }

  return `${formatFloat(milliseconds / 1000)}s`;
}

export function formatPercentage(number: number) {
  return `${formatFloat(number * 100)}%`;
}

// Correctly does the rounding as opposed to .toFixed().
export function formatFloat(number: number, decimals = 2) {
  const multiplier = 10 ** decimals;
  const result = parseFloat((number * multiplier).toFixed(11));

  return (Math.round(result) / multiplier).toFixed(decimals);
}
