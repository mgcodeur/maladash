import { defineConfig } from "vite";
import { resolve } from 'path'

export default defineConfig({
    appType: 'iife',
    build: {
        lib: {
            entry: resolve(__dirname, 'assets/js/main.js'),
            name: 'App',
            fileName: () => 'app.min.js'
        },
        outDir: resolve(__dirname, 'assets/dist/js'),
    }
});