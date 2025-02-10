export function formatTimestampToTime(timestamp: {
  seconds: number;
  nanoseconds: number;
}): string {
  const date = new Date(timestamp.seconds * 1000);
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  return `${hours}:${minutes}`;
}
