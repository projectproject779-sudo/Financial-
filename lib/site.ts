export const SITE_NAME = "Numora";
export const SITE_ORIGIN = "https://www.nexusvault.lat";

export function absoluteUrl(path = "/"): string {
  return new URL(path, SITE_ORIGIN).toString();
}
