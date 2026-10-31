export const LESSON_MEDIA_BUCKET = "lesson-media";

export const ALLOWED_IMAGE_TYPES = ["image/png", "image/jpeg", "image/webp"];

export const MAX_IMAGE_SIZE_BYTES = 2 * 1024 * 1024;

export function isAllowedImageFile(file: File): boolean {
  return (
    ALLOWED_IMAGE_TYPES.includes(file.type) && file.size <= MAX_IMAGE_SIZE_BYTES
  );
}

export function buildLessonMediaPath(fileName: string): string {
  const ext = fileName.split(".").pop()?.toLowerCase() || "bin";
  return `${crypto.randomUUID()}.${ext}`;
}
