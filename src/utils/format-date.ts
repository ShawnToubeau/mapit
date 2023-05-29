export default function FormatDate(date: Date): string {
  return date.toLocaleString([], {
    dateStyle: "short",
    timeStyle: "short",
  });
}
