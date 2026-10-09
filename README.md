# Minimal · Portfolios La Plata

Modelo reutilizable de portfolio profesional, one-page y responsive. React + Vite + Tailwind CSS 4. Una presentación sobria y estructurada, con perfil, servicios, proyectos, trayectoria, competencias y contacto. Sin backend, CMS, base de datos ni analytics.

Minimal es una demo de diseño e implementación, no un plan comercial ni un nivel de precio. La Landing mantiene el catálogo y la oferta vigente: Portfolio Base + secciones estándar + secciones avanzadas + complementos + desarrollo a medida. `Esencial-2` se conserva como identificador técnico de carpeta y paquete.

## Composición del catálogo

`src/data/portfolio.js → catalogComposition` declara Base (`navigation`, `hero`, `contact`, `footer`) y cinco bloques estándar en su orden visual:

1. Sobre mí: `about`.
2. Servicios: `services`.
3. Proyectos: `projects`.
4. Experiencia + Formación: bloque `journey`, asociado a `experience` y `education`.
5. Habilidades: `skills`.

Cada bloque declara `id`, `type`, `catalogIds` oficiales y `label`, sin precios ni límites. Hay **0 avanzadas y 0 complementos** (`complements: []`, `cv: null`). Los tres proyectos en filas de texto forman una sola sección estándar; la línea visual de Journey tampoco lo convierte en Timeline avanzada.

`getActiveCatalogSections(data)` en `src/lib/portfolio.js` reutiliza `getSections`: excluye bloques vacíos o deshabilitados y conserva el orden declarado. Su longitud cuenta bloques comerciales visibles. `catalogIds` y `label` conservan la declaración; `activeCatalogIds` refleja el contenido disponible. Journey cuenta una vez con ambas columnas o solo una, y desaparece sin ambas. La declaración debe conservar el orden visual de Minimal al adaptar datos de otro modelo.

La numeración de `App.jsx` ya se deriva del orden visible e incluye Contacto. Esa numeración no es el conteo comercial: Contacto pertenece a Base.

## Desarrollo

```sh
npm ci
npm run dev
npm run lint
npm test
npm run build
npm run preview
```

Usar una versión de Node compatible con Vite 8 (la versión requerida está declarada por Vite en `node_modules/vite/package.json`). El resultado de producción se genera en `dist/`.

## Personalizar un cliente

1. Duplicar el repositorio.
2. Editar **`src/data/portfolio.js`**: identidad, textos, contacto, redes, CV y SEO.
3. Colocar fotografías y documentos en `public/`. Referenciarlos como `/images/perfil.jpg` o `/cv.pdf`.
4. Ajustar `theme` en el mismo archivo. Los colores se aplican mediante variables CSS; el favicon es un archivo independiente indicado por `seo.favicon`.
5. Activar las secciones necesarias en `settings.sections`. Dejar vacíos los arrays de contenido también oculta las secciones.
6. Reemplazar el email `.example` por un correo real verificado y cambiar `contact.emailIsDemo` a `false`. Reemplazar el contenido ficticio antes de configurar `settings.demoNotice` con `''` para retirar el aviso de demostración. `settings.credit.enabled` muestra u oculta el crédito.
7. Ejecutar lint, pruebas y build; revisar la versión móvil y los enlaces reales del cliente.

Los enlaces deben ser URLs `https://`, `http://`, `mailto:`, `tel:`, rutas desde la raíz `/` o anclas válidas. No se muestran botones de CV ni enlaces de proyecto sin destino. El contacto utiliza los enlaces configurados; no envía formularios ni requiere un servidor.

Con `contact.emailIsDemo: true`, `getContactItems` devuelve el correo visible con `url: null`; `getContactLinks` conserva solamente canales accionables. El correo de muestra es texto, sin `mailto:` ni foco de teclado. Si no hay un canal real, el CTA se reemplaza por el texto estático `contact.demoLabel`; `contact.demoDescription` explica el correo mediante tooltip y texto para lectores de pantalla. Si hay teléfono, redes u otros enlaces válidos, el CTA usa el primer canal accionable. Quitar el aviso del footer no activa el correo. Sin datos de contacto, el bloque y sus anclas se ocultan.

### Secciones y acciones

`about`, `projects`, `services`, `experience`, `education`, `skills` y `contact` son opcionales. La navegación y los CTA internos solo apuntan a secciones visibles. Experiencia y formación comparten la introducción `journey`; si ambas están vacías, se oculta todo el bloque. La numeración visible se recalcula automáticamente.

```js
settings: {
  sections: { projects: false, experience: false },
  // Conservar las otras opciones que quieras personalizar.
}
// Ejemplo de CTA a una sección:
primaryAction: { label: 'Conversemos', section: 'contact' }
// Ejemplo de CV opcional:
cv: { label: 'Descargar CV', url: '/cv.pdf' }
```

Una sección deshabilitada tiene prioridad sobre su contenido. Las opciones omitidas se consideran activas si hay datos. Las fotografías son opcionales: el perfil principal funciona como tarjeta de identidad sin imagen. Los proyectos pueden presentarse con o sin imagen y enlace.

## Compatibilidad con Editorial

Se mantienen las claves y estructuras de su `portfolio.js`: identidad en la raíz, `settings`, `seo`, `hero`, `about`, `projects.items`, `services.items`, `journey`, arrays `experience` y `education`, `skills.groups`, `contact` y `ui`.

Para migrar un cliente desde Editorial (`Esencial-1`), adaptar su archivo de datos y sus imágenes/documentos, revisando `catalogComposition` según el orden visual de Minimal. `theme` y `ui.projectLink` son extensiones opcionales con fallbacks. Los iconos conocidos son `compass`, `layers`, `chart`, `mail`, `pin` y `download`; otros nombres usan un icono neutro. La presentación y el orden visual pertenecen a cada modelo.

## SEO y publicación

Título, descripción, idioma y Open Graph se generan en el HTML durante el build a partir de `portfolio.js`, para que no dependan de ejecutar React al compartir un enlace. `seo.siteUrl` activa la URL canónica; `seo.image` debe ser absoluta o resolverse contra ese dominio. Dejar esos campos vacíos evita publicar un dominio inventado.

Al cambiar los datos en producción, generar y publicar un nuevo build. En desarrollo, reiniciar Vite si cambian los metadatos de configuración y no se actualizan.

En Vercel: importar el repositorio, elegir Vite, comando `npm run build` y directorio de salida `dist`. No se necesitan variables de entorno ni servicios externos.

## Accesibilidad y verificación

- Navegación con teclado, enlace para saltar al contenido y foco visible.
- Menú móvil con estado accesible, cierre con Escape y al seleccionar una sección.
- Respeto por la preferencia de movimiento reducido.
- Fuentes del sistema e iconos SVG locales, sin solicitudes a proveedores de fuentes.
- `npm test` verifica contenido vacío, secciones deshabilitadas, composición comercial, trayectoria parcial, destinos de contacto y SEO, sin dependencias adicionales.

No hay un script de pruebas de navegador en este repositorio. Completar la revisión con mobile, tablet y desktop, teclado, menú, anclas, ausencia de CV y correo ficticio no accionable. Al ocultar bloques, la numeración debe seguir continua y Journey debe funcionar con ambas columnas, una sola o ninguna.

La demo representa un perfil ficticio. Sus datos de contacto no son operativos.
