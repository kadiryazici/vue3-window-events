import DTS from 'vite-plugin-dts';
import Vue from '@vitejs/plugin-vue';
import VueJSX from '@vitejs/plugin-vue-jsx';
import { defineConfig } from 'vite';
import path from 'path';

const root = process.cwd();
const mode = process.env.MODE as 'production' | undefined;
const libName = 'vue3-window-component';

export default defineConfig({
   root: mode !== 'production' ? path.join(root, 'demo') : root,
   plugins: [
      VueJSX(),
      Vue(),
      DTS({
         outputDir: 'dist'
      })
   ],
   build: {
      target: 'es2020',
      lib: {
         entry: path.resolve(root, 'src', 'lib.tsx'),
         name: libName,
         formats: ['es', 'umd']
      },
      rollupOptions: {
         external: ['vue']
      }
   }
});
