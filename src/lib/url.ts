// Only http(s) URLs are rendered as links, so a stored "javascript:" URL can't run
export function isHttpUrl(url: string) {
  try {
    const { protocol } = new URL(url);
    return protocol === "http:" || protocol === "https:";
  } catch {
    return false;
  }
}
