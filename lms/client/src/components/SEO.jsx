
import { Helmet } from "react-helmet-async";

const SITE_URL = "https://learnhubcloud.in";
const DEFAULT_IMAGE = `${SITE_URL}/og-banner.png`;
const ORGANIZATION_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;
const LOGO_URL = `${SITE_URL}/favicon.png`;

function createStructuredData({ title, description, canonicalUrl, breadcrumbs }) {
  const graph = [
    {
      "@type": "Organization",
      "@id": ORGANIZATION_ID,
      name: "LearnHub",
      url: `${SITE_URL}/`,
      logo: {
        "@type": "ImageObject",
        "@id": `${SITE_URL}/#logo`,
        url: LOGO_URL,
        contentUrl: LOGO_URL,
        width: 512,
        height: 512,
      },
    },
    {
      "@type": "WebSite",
      "@id": WEBSITE_ID,
      name: "LearnHub",
      url: `${SITE_URL}/`,
      publisher: { "@id": ORGANIZATION_ID },
      inLanguage: "en",
    },
    {
      "@type": "WebPage",
      "@id": `${canonicalUrl}#webpage`,
      url: canonicalUrl,
      name: title,
      description,
      isPartOf: { "@id": WEBSITE_ID },
      publisher: { "@id": ORGANIZATION_ID },
      inLanguage: "en",
      ...(breadcrumbs.length > 0
        ? { breadcrumb: { "@id": `${canonicalUrl}#breadcrumb` } }
        : {}),
    },
  ];

  if (breadcrumbs.length > 0) {
    graph.push({
      "@type": "BreadcrumbList",
      "@id": `${canonicalUrl}#breadcrumb`,
      itemListElement: breadcrumbs.map(({ name, path }, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name,
        item: new URL(path, SITE_URL).href,
      })),
    });
  }

  return {
    "@context": "https://schema.org",
    "@graph": graph,
  };
}

export default function SEO({
  title = "LearnHub – Online Learning Platform",
  description =
    "Discover expert-led online courses, attend live classes, develop practical skills and track your learning progress with LearnHub.",
  path = "/",
  image = DEFAULT_IMAGE,
  canonicalUrl,
  robots = "index, follow",
  breadcrumbs = [],
}) {
  const normalizedPath = `/${path.replace(/^\/+|\/+$/g, "")}`;
  const pageUrl = new URL(
    normalizedPath === "/" ? "/" : normalizedPath,
    SITE_URL
  ).href;
  const resolvedCanonicalUrl = canonicalUrl
    ? new URL(canonicalUrl, SITE_URL).href
    : pageUrl;
  const structuredData = createStructuredData({
    title,
    description,
    canonicalUrl: resolvedCanonicalUrl,
    breadcrumbs,
  });

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

      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
}
