import test from "node:test";
import assert from "node:assert/strict";
import { portfolio } from "../src/data/portfolio.js";
import { getActiveCatalogSections, getContactItems, getContactLinks, getSections } from "../src/lib/portfolio.js";

test("Minimal declara Base y seis bloques estándar en orden visual, sin complementos", () => {
  const active = getActiveCatalogSections(portfolio);
  assert.deepEqual(portfolio.catalogComposition.base, ["navigation", "hero", "contact", "footer"]);
  assert.equal(portfolio.catalogComposition.sections.length, 6);
  assert.deepEqual(active.map(({ id }) => id), ["about", "services", "achievements", "journey", "certifications", "skills"]);
  assert.deepEqual(active.map(({ catalogIds }) => catalogIds), [["about"], ["services"], ["achievements"], ["experience", "education"], ["certifications"], ["skills"]]);
  assert.ok(active.every(({ type, label, catalogIds, activeCatalogIds }) => type === "standard" && label && JSON.stringify(catalogIds) === JSON.stringify(activeCatalogIds)));
  assert.deepEqual(portfolio.catalogComposition.complements, []);
  assert.equal(portfolio.cv, null);
  assert.equal(getSections(portfolio).contact, true);
});

test("los bloques ocultos y vacíos salen del conteo sin alterar la declaración", () => {
  const data = structuredClone(portfolio);
  data.settings.sections.services = false;
  data.achievements.items = [{ name: " " }];
  data.certifications.items = [];
  data.skills.groups = [{ items: [" "] }];
  const declaration = structuredClone(data.catalogComposition);
  assert.deepEqual(getActiveCatalogSections(data).map(({ id }) => id), ["about", "journey"]);
  assert.deepEqual(data.catalogComposition, declaration);
  assert.deepEqual(getActiveCatalogSections({}), []);
});

test("Journey parcial conserva un bloque y expone solamente sus IDs activos", () => {
  for (const missing of ["experience", "education"]) {
    for (const mode of ["empty", "disabled"]) {
      const data = structuredClone(portfolio);
      if (mode === "empty") data[missing] = [];
      else data.settings.sections[missing] = false;
      const active = getActiveCatalogSections(data);
      assert.equal(active.length, 6);
      assert.deepEqual(active.find(({ id }) => id === "journey"), {
        id: "journey", type: "standard", label: "Experiencia + Formación",
        catalogIds: ["experience", "education"],
        activeCatalogIds: [missing === "experience" ? "education" : "experience"],
      });
      assert.deepEqual(data.catalogComposition.sections[3].catalogIds, ["experience", "education"]);
    }
  }
});

test("Journey vacío o completamente deshabilitado desaparece del conteo", () => {
  for (const mode of ["empty", "disabled"]) {
    const data = structuredClone(portfolio);
    for (const id of ["experience", "education"]) {
      if (mode === "empty") data[id] = [{ title: " " }];
      else data.settings.sections[id] = false;
    }
    assert.equal(getSections(data).journey, false);
    assert.deepEqual(getActiveCatalogSections(data).map(({ id }) => id), ["about", "services", "achievements", "certifications", "skills"]);
  }
});

for (const key of ["achievements", "certifications"]) {
  test(`${key}: visibilidad y conteo responden a datos vacíos, ausentes o deshabilitados`, () => {
    for (const mode of ["disabled", "empty", "invalid", "missing"]) {
      const data = structuredClone(portfolio);
      if (mode === "disabled") data.settings.sections[key] = false;
      if (mode === "empty") data[key].items = [];
      if (mode === "invalid") data[key].items = [null, {}, { name: "  ", title: " " }];
      if (mode === "missing") delete data[key];
      assert.equal(getSections(data)[key], false);
      const active = getActiveCatalogSections(data);
      assert.equal(active.length, 5);
      assert.ok(!active.some(({ id }) => id === key));
      assert.equal(data.catalogComposition.sections.length, 6);
    }
    const data = structuredClone(portfolio);
    data[key].items = [{ name: " " }, { title: "Una entrada válida" }];
    assert.equal(getSections(data)[key], true);
    assert.equal(getActiveCatalogSections(data).length, 6);
  });
}

test("el correo demo permanece visible sin destino, aunque se retire el aviso del footer", () => {
  const data = structuredClone(portfolio);
  data.settings.demoNotice = "";
  assert.deepEqual(getContactItems(data), [{ label: data.email, url: null, demo: true }]);
  assert.deepEqual(getContactLinks(data), []);
  assert.equal(getSections(data).contact, true);
  data.email = " ";
  assert.equal(getSections(data).contact, false);
});

test("el correo demo no bloquea otros canales y el correo real requiere quitar la marca", () => {
  const data = structuredClone(portfolio);
  data.phone = "+54 221 555 0100";
  data.socials = [{ label: "Red", url: "https://example.org/perfil" }];
  data.externalLinks = [{ label: "Inválido", url: "javascript:alert(1)" }];
  assert.deepEqual(getContactLinks(data).map(({ url }) => url), ["tel:+542215550100", "https://example.org/perfil"]);
  data.email = "cliente@example.org";
  data.contact.emailIsDemo = false;
  assert.equal(getContactLinks(data)[0].url, "mailto:cliente@example.org");
});
