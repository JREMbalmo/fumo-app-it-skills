import fs from "fs";
import path from "path";

const IMAGE_EXTENSIONS = /\.(jpg|jpeg|png|gif|webp|avif)$/i;

export function getImageFiles(subdir: string): string[] {
  const fullPath = path.join(process.cwd(), "public", subdir);
  try {
    return fs
      .readdirSync(fullPath)
      .filter((f) => IMAGE_EXTENSIONS.test(f))
      .sort()
      .map((f) => `/${subdir}/${f}`);
  } catch {
    return [];
  }
}
