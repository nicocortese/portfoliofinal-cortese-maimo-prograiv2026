import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()],
    // Variables que llegan al navegador: las PUBLIC_ (default de Astro) y la
    // key del clima, para poder usar OPENWEATHER_API_KEY sin renombrarla.
    envPrefix: ["PUBLIC_", "OPENWEATHER_"],
  },
});
