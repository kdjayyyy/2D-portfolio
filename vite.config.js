import { defineConfig } from "vite";

export default defineConfig({
  base: '/2D-portfolio/',
  build: {
    // for simplifying or minifying the code for kaboom
    minify: 'terser', 
  },
})