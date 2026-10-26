const SECONDS_PER_MINUTE = 60;
const SECONDS_PER_HOUR = 60 * SECONDS_PER_MINUTE;
const SECONDS_PER_DAY = 24 * SECONDS_PER_HOUR;
const BYTES_PER_KB = 1024;
const BYTES_PER_MB = 1024 * BYTES_PER_KB;

// Months and years are approximated as 30 and 365 days
const RELATIVE_TIME_UNITS: [Intl.RelativeTimeFormatUnit, number][] = [
  ["year", 365 * SECONDS_PER_DAY],
  ["month", 30 * SECONDS_PER_DAY],
  ["week", 7 * SECONDS_PER_DAY],
  ["day", SECONDS_PER_DAY],
  ["hour", SECONDS_PER_HOUR],
  ["minute", SECONDS_PER_MINUTE],
];

const relativeTimeFormat = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

export function formatRelativeTime(date: Date | string, now = new Date()): string {
  const seconds = (new Date(date).getTime() - now.getTime()) / 1000;

  for (const [unit, unitSeconds] of RELATIVE_TIME_UNITS) {
    if (Math.abs(seconds) >= unitSeconds) {
      return relativeTimeFormat.format(Math.round(seconds / unitSeconds), unit);
    }
  }

  return "just now";
}

export function formatFileSize(bytes: number): string {
  if (bytes < BYTES_PER_KB) return `${bytes} B`;
  if (bytes < BYTES_PER_MB) return `${(bytes / BYTES_PER_KB).toFixed(1)} KB`;
  return `${(bytes / BYTES_PER_MB).toFixed(1)} MB`;
}
