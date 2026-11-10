import imageData from "../data/black-friday-images.json";

const images: Record<string, { srcSet: string; placeholder: string }> = imageData;

type Props = {
  src: string;
  alt: string;
  sizes: string;
  className?: string;
  eager?: boolean;
  priority?: boolean;
};

export default function BlackFridayImage({ src, alt, sizes, className, eager = false, priority = false }: Props) {
  const image = images[src];
  return (
    // These hashed, pre-generated WebP variants bypass request-time image resizing.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      srcSet={image?.srcSet}
      sizes={sizes}
      alt={alt}
      width={1254}
      height={1254}
      loading={eager ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "auto"}
      decoding="async"
      className={className}
      style={image ? { backgroundImage: `url("${image.placeholder}")`, backgroundSize: "100% 100%", backgroundRepeat: "no-repeat" } : undefined}
    />
  );
}
