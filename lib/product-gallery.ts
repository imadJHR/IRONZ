export interface ProductGalleryImage {
  preview: string;
  file?: File;
}

export function appendProductGallery(
  body: FormData,
  images: ProductGalleryImage[],
): void {
  body.append(
    'existingGallery',
    JSON.stringify(images.filter((image) => !image.file).map((image) => image.preview)),
  );

  for (const image of images) {
    if (image.file) body.append('gallery', image.file);
  }
}
