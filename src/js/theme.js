// Переключение светлой и тёмной темы.
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
		const stored = localStorage.getItem(STORAGE_KEY)

		return stored === DARK || stored === LIGHT ? stored : null
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

function applyTheme(theme, buttons) {
	document.documentElement.dataset.theme = theme

	buttons.forEach(button => {
		const isActive = button.dataset.themeValue === theme

		button.setAttribute('aria-pressed', String(isActive))
		button.classList.toggle('theme-switch__btn--active', isActive)
	})
}

export function initTheme() {
	const buttons = document.querySelectorAll('[data-theme-value]')

	applyTheme(readStoredTheme() ?? getCurrentTheme(), buttons)

	buttons.forEach(button => {
		button.addEventListener('click', () => {
			const nextTheme = button.dataset.themeValue

			applyTheme(nextTheme, buttons)
			saveTheme(nextTheme)
		})
	})
}
