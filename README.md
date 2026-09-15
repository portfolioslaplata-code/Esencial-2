# Esencial 2 · Portfolios La Plata

Modelo reutilizable de portfolio profesional, one-page y responsive. React + Vite + Tailwind CSS 4. Una presentación sobria y estructurada, con perfil, servicios, proyectos, trayectoria, competencias y contacto. Sin backend, CMS, base de datos ni analytics.

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
6. Reemplazar el email `.example` y el contenido ficticio. Configurar `settings.demoNotice` con `''` para retirar el aviso de demostración y `settings.credit.enabled` para mostrar u ocultar el crédito.
7. Ejecutar lint, pruebas y build; revisar la versión móvil y los enlaces reales del cliente.

Los enlaces deben ser URLs `https://`, `http://`, `mailto:`, `tel:`, rutas desde la raíz `/` o anclas válidas. No se muestran botones de CV ni enlaces de proyecto sin destino. El contacto utiliza los enlaces configurados; no envía formularios ni requiere un servidor.

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

## Compatibilidad con Esencial 1

Se mantienen las claves y estructuras de su `portfolio.js`: identidad en la raíz, `settings`, `seo`, `hero`, `about`, `projects.items`, `services.items`, `journey`, arrays `experience` y `education`, `skills.groups`, `contact` y `ui`.

Para migrar un cliente, copiar su archivo de datos y sus imágenes/documentos. `theme` y `ui.projectLink` son extensiones opcionales: los datos de Esencial 1 funcionan sin ellas. Los iconos conocidos son `compass`, `layers`, `chart`, `mail`, `pin` y `download`; otros nombres usan un icono neutro. La presentación y el orden visual pertenecen a cada modelo.

## SEO y publicación

Título, descripción, idioma y Open Graph se generan en el HTML durante el build a partir de `portfolio.js`, para que no dependan de ejecutar React al compartir un enlace. `seo.siteUrl` activa la URL canónica; `seo.image` debe ser absoluta o resolverse contra ese dominio. Dejar esos campos vacíos evita publicar un dominio inventado.

Al cambiar los datos en producción, generar y publicar un nuevo build. En desarrollo, reiniciar Vite si cambian los metadatos de configuración y no se actualizan.

En Vercel: importar el repositorio, elegir Vite, comando `npm run build` y directorio de salida `dist`. No se necesitan variables de entorno ni servicios externos.

## Accesibilidad y verificación

- Navegación con teclado, enlace para saltar al contenido y foco visible.
- Menú móvil con estado accesible, cierre con Escape y al seleccionar una sección.
- Respeto por la preferencia de movimiento reducido.
- Fuentes del sistema e iconos SVG locales, sin solicitudes a proveedores de fuentes.
- Pruebas de contenido vacío, secciones deshabilitadas, trayectoria parcial, destinos de contacto y SEO.

La demo representa un perfil ficticio. Sus datos de contacto no son operativos.
