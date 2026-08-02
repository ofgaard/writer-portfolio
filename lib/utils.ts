import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Hosts known to no longer serve images (e.g. decommissioned storage providers).
// URLs pointing at these hosts are treated as missing so the UI can fall back gracefully.
const DEAD_IMAGE_HOSTS = ["writer-portfolio-images.s3.eu-north-1.amazonaws.com"];

/**
 * Returns `url` if it looks like a usable image URL, otherwise `fallback`.
 * Use this instead of `url || fallback` when `url` may point at a dead host.
 */
export function getSafeImageUrl(
  url: string | null | undefined,
  fallback: string
): string {
  if (!url) return fallback;
  const isDead = DEAD_IMAGE_HOSTS.some((host) => url.includes(host));
  return isDead ? fallback : url;
}

// This check can be removed, it is just for tutorial purposes
export const hasEnvVars =
  process.env.NEXT_PUBLIC_SUPABASE_URL &&
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_OR_ANON_KEY;
