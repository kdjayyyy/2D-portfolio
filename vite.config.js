import { defineConfig } from "vite";

export default defineConfig({
  base: './',
  build: {
    // for simplifying or minifying the code for kaboom
    minify: 'terser', 
  },
})