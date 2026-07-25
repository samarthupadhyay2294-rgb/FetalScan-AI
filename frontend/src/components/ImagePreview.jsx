export default function ImagePreview({ src, alt = 'Preview', className = '' }) {
  if (!src) return null;
  return (
    <img
      src={src}
      alt={alt}
      className={`rounded-xl object-contain shadow-card ${className}`}
    />
  );
}
