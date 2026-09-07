const CLOUDINARY_UPLOAD_PATH = "/image/upload/";
const CLOUDINARY_BASE_URL =
  "https://res.cloudinary.com/dypjgpisl/image/upload";

export function optimizeImageUrl(src?: string, width = 900): string {
  if (!src) return "";

  const transformation = `f_auto,q_auto:low,c_limit,w_${width}`;

  if (src.startsWith("http")) {
    if (!src.includes(CLOUDINARY_UPLOAD_PATH)) return src;
    return src.replace(
      CLOUDINARY_UPLOAD_PATH,
      `${CLOUDINARY_UPLOAD_PATH}${transformation}/`
    );
  }

  if (src.startsWith("/")) return src;

  return `${CLOUDINARY_BASE_URL}/${transformation}/${src.replace(/^\/+/, "")}`;
}
