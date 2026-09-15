import test from "node:test";
import assert from "node:assert/strict";
import { portfolio } from "../src/data/portfolio.js";
import {
  getContactLinks,
  getSections,
  resolveAction,
} from "../src/lib/portfolio.js";
import { seoTags } from "../src/lib/seo.js";

test("el perfil mínimo no deja secciones ni acciones huérfanas", () => {
  const data = {
    about: { paragraphs: [" "] },
    projects: { items: [{}] },
    services: { items: [] },
    skills: { groups: [{ items: [""] }] },
  };
  const sections = getSections(data);
  assert.ok(Object.values(sections).every((value) => value === false));
  assert.equal(
    resolveAction({ label: "Proyectos", section: "projects" }, sections),
    null,
  );
  assert.equal(
    resolveAction({ label: "Proyectos", url: "#trabajos" }, sections),
    null,
  );
});

test("las opciones de sección prevalecen sobre los datos", () => {
  const data = structuredClone(portfolio);
  for (const key of Object.keys(data.settings.sections))
    data.settings.sections[key] = false;
  assert.ok(Object.values(getSections(data)).every((value) => value === false));
});

test("formación y experiencia funcionan por separado", () => {
  const data = structuredClone(portfolio);
  data.experience = [];
  assert.equal(getSections(data).journey, true);
  assert.equal(getSections(data).experience, false);
  assert.equal(
    resolveAction(
      { label: "Formación", section: "education" },
      getSections(data),
    ).href,
    "#formacion",
  );
  data.education = [];
  assert.equal(getSections(data).journey, false);
});

test("contacto acepta redes sin email y descarta enlaces inválidos", () => {
  const data = {
    socials: [
      { label: "LinkedIn", url: "https://www.linkedin.com/" },
      { label: "Inválido", url: "javascript:alert(1)" },
    ],
  };
  assert.equal(getContactLinks(data).length, 1);
  assert.equal(getSections(data).contact, true);
  assert.equal(
    resolveAction({ label: "Inválido", url: "javascript:alert(1)" }, {}),
    null,
  );
});

test("SEO genera URLs absolutas solo cuando hay dominio real configurado", () => {
  assert.ok(!seoTags(portfolio).some((tag) => tag.attrs?.rel === "canonical"));
  const data = structuredClone(portfolio);
  data.seo.siteUrl = "https://portfolio.example/";
  data.seo.image = "/images/social.jpg";
  const tags = seoTags(data);
  assert.equal(
    tags.find((tag) => tag.attrs?.property === "og:image").attrs.content,
    "https://portfolio.example/images/social.jpg",
  );
  assert.equal(
    tags.find((tag) => tag.attrs?.rel === "canonical").attrs.href,
    "https://portfolio.example/",
  );
});
