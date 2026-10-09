import assert from "node:assert/strict";
import { after, before, test } from "node:test";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { createServer } from "vite";
import { portfolio } from "../src/data/portfolio.js";
import { getActiveCatalogSections } from "../src/lib/portfolio.js";

let server;
let App;
before(async () => {
  server = await createServer({ server: { middlewareMode: true }, appType: "custom" });
  App = (await server.ssrLoadModule("/src/App.jsx")).default;
});
after(async () => { await server?.close(); });

function inspect(data) {
  const html = renderToStaticMarkup(createElement(App, { data }));
  const numbers = [...html.matchAll(/class="section-number">(\d+)</g)].map((match) => match[1]);
  const ids = new Set([...html.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]));
  const anchors = [...html.matchAll(/href="#([^"]+)"/g)].map((match) => match[1]);
  assert.ok(anchors.every((id) => ids.has(id)), "No debe haber anchors hacia bloques ausentes");
  assert.deepEqual(numbers, Array.from({ length: numbers.length }, (_, i) => String(i + 1).padStart(2, "0")));
  assert.doesNotMatch(html, /(?:id|href)="(?:#)?(?:trabajos|projects)(?:-title)?"/);
  assert.doesNotMatch(html, /href="mailto:|Descargar CV/);
  return { html, numbers, ids, anchors };
}

test("render: seis secciones, Contacto 07, navegación completa y certificaciones de muestra", () => {
  const { html, numbers, anchors } = inspect(portfolio);
  assert.equal(numbers.length, 7);
  assert.equal(getActiveCatalogSections(portfolio).length, 6);
  const nav = html.match(/<nav\b[^>]*>([\s\S]*?)<\/nav>/)[1];
  assert.deepEqual([...nav.matchAll(/href="#([^"]+)"/g)].map((match) => match[1]), [
    "sobre-mi", "servicios", "logros", "recorrido", "certificaciones", "habilidades", "contacto",
  ]);
  assert.ok(anchors.includes("logros") && anchors.includes("certificaciones"));
  assert.equal((html.match(/class="achievement-row"/g) ?? []).length, 3);
  assert.equal((html.match(/class="certification-item"/g) ?? []).length, 3);
  assert.match(html, /ejemplos ficticios, sin credenciales verificables/);
  assert.match(html, /Contacto de muestra/);
  assert.ok(!portfolio.education.some((item) => portfolio.certifications.items.some((cert) => cert.name === item.title)));
});

test("render: ocultar o vaciar Logros y Certificaciones reajusta números, nav y CTA", () => {
  for (const [key, id] of [["achievements", "logros"], ["certifications", "certificaciones"]]) {
    for (const mode of ["disabled", "empty", "missing"]) {
      const data = structuredClone(portfolio);
      data.hero.secondaryAction = { label: "Explorar sección", section: key };
      if (mode === "disabled") data.settings.sections[key] = false;
      if (mode === "empty") data[key].items = [];
      if (mode === "missing") delete data[key];
      const { ids, anchors, numbers } = inspect(data);
      assert.equal(numbers.length, 6);
      assert.ok(!ids.has(id) && !anchors.includes(id));
    }
  }
});

test("render: Journey parcial y perfil mínimo conservan anchors y numeración continua", () => {
  const data = structuredClone(portfolio);
  data.experience = [];
  assert.equal(inspect(data).numbers.length, 7);
  data.education = [];
  assert.equal(inspect(data).numbers.length, 6);
  for (const key of Object.keys(data.settings.sections)) data.settings.sections[key] = false;
  assert.equal(inspect(data).numbers.length, 0);
});
