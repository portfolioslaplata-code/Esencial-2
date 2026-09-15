import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import { portfolio } from "./src/data/portfolio.js";
import { seoTags } from "./src/lib/seo.js";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    {
      name: "portfolio-seo",
      transformIndexHtml(html) {
        return {
          html: html.replace(
            '<html lang="es-AR">',
            `<html lang="${portfolio.locale.replace(/[^a-zA-Z-]/g, "")}">`,
          ),
          tags: seoTags(portfolio),
        };
      },
    },
  ],
});
