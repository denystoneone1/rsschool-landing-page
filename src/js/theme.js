// Переключение светлой и тёмной темы.
//
// Ожидаемая разметка: <button type="button" data-theme-toggle aria-pressed="false">
// Кнопок может быть несколько (например, в шапке и в бургер-меню) — все
// синхронизируются между собой.
//
// Стартовая тема выставляется инлайновым скриптом в <head>, чтобы страница
// не моргала светлой темой, пока грузятся модули.

const STORAGE_KEY = 'coffee-house-theme'
const DARK = 'dark'
const LIGHT = 'light'

function readStoredTheme() {
	try {
		return localStorage.getItem(STORAGE_KEY)
	} catch {
		return null
	}
}

function saveTheme(theme) {
	try {
		localStorage.setItem(STORAGE_KEY, theme)
	} catch {}
}

function getCurrentTheme() {
	return document.documentElement.dataset.theme === DARK ? DARK : LIGHT
}

function applyTheme(theme, toggles) {
	document.documentElement.dataset.theme = theme

	toggles.forEach(toggle => {
		toggle.setAttribute('aria-pressed', String(theme === DARK))
	})
}

export function initTheme() {
	const toggles = document.querySelectorAll('[data-theme-toggle]')

	applyTheme(readStoredTheme() ?? getCurrentTheme(), toggles)

	toggles.forEach(toggle => {
		toggle.addEventListener('click', () => {
			const nextTheme = getCurrentTheme() === DARK ? LIGHT : DARK

			applyTheme(nextTheme, toggles)
			saveTheme(nextTheme)
		})
	})
}
