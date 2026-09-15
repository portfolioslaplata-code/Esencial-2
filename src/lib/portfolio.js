export const sectionIds = {
  about: "sobre-mi",
  services: "servicios",
  projects: "trabajos",
  journey: "recorrido",
  experience: "experiencia",
  education: "formacion",
  skills: "habilidades",
  contact: "contacto",
};
export const hasText = (value) =>
  typeof value === "string" && value.trim().length > 0;
export const namedItems = (items) =>
  (items ?? []).filter((item) => hasText(item?.name) || hasText(item?.title));
export const skillGroups = (data) =>
  (data.skills?.groups ?? []).filter((group) => group?.items?.some(hasText));

export function safeUrl(value) {
  if (!hasText(value)) return undefined;
  const url = value.trim();
  return /^(https?:\/\/|mailto:|tel:|\/(?!\/)|#)/i.test(url) ? url : undefined;
}

export function getContactLinks(data) {
  return [
    ...(hasText(data.email)
      ? [{ label: data.email, url: `mailto:${data.email}` }]
      : []),
    ...(hasText(data.phone)
      ? [{ label: data.phone, url: `tel:${data.phone.replace(/[^+\d]/g, "")}` }]
      : []),
    ...(data.socials ?? []),
    ...(data.externalLinks ?? []),
  ].filter((link) => hasText(link?.label) && safeUrl(link?.url));
}

export function getSections(data) {
  const enabled = (key) => data.settings?.sections?.[key] !== false;
  const experience =
    enabled("experience") && namedItems(data.experience).length > 0;
  const education =
    enabled("education") && namedItems(data.education).length > 0;
  return {
    about:
      enabled("about") &&
      Boolean(
        hasText(data.about?.intro) ||
        data.about?.paragraphs?.some(hasText) ||
        data.about?.facts?.some((fact) => hasText(fact?.value)),
      ),
    services:
      enabled("services") && namedItems(data.services?.items).length > 0,
    projects:
      enabled("projects") && namedItems(data.projects?.items).length > 0,
    experience,
    education,
    journey: experience || education,
    skills: enabled("skills") && skillGroups(data).length > 0,
    contact: enabled("contact") && getContactLinks(data).length > 0,
  };
}

export function resolveAction(action, sections) {
  if (!hasText(action?.label)) return null;
  if (action.url) {
    const href = safeUrl(action.url);
    if (!href) return null;
    if (
      href.startsWith("#") &&
      !Object.entries(sectionIds).some(
        ([key, id]) => sections[key] && href === `#${id}`,
      ) &&
      href !== "#inicio"
    )
      return null;
    return { ...action, href };
  }
  return sections[action.section] && sectionIds[action.section]
    ? { ...action, href: `#${sectionIds[action.section]}` }
    : null;
}
