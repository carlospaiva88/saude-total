// ResponsiveImage.jsx (snippet)
export default function ResponsiveImage({ src, alt }) {
  // ideal: você gere variantes em build (320, 640, 1024, 1600)
  const base = src;
  return (
    <picture>
      <source srcSet={`${base}?w=1200 1200w, ${base}?w=800 800w, ${base}?w=400 400w`} sizes="(min-width: 980px) 720px, 100vw" />
      <img src={base} alt={alt} loading="lazy" decoding="async" style={{ width: "100%", height: "auto", borderRadius: "16px" }} />
    </picture>
  );
}
