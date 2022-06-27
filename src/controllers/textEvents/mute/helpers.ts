export function formatText(text: string, username: string, days: string | number): string {
  return text
    .replaceAll('%user%', username.toString())
    .replaceAll('%days%', days.toString())
}
