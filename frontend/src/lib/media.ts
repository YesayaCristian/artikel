export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;

export function resolveMediaUrl(path?: string) {
  if (!path) return "";
  if (path.startsWith("http")) return path;
  return `${API_BASE_URL}${path}`;
}
