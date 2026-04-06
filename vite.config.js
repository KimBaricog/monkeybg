import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "MONKEY.bg",
        short_name: "MONKEY.bg",
        start_url: "/",
        display: "standalone",
        background_color: "#ffffff",
        theme_color: "#40C057",
        icons: [
          {
            src: "/logo2.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/logo2.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],
});
