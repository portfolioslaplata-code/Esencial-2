export const sectionIds = {
  about: "sobre-mi",
  services: "servicios",
  achievements: "logros",
  certifications: "certificaciones",
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

export function getContactItems(data) {
  return [
    ...(hasText(data.email)
      ? [{
          label: data.email,
          url: data.contact?.emailIsDemo ? null : `mailto:${data.email}`,
          demo: Boolean(data.contact?.emailIsDemo),
        }]
      : []),
    ...(hasText(data.phone)
      ? [{ label: data.phone, url: `tel:${data.phone.replace(/[^+\d]/g, "")}` }]
      : []),
    ...(data.socials ?? []),
    ...(data.externalLinks ?? []),
  ].filter((item) => hasText(item?.label) && (item.demo || safeUrl(item?.url)));
}

// Conserva la API de canales accionables, sin incluir datos de muestra.
export function getContactLinks(data) {
  return getContactItems(data).filter((item) => safeUrl(item.url));
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
    achievements:
      enabled("achievements") && namedItems(data.achievements?.items).length > 0,
    certifications:
      enabled("certifications") && namedItems(data.certifications?.items).length > 0,
    experience,
    education,
    journey: experience || education,
    skills: enabled("skills") && skillGroups(data).length > 0,
    contact: enabled("contact") && getContactItems(data).length > 0,
  };
}

// Cuenta bloques visibles; Journey combinado sigue contando una sola vez.
// La declaración se conserva y activeCatalogIds refleja el contenido parcial.
export function getActiveCatalogSections(data) {
  const visible = getSections(data);
  return (data.catalogComposition?.sections ?? [])
    .filter((section) => visible[section.id])
    .map((section) => ({
      ...section,
      activeCatalogIds: section.catalogIds.filter((id) => visible[id]),
    }));
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
