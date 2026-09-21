import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
	build: {
		sourcemap: true,
		minify: false,
		rollupOptions: {
			input: {
				main: resolve(import.meta.dirname, 'index.html'),
				menu: resolve(import.meta.dirname, 'menu.html'),
			},
		},
	},
})
