import { fileURLToPath, URL } from 'url';
import { defineConfig } from 'vite';

import vitePluginVue from '@vitejs/plugin-vue';
import vitePluginEslint from 'vite-plugin-eslint';

export default defineConfig({
	plugins: [
		vitePluginVue(),
		vitePluginEslint(),
	],
	base: '/vue-converter/',
	build: {
		outDir: './docs',
	},
	resolve: {
		alias: {
			'@': fileURLToPath(new URL('./src', import.meta.url)),
		},
	},
});
