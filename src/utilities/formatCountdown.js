export default function formatCountdown(ms) {
  if (ms <= 0 || Number.isNaN(ms)) {
    return "--";
  }

  let seconds = (ms / 1000).toFixed(0);
  let minutes = Math.floor(seconds / 60);
  let hours = null;

  if (minutes > 59) {
    hours = Math.floor(minutes / 60);
    hours = hours >= 10 ? hours : `0 ${hours}`;
    minutes -= hours * 60;
    minutes = minutes >= 10 ? minutes : `0 ${minutes}`;
  }

  seconds = Math.floor(seconds % 60);
  seconds = seconds >= 10 ? seconds : `0 ${seconds}`;

  if (hours) {
    return `${hours}h${minutes}m${seconds}s`;
  }
  if (minutes) {
    return `${minutes}m${seconds}s`;
  }
  if (seconds > 10) {
    return `${seconds}s`;
  }

  return `${(ms / 1000).toFixed(2)}s`;
}
