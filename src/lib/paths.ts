const base = import.meta.env.BASE_URL.replace(/\/$/, "");

/** Prefix a site-relative path with the configured base (/iridium). */
export function href(path: string): string {
  if (path.startsWith("#")) return path;
  const clean = path.startsWith("/") ? path : `/${path}`;
  return `${base}${clean}`;
}
