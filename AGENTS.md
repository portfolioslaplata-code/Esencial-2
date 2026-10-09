# Minimal · Portfolios La Plata

## Contexto independiente

Demo/modelo Minimal del ecosistema Portfolios La Plata. `Esencial-2` es un nombre histórico, no un Plan Esencial vigente. Su dirección es sobria, estructurada, neutral, contemporánea y profesional. El perfil ficticio actual es de administración y consultoría de gestión; no limita las profesiones que puede representar.

La oferta vigente es **Portfolio Base + secciones estándar/avanzadas + complementos + desarrollo a medida**. `LandingPage` es la fuente comercial principal de precios, catálogo y mensaje. Esta demo aporta diseño e implementación, sin definir precios, planes ni límites de secciones. Hero y Contacto/Footer pertenecen a la base; CV descargable es el único complemento actual, no exclusivo de otra demo. Minimal, Editorial y Profundidad son referencias complementarias, sin jerarquía comercial.

## Arquitectura y contenido

- React + Vite + JavaScript + Tailwind CSS mediante `@tailwindcss/vite`. One-page estática, actualmente sin backend, CMS ni Analytics; conservar la simplicidad sin convertir esa implementación en una restricción comercial por plan.
- `src/data/portfolio.js` centraliza datos personales, textos, enlaces, SEO, `settings` y `theme`. No hardcodear contenido del cliente en componentes ni duplicar colores fuera de sus tokens.
- `catalogComposition` declara Base y seis bloques estándar en orden visual: Sobre mí, Servicios, Logros, Experiencia + Formación, Certificaciones y Habilidades. No hay avanzadas ni complementos activos (`cv: null`). `getActiveCatalogSections` reutiliza `getSections`, excluye bloques ocultos/vacíos y expone `activeCatalogIds` sin modificar la declaración.
- `src/App.jsx` compone la página y sus componentes locales; `src/components/Icon.jsx` reúne iconos SVG. Reutilizar los elementos existentes sin reorganizar por rutina.
- `src/lib/portfolio.js` centraliza visibilidad, filtrado de contenido, `safeUrl` y resolución de CTA. Una sección deshabilitada prevalece sobre sus datos; ocultar bloques vacíos y enlaces hacia secciones no visibles.
- Experiencia y formación comparten la introducción `journey`; admitir trayectoria parcial y recalcular la numeración visible. Fotos, enlaces y CV son opcionales; mantener la tarjeta de identidad sin foto y el CV desactivado en esta demo.
- Journey cuenta como un solo bloque estándar asociado a `experience` y `education`, incluso con una sola columna; su línea visual no es una Timeline avanzada. La numeración de `App.jsx` incluye Contacto, pero el conteo comercial lo excluye por pertenecer a Base.
- Logros reemplaza Proyectos: `achievements.items` presenta aportes realizados y cualitativos, sin métricas inventadas. `certifications.items` es independiente y muestra acreditaciones puntuales, diferenciadas de la formación académica/general de Journey. Sus datos de demo deben identificarse como ficticios, sin logos, enlaces o credenciales de entidades reales.
- Ambas secciones usan `settings.sections`, `namedItems` y la visibilidad existente. Los anchors son `#logros` y `#certificaciones`; no conservar destinos públicos a `#trabajos`. Contacto lleva el número 07 cuando los seis bloques están visibles, sin sumarse al conteo comercial.
- Conservar compatibilidad conceptual con los datos de Editorial: identidad en la raíz, `services.items`, `experience`, `education`, `skills.groups` y `ui`. Minimal tiene `achievements.items` y `certifications.items`, sin render de Proyectos. `theme` conserva fallbacks. No imponer igualdad de schemas ni copiar componentes sin pedido.

## Dirección visual y calidad

- Preservar jerarquía clara, estructura ordenada, fondos neutros y acento verde configurable. `src/index.css` contiene bases y fallbacks; `src/App.css`, la presentación. Mantener una personalidad distinta de la composición cálida/editorial de `Esencial-1`.
- Español argentino con voseo y tono profesional/cercano. Mobile-first, responsive, contraste, foco visible, teclado, menú con Escape y respeto por `prefers-reduced-motion`.
- Fuentes del sistema, SVG locales y recursos optimizados; evitar dependencias, animaciones y servicios externos innecesarios.
- No inventar clientes, métricas, testimonios ni datos reales. Mantener `settings.demoNotice` y el carácter ficticio del perfil hasta reemplazarlo por material real y autorizado; no activar destinos de ejemplo.

## SEO y operación

- `src/lib/seo.js` y `vite.config.js` generan metadatos en HTML desde los datos. Conservar título, descripción, idioma y Open Graph; canonical depende de `seo.siteUrl`. No inventar un dominio ni asumir prerenderizado del cuerpo.
- Contacto por enlaces configurados, sin simular envíos. No mostrar CV sin destino válido ni enlazar certificaciones ficticias. Reconstruir tras cambiar datos de producción.
- `contact.emailIsDemo` conserva el correo ficticio como texto sin destino. `getContactItems` incluye la muestra y `getContactLinks` solo canales accionables; el CTA usa el primer canal real o se reemplaza por `contact.demoLabel` estático. `contact.demoDescription` explica la muestra. Solo quitar la marca al configurar un correo real; retirar el aviso del footer no activa canales.
- No introducir nuevas funciones comerciales ni activar Analytics por iniciativa propia. Consultar `../../AGENTS.md` y `../producto-docs/` si están disponibles; sus referencias históricas no redefinen la oferta de la Landing.
- Trabajar dentro de este repo salvo pedido que abarque otros. No hacer push, deploy ni comprar dominios sin pedido; nunca force push.

## Validación

Consultar `package.json`. Tras cambios relevantes de implementación: `npm run lint` (Oxlint), `npm test` y `npm run build`. Las pruebas cubren composición, visibilidad, Journey parcial, contacto y SEO; las de render usan React y Vite existentes para comprobar números y anchors reales. No existe un script de pruebas de navegador: revisar responsive, teclado, numeración y contenido opcional cuando cambie la UI. Para cambios solo de instrucciones, revisar documentación y diff.
