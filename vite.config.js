import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
	// Относительные пути, чтобы сборка работала из подкаталога GitHub Pages.
	base: './',
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
