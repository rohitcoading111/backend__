
import { Helmet } from "react-helmet-async";

const SITE_URL = "https://learnhubcloud.in";
const DEFAULT_IMAGE = `${SITE_URL}/og-banner.png`;

export default function SEO({
  title = "LearnHub – Online Learning Platform",
  description =
    "Discover expert-led online courses, attend live classes, develop practical skills and track your learning progress with LearnHub.",
  path = "/",
  image = DEFAULT_IMAGE,
  canonicalUrl,
  robots = "index, follow",
}) {
  const normalizedPath = `/${path.replace(/^\/+|\/+$/g, "")}`;
  const pageUrl = new URL(
    normalizedPath === "/" ? "/" : normalizedPath,
    SITE_URL
  ).href;
  const resolvedCanonicalUrl = canonicalUrl
    ? new URL(canonicalUrl, SITE_URL).href
    : pageUrl;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="robots" content={robots} />

      <link rel="canonical" href={resolvedCanonicalUrl} />

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="LearnHub" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={resolvedCanonicalUrl} />
      <meta property="og:image" content={image} />
      <meta property="og:image:secure_url" content={image} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
}
