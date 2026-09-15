export function seoTags(data) {
  const seo = data.seo ?? {};
  const tags = [];
  const meta = (name, content, property = false) => {
    if (content)
      tags.push({
        tag: "meta",
        attrs: { [property ? "property" : "name"]: name, content },
        injectTo: "head",
      });
  };
  tags.push({
    tag: "title",
    children: seo.title || `${data.firstName} ${data.lastName}`,
    injectTo: "head",
  });
  meta("description", seo.description);
  meta("og:title", seo.title, true);
  meta("og:description", seo.description, true);
  meta("og:type", "website", true);
  meta("og:locale", data.locale?.replace("-", "_"), true);
  const absolute = (value) => {
    try {
      const url = new URL(value, seo.siteUrl || undefined);
      return /^https?:$/.test(url.protocol) ? url.href : undefined;
    } catch {
      return undefined;
    }
  };
  const siteUrl = seo.siteUrl && absolute(seo.siteUrl);
  if (siteUrl) {
    tags.push({
      tag: "link",
      attrs: { rel: "canonical", href: siteUrl },
      injectTo: "head",
    });
    meta("og:url", siteUrl, true);
  }
  const image = seo.image && absolute(seo.image);
  if (image) {
    meta("og:image", image, true);
    meta("og:image:alt", seo.imageAlt, true);
  }
  meta("twitter:card", image ? "summary_large_image" : "summary");
  if (seo.favicon)
    tags.push({
      tag: "link",
      attrs: { rel: "icon", href: seo.favicon },
      injectTo: "head",
    });
  return tags;
}
